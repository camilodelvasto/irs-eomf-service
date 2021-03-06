const express = require('express');
const router = express.Router();
const queries = require('../../db/queries/nonprofits');
const updateManager = require('../../db/queries/status');
const updateHelpers = require('../../db/queries/update');
const search = require('../../db/queries/search');
var auth = require('../../middlewares/auth');
var request = require('request');

// TODO
// - use socket IO to update client while performing the updates: wishlist
// prevent the process to start over again if the request is repeated (also, do not download the files, or revert the migration if not completed)

// This methods clears both databases. To be used only in development/testing.
router.get('/clear',
  auth.requireToken,
  async function(req, res, next) {
    try {
      const a2 = await queries.clearTable('nonprofits');
      const a3 = await queries.clearTable('new_nonprofits', a2);
      const a4 = await queries.clearTable('nonprofits_vectors', a3);
      const a5 = await queries.clearTable('updates', a4);
      const count = await queries.getCount('nonprofits', a5);
      if (count === 0) {
        res.status(200)
        res.json({
          status: 'success',
          message: 'The table was successfully emptied',
          count: parseInt(count, 10),        
        })
      } else {
        res.json({
          status: 'error',
          message: 'The table was not emptied'
        })
      }
    } catch (err) {
      console.log(err);
    }
  }
);

// This method marks all nonprofits as revoked. To be called before the update process begins.
router.get('/download/prepare',
  auth.requireToken,
  async function(req, res, next) {
    try {
      const response = await queries.markRevoked();
      if (response) {
        res.status(200)
        res.json({
          status: 'success',
          message: 'All nonprofits marked as non-validated. Ready to download files.',
        })
      } else {
        res.json({
          status: 'error',
          message: 'Prepare was not completed/bad request'
        })
      }
    } catch (err) {
      next(err);
    }
  }
);


router.get('/download/:part',
  auth.requireToken,
  async function(req, res, next) {
    try {
      const a2 = await updateHelpers.fetchCSVFile(req);
      const count = await queries.getCount('new_nonprofits', a2);
      if (a2) {
        res.status(200)
        res.json({
          status: 'success',
          message: 'Import performed successfully',
          count: parseInt(count, 10),        
        })
      } else {
        res.json({
          status: 'error',
          message: 'Import was not completed/bad request'
        })
      }
    } catch (err) {
      console.log(err);
    }
  }
);

router.get('/parse',
  auth.requireToken,
  async function(req, res, next) {
    try {
      const a4 = await updateHelpers.updateDB();
      const count = await queries.getCount('nonprofits', a4);
      if (count) {
        const a3 = await queries.clearTable('new_nonprofits');
        res.status(200)
        res.json({
          status: 'success',
          message: 'Update performed successfully',
          count: parseInt(count, 10),        
        })
      } else {
        res.json({
          status: 'error',
          message: 'Update was not completed'
        })
      }
    } catch (err) {
      console.log(err);
    }
  }
);

router.get('/index',
  auth.requireToken,
  async function(req, res, next) {
    try {
      const a3 = await queries.clearTable('nonprofits_vectors');
      const a4 = await search.createVectors();
      const count = await queries.getCount('nonprofits_vectors', a4);
      if (count) {
        res.status(200)
        res.json({
          status: 'success',
          message: 'Indexing performed successfully',
          count: parseInt(count, 10),        
        })
      } else {
        res.json({
          status: 'error',
          message: 'Indexing was not completed'
        })
      }
    } catch (err) {
      console.log(err);
    }
  }
);

router.get('/auto',
  auth.requireToken,
  async function(req, res, next) {
    try {
      const last = await updateManager.getStatus()
      if (last.status === null || (last.status === 'finished' && last.phase === 'update') || last.status === 'err') {
        const a1 = await queries.markRevoked()
        const a2 = await queries.clearTable('new_nonprofits', a1);
        const a3 = await updateManager.setStatus('download1', 'started', a2)
        updateHelpers.fetchCSVFile({ params: { part: 1 } });

        // inform client
        res.json({
          message: 'Update process started',
          status: await updateManager.getStatus(a3)
        })
      } else {
        // a process is running: test if it's completed or stale (more than x minutes after init)
        switch (last.status) {
          case 'started':
            res.json({
              message: 'A process is running, get back later',
              phase: last.phase,
              status: last.status
            })

            // prevent process to start again if last update was < x minutes ago.
          break;
          // Previous process finished, go to the next one.
          case 'finished':
            switch (last.phase) {
              case 'init':
                updateManager.setStatus('download1', 'started')
                updateHelpers.fetchCSVFile({ params: { part: 1 } });
              break;
              case 'download1':
                updateManager.setStatus('download2', 'started')
                updateHelpers.fetchCSVFile({ params: { part: 2 } });
              break;
              case 'download2':
                updateManager.setStatus('download3', 'started')
                updateHelpers.fetchCSVFile({ params: { part: 3 } });
              break;
              case 'download3':
                updateManager.setStatus('download4', 'started')
                updateHelpers.fetchCSVFile({ params: { part: 4 } });
              break;
              case 'download4':
                updateManager.setStatus('parse', 'started')
                updateHelpers.updateDB()
              break;
              case 'parse':
                const a3 = await queries.clearTable('nonprofits_vectors');
                updateManager.setStatus('index', 'started')
                search.createVectors(a3);
              break;
              case 'index':
                updateManager.setStatus('update', 'finished')
                res.json({
                  message: 'The update has been completed.'
                })
                return
              break;
            }
            res.json({
              message: 'Previous processes has ended, moving to the next one.',
              status: await updateManager.getStatus()
            })
          break;
          case 'err':
            res.json({
              message: 'An error occurred. The update failed.',
              status: last
            })
          break;
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
);

// This method unlocks the update process so that a new one can be started.
router.get('/auto/unlock',
  auth.requireToken,
  async function(req, res, next) {
    try {
      updateManager.setStatus(null, 'err');
      res.status(200)
      res.json({
        status: 'success',
        message: 'Update has been unlocked.'
      })
    } catch (err) {
      console.log(err);
    }
  }
);


module.exports = router;

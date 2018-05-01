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

// This methods clears both databases. To be used only in development.
router.get('/clear',
  auth.requireToken,
  async function(req, res, next) {
    try {
      const a2 = await queries.clearTable('nonprofits');
      const a3 = await queries.clearTable('new_nonprofits', a2);
      const a4 = await queries.clearTable('nonprofits_vectors', a3);
      const count = await queries.getCount('nonprofits', a4);
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
      // let updateUrl = req.protocol + '://' + req.get('host') + req.baseUrl
      // check current status to determine if any action is necessary
      // switch actions and decide what to do: to update client (if status is in progress) or to trigger next action
      const last = await updateManager.getStatus()
      if (last.status === null || (last.status === 'finished' && last.phase === 'update') || last.status === 'err') {
        // There's no history about the process, so start from scratch, or the last update was completed, or it wasn't successful.
        // start process (call function)
        // set status and next function
        console.log('starting a new update process')
        // first action: prepare DB
        const a1 = await queries.markRevoked()
        const a3 = await updateManager.setStatus('download1', 'started', a1)
        updateHelpers.fetchCSVFile({ params: { part: 1 } });

        // inform client
        res.json({
          message: 'Preparing DB',
          status: await updateManager.getStatus(a3)
        })
      } else {
        // a process is running: test if it's completed or staled
        console.log('an update is running, check status')
        switch (last.status) {
          case 'started':
            console.log('started')
            res.json({
              message: 'A process is running, get back later',
              phase: last.phase,
              status: last.status
            })

            // add condition to restart the current process if it the status has been idle for more than x minutes.
            // prevent process to start again if last update was < x minutes ago.
          break;
          // previous process finished, go to the next one.
          case 'finished':
            console.log('fnished')
            switch (last.phase) {
              case 'init':
                console.log('init is finished')
                updateManager.setStatus('download1', 'started')
                updateHelpers.fetchCSVFile({ params: { part: 1 } });
              break;
              case 'download1':
                console.log('download1 is finished')
                updateManager.setStatus('download2', 'started')
                updateHelpers.fetchCSVFile({ params: { part: 2 } });
              break;
              case 'download2':
                console.log('download2 is finished')
                updateManager.setStatus('download3', 'started')
                updateHelpers.fetchCSVFile({ params: { part: 3 } });
              break;
              case 'download3':
                console.log('download3 is finished')
                updateManager.setStatus('download4', 'started')
                updateHelpers.fetchCSVFile({ params: { part: 4 } });
              break;
              case 'download4':
                console.log('download4 is finished')
                updateManager.setStatus('parse', 'started')
                updateHelpers.updateDB()
              break;
              case 'parse':
                console.log('parse is finished')
                const a1 = await queries.clearTable('new_nonprofits');
                const a3 = await queries.clearTable('nonprofits_vectors', a1);
                updateManager.setStatus('index', 'started')
                search.createVectors(a3);
              break;
              case 'index':
                console.log('the update was completed')
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

module.exports = router;

const express = require('express');
const router = express.Router();
const queries = require('../../db/queries/nonprofits');
const updateHelpers = require('../../db/queries/update');
const search = require('../../db/queries/search');
var auth = require('../../middlewares/auth');

// TODO
// prevent the nonprofits to be validated if only one day has passed since the previous update (using updatedAt)
// - use socket IO to update client while performing the updates: wishlist
// prevent the process to start over again if the request is repeated (also, do not download the files, or revert the migration if not completed)
// - repeat for all the 4 files: to be done at the master system

const timeout = require('connect-timeout');

router.use(timeout(6000000));
router.use(haltOnTimedout);

function haltOnTimedout(req, res, next){
  if (!req.timedout) next();
}

// This methods clears both databases. To be used only in development.
router.get('/clear',
  auth.requireToken,
  async function(req, res, next) {
    try {
      const a2 = await queries.clearDB('nonprofits');
      const a3 = await queries.clearDB('new_nonprofits', a2);
      const a4 = await queries.clearDB('nonprofits_vectors', a3);
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
      res.status(200)
      res.json(response)
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
        const a3 = await queries.clearDB('new_nonprofits');
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
      const a3 = await queries.clearDB('nonprofits_vectors');
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

module.exports = router;

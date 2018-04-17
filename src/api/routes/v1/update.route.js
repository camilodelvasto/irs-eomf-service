const express = require('express');
const router = express.Router();
const queries = require('../../db/queries/nonprofits');
const updateHelpers = require('../../db/queries/update');
var auth = require('../../middlewares/auth');

// TODO
// - use socket IO to update client while performing the updates: wishlist
// - compare and create diff for endpoint
// prevent the process to start over again if the request is repeated (also, do not download the files)
// - repeat for all the 4 files

const timeout = require('connect-timeout');

router.use(timeout(6000000));
router.use(haltOnTimedout);

function haltOnTimedout(req, res, next){
  if (!req.timedout) next();
}

router.get('/clear',
  auth.requireToken,
  async function(req, res, next) {
  try {
    const a2 = await queries.clearDB('nonprofits');
    const a3 = await queries.clearDB('new_nonprofits');
    const count = await queries.getCount('nonprofits', a3);
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
});

router.get('/prepare',
  auth.requireToken,
  async function(req, res, next) {
  try {
    const a2 = await queries.clearDB('new_nonprofits');
    const count = await queries.getCount('nonprofits', a2);
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
});

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
});

router.get('/parse',
  auth.requireToken,
  async function(req, res, next) {
  try {
    const a4 = await updateHelpers.updateDB();
    const count = await queries.getCount('nonprofits', a4);
    if (count) {
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
});

module.exports = router;

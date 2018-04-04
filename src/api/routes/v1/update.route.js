const express = require('express');
const router = express.Router();
const queries = require('../../db/queries/nonprofits');
const csv = require('csv-stream');
const request = require('request');
const knex = require('../../../config/pg');

// TODO
// - fix for largest file and combined files
// - post a success or error message after import
// - repeat for all the 4 files
// - use socket IO to update client while performing the updates
// - update 'nonprofits' table with new data & clean up file: remove extra columns not needed when updating the main table
// - compare and create diff for endpoint
// prevent update to be performed if not authenticated for that endpoint (update)
// prevent the process to start over again if the request is repeated (also, do not download the files)

const timeout = require('connect-timeout');

router.use(timeout(6000000));
router.use(haltOnTimedout);

function haltOnTimedout(req, res, next){
  if (!req.timedout) next();
}

router.get('/', async function(req, res, next) {
  try {
    const a3 = await queries.clearDB('nonprofits');
    const a4 = await updateDB(a3);

    const count = await queries.getCount('nonprofits', a4);
    if (count.length) {
      res.status(200)
      res.json({
        status: 'success',
        message: 'Update performed successfully',
        count: parseInt(count[0].count, 10),        
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

function compareBatch(index, batchCount) {
  return new Promise(async resolve => {
    try {
      var batchSize = 1000
      var batch = await knex('new_nonprofits').select('*').limit(batchSize).offset(batchSize * index)
      .then(batch => {
        // remove unused keys
        // decode/parse some columns
        // create diff?
        console.log(index, batch[0].EIN)
        knex.batchInsert('nonprofits', batch, batch.length)
          .then(() => {
            console.log('inserted: ', batch.length);
          })
          .catch(err => {
            console.log(err, null);
          });

        if (index === batchCount) {
          resolve(true)
        } else {
          resolve(false)
        }
      })
      .catch(err => {
        console.log(err)
      })
    } catch (err) {
      console.log(err)
    }
  })
}

function updateDB() {
  return new Promise(async resolve => {
    try {
      var count = await queries.getCount('new_nonprofits')
      var batchSize = 1000
      var batchCount = Math.ceil(count[0].count / batchSize)
      console.log('batchCount: ', batchCount)
      for (var i = 0; i < batchCount; i++) {
        var test = await compareBatch(i, batchCount - 1)
        if (test) {
          resolve()
        }
      }
    } catch (err) {
      console.log(err)
    }
  });
}

module.exports = router;

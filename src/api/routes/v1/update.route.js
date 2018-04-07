const express = require('express');
const router = express.Router();
const queries = require('../../db/queries/nonprofits');
const csv = require('csv-stream');
const request = require('request');
const knex = require('../../../config/pg');
const IRSDataParser = require('../../utils/IRSDataParser');

// TODO
// write tests
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
        // fix for 1.5M+ rows (client ): DONE.
        // remove unused keys: DONE
        // create diff?
        // Remove all nonprofits with a non 1 deductibility code.
        var newBatch = batch.filter(nonprofit => {
          return nonprofit.DEDUCTIBILITY === 1
        })

        newBatch.forEach(nonprofit => {
          // Parse data following THE IRS infosheet
          nonprofit.CLASSIFICATION = IRSDataParser.getClassification(nonprofit.SUBSECTION, nonprofit.CLASSIFICATION)
          nonprofit.ACTIVITY = IRSDataParser.getActivity(nonprofit.ACTIVITY)
          nonprofit.NTEE = IRSDataParser.getNTEE(nonprofit.NTEE_CD)
          delete nonprofit.ICO
          delete nonprofit.STATUS
          delete nonprofit.TAX_PERIOD
          delete nonprofit.ASSET_CD
          delete nonprofit.INCOME_CD
          delete nonprofit.FILING_REQ_CD
          delete nonprofit.PF_FILING_REQ_CD
          delete nonprofit.ACCT_PD
          delete nonprofit.FOUNDATION
          delete nonprofit.ORGANIZATION
          delete nonprofit.SUBSECTION
        })
        knex.raw(queries.batchUpsert('nonprofits', newBatch, 'EIN'))
        .then(() => {
          // Resolve promise and return true if this was the last batch to process.
          if (index === batchCount) {
            resolve(true)
          } else {
            resolve(false)
          }
        })
        .catch(err => {
          console.log(err, null);
        });
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
  console.log('updating...')
  return new Promise(async resolve => {
    try {
      var count = await queries.getCount('new_nonprofits')
      var batchSize = 1000
      var batchCount = Math.ceil(count[0].count / batchSize)
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

const express = require('express');
const router = express.Router();
const queries = require('../../db/queries/nonprofits');
const csv = require('csv-stream');
const request = require('request');
const knex = require('../../../config/pg');
const CSV_URL =
    'https://www.irs.gov/pub/irs-soi/eo1.csv';
//  "https://angry-kare-394764.netlify.com/data/irs-data-eomf-1.csv";

// TODO
// - post a success or error message after import
// - repeat for all the 4 files
// - use socket IO to update client while performing the updates
// - update 'nonprofits' table with new data & clean up file: remove extra columns not needed when updating the main table
// - compare and create diff for endpoint
// prevent update to be performed if not authenticated for that endpoint (update)
// prevent the process to start over again if the request is repeated (also, do not download the files)

const timeout = require('connect-timeout');

router.use(timeout(600000));
router.use(haltOnTimedout);

function haltOnTimedout(req, res, next){
  if (!req.timedout) next();
}

router.get('/', async function(req, res, next) {
  try {
    const a1 = await clearDB('new_nonprofits');
    const a2 = await fetchRequest(req, a1);
    const a3 = await clearDB('nonprofits', a2);
    const a4 = await updateDB(0, a3);

    const count = await queries.getCount('nonprofits', a4);
    if (count.length) {
      res.status(200)
      res.json({
        status: 'success',
        message: 'Import performed successfully',
        count: parseInt(count[0].count, 10),        
      })
    } else {
      res.json({
        status: 'error',
        message: 'Import was not completed'
      })
    }
  } catch (err) {
    console.log(err);
  }
});

function clearDB(tableName) {
  console.log('clearing db: ', tableName)
  return new Promise(resolve => {
    // prepare the table for the import
    knex(tableName).del()
      .then(() => {
        resolve(1000);
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

function fetchRequest(ctx, a1) {
  console.log('importing data: ', CSV_URL)
  return new Promise(resolve => {
    let i = 0;
    let temp = [];
    let arr = [];

    request(CSV_URL)
      .pipe(csv.createStream({
        columns: [
          'EIN', 'NAME', 'ICO', 'STREET', 'CITY',
          'STATE', 'ZIP', 'GROUP', 'SUBSECTION',
          'AFFILIATION', 'CLASSIFICATION', 'RULING',
          'DEDUCTIBILITY', 'FOUNDATION', 'ACTIVITY',
          'ORGANIZATION', 'STATUS', 'TAX_PERIOD', 'ASSET_CD',
          'INCOME_CD', 'FILING_REQ_CD', 'PF_FILING_REQ_CD', 'ACCT_PD',
          'ASSET_AMT', 'INCOME_AMT', 'REVENUE_AMT', 'NTEE_CD', 'SORT_NAME',
        ],
      }))

      .on('data', data => {
        if (i !== 0) {
          arr.push({
            EIN: data.EIN,
            NAME: data.NAME || '',
            ICO: data.ICO || '',
            STREET: data.STREET || '',
            CITY: data.CITY || '',
            STATE: data.STATE || '',
            ZIP: data.ZIP || '',
            GROUP: data.GROUP || '',
            SUBSECTION: data.SUBSECTION || '',
            AFFILIATION: data.AFFILIATION || '',
            CLASSIFICATION: data.CLASSIFICATION || '',
            RULING: data.RULING || '',
            DEDUCTIBILITY: data.DEDUCTIBILITY || '',
            FOUNDATION: data.FOUNDATION || '',
            ACTIVITY: data.ACTIVITY || '',
            ORGANIZATION: data.ORGANIZATION || '',
            STATUS: data.STATUS || '',
            TAX_PERIOD: data.TAX_PERIOD || '',
            ASSET_CD: data.ASSET_CD || '',
            INCOME_CD: data.INCOME_CD || '',
            FILING_REQ_CD: data.FILING_REQ_CD || '',
            PF_FILING_REQ_CD: data.PF_FILING_REQ_CD || '',
            ACCT_PD: data.ACCT_PD || '',
            ASSET_AMT: data.ASSET_AMT || '',
            INCOME_AMT: data.INCOME_AMT || '',
            REVENUE_AMT: parseInt(data.REVENUE_AMT.slice(0, -3)) || 0,
            NTEE_CD: data.NTEE_CD || '',
            SORT_NAME: data.SORT_NAME || '',
          });
        }
        i++;
        if (arr.length === 500) {
          temp = arr;
          arr = [];

          knex.batchInsert('new_nonprofits', temp, temp.length)
            .then(() => {
              temp = [];
            })
            .catch(err => {
              console.log(err, null);
            });
        }
      })
      .on('end', () => {
        if (arr.length) {
          knex.batchInsert('new_nonprofits', arr, arr.length)
            .then(() => {
              arr = [];
              resolve(knex('new_nonprofits').count('*'));
            })
            .catch(err => {
              console.log(err, null);
            });
        } else {
          resolve(knex('new_nonprofits').count('*'));
        }
      })
      .on('error', err => {
        console.error(err);
      });
  });
}

function updateDB(offset = 0) {
  if (offset === 0) {
    console.log('updating "nonprofits" table')
  }
  let limit = 2300;

  return new Promise(async function (resolve) {
    var query = await knex('new_nonprofits').select('*').limit(limit).offset(offset);

    if (query.length) {
      knex.batchInsert('nonprofits', query, query.length)
      .then (async () => {
        resolve(query.length)
      })
      .catch(err => {
        console.log(err, null)
      })
    } else {
      resolve(query.length);
    }

    // loop through all the items and copy them to 'nonprofits' table: DONE
    // decode following IRS instructions
    // create diff? 
  })
  .then((size) => {
    if (!size) {
      return
    } else {
      return updateDB(offset += limit)
    }
  });

}

module.exports = router;

const express = require('express');
const router = express.Router();
const queries = require('../../db/queries/nonprofits');
const csv = require('csv-stream');
const request = require('request');
const knex = require('../../../config/pg');
const CSV_URL =
    'https://www.irs.gov/pub/irs-soi/eo';
//  "https://angry-kare-394764.netlify.com/data/irs-data-eomf-1.csv";

// TODO
// - repeat for all the 4 files
// - compare and create diff for endpoint
// prevent update to be performed if not authenticated for that endpoint (tokenize 'update' endpoint)
// prevent the process to start over again if the request is repeated (also, do not download the files)

const timeout = require('connect-timeout');

router.use(timeout(6000000));
router.use(haltOnTimedout);

function haltOnTimedout(req, res, next){
  if (!req.timedout) next();
}

router.get('/:part', async function(req, res, next) {
  try {
    const a2 = await fetchRequest(req);
    const count = await queries.getCount('new_nonprofits', a2);

    if (a2) {
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

function fetchRequest(req, a1) {
  return new Promise(resolve => {
    let i = 0;
    let temp = [];
    let arr = [];

    var fileNumber = parseInt(req.params.part, 10)
    if ( fileNumber < 1 || fileNumber > 4) {
      return resolve(0)
    }
    var fullUrl = `${CSV_URL}${fileNumber}.csv`
    console.log('importing data: ', fullUrl)
    request(fullUrl)
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
            DEDUCTIBILITY: data.DEDUCTIBILITY || 0,
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

          knex.raw(queries.batchUpsert('new_nonprofits', temp, 'EIN'))
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
          knex.raw(queries.batchUpsert('new_nonprofits', arr, 'EIN'))
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

module.exports = router;

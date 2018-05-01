const queries = require('./nonprofits');
const IRSDataParser = require('../../utils/IRSDataParser');
const request = require('request');
const csv = require('csv-stream');
const CSV_URL = process.env.irsEOMFUrl;

var db = require('../../db/models')
const updateManager = require('./status');
var newNonprofits = db.new_nonprofits

var sequelize = db.sequelize
var Sequelize = db.Sequelize

function compareBatch(index, batchCount) {
  return new Promise(async resolve => {
    try {
      var batchSize = 999
      var batch = await newNonprofits.findAll({ limit: batchSize, offset: batchSize * index, raw: true })

      // Remove all nonprofits with a non 1 deductibility code.
      var newBatch = batch.filter(nonprofit => {
        return (nonprofit.DEDUCTIBILITY === 1)
      })

      newBatch.forEach(nonprofit => {
        // Parse data following THE IRS infosheet
        nonprofit.CLASSIFICATION = IRSDataParser.getClassification(nonprofit.SUBSECTION, nonprofit.CLASSIFICATION)
        nonprofit.ACTIVITY = IRSDataParser.getActivity(nonprofit.ACTIVITY)
        nonprofit.NTEE_CD = IRSDataParser.getNTEE(nonprofit.NTEE_CD)
        delete nonprofit.createdAt
        delete nonprofit.updatedAt
        delete nonprofit.id
      })

      sequelize.query(queries.batchUpsert('nonprofits', newBatch, 'EIN'))
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

    } catch (err) {
      console.log(err)
    }
  })
}

function fetchCSVFile(req, a1) {
  return new Promise(resolve => {
    let i = 0;
    let temp = [];
    let arr = [];

    var fileNumber = parseInt(req.params.part, 10)
    if ( fileNumber < 1 || fileNumber > 4 || isNaN(fileNumber) ) {
      return resolve(0)
    }
    var fullUrl = `${CSV_URL}${fileNumber}.csv`
    console.log('downloading:', fullUrl)
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
        escapeChar : '"',
        enclosedChar : '"'
      }))

      .on('data', data => {
        if (i !== 0 && !isNaN(data.EIN)) {
          arr.push({
            EIN: parseInt(data.EIN, 10),
            NAME: String(data.NAME) || "",
            ICO: String(data.ICO) || "",
            STREET: String(data.STREET) || "",
            CITY: String(data.CITY) || "",
            STATE: String(data.STATE) || "",
            ZIP: String(data.ZIP) || "",
            GROUP: String(data.GROUP) || "",
            SUBSECTION: String(data.SUBSECTION) || "",
            AFFILIATION: String(data.AFFILIATION) || "",
            CLASSIFICATION: String(data.CLASSIFICATION) || "",
            RULING: String(data.RULING) || "",
            DEDUCTIBILITY: parseInt(data.DEDUCTIBILITY, 10) || 0,
            FOUNDATION: String(data.FOUNDATION) || "",
            ACTIVITY: String(data.ACTIVITY) || "",
            ORGANIZATION: String(data.ORGANIZATION) || "",
            STATUS: String(data.STATUS) || "",
            TAX_PERIOD: String(data.TAX_PERIOD) || "",
            ASSET_CD: String(data.ASSET_CD) || "",
            INCOME_CD: String(data.INCOME_CD) || "",
            FILING_REQ_CD: String(data.FILING_REQ_CD) || "",
            PF_FILING_REQ_CD: String(data.PF_FILING_REQ_CD) || "",
            ACCT_PD: String(data.ACCT_PD) || "",
            ASSET_AMT: parseInt(data.ASSET_AMT, 10) || 0,
            INCOME_AMT: parseInt(data.INCOME_AMT, 10) || 0,
            REVENUE_AMT: parseInt(data.REVENUE_AMT.slice(0, -3)) || 0,
            NTEE_CD: String(data.NTEE_CD) || "",
            SORT_NAME: data.SORT_NAME.toString() || "",
          });
        }
        i++;
        if (arr.length === 500) {
          temp = arr;
          arr = [];
          sequelize.query(queries.batchUpsert('new_nonprofits', temp, 'EIN'))
            .then((x) => {
              temp = [];
            })
            .catch(err => {
              console.log(err, null);
            });
          }
        })
        .on('end', () => {
          if (arr.length) {
            sequelize.query(queries.batchUpsert('new_nonprofits', arr, 'EIN'))
              .then((x) => {
                arr = [];
                setTimeout(function() {
                  return db['new_nonprofits'].count()
                    .then(async count => {
                      await updateManager.setStatus(`download${req.params.part}`, 'finished', req)
                      resolve(count)
                    })
                    .catch ((err) => {
                      console.log(err)
                    })
                }, 100)
              })
              .catch(err => {
                console.log(err, null);
              });
          } else {
            return db['new_nonprofits'].count()
              .then(count => {
                resolve(count)
              })
              .catch ((err) => {
                console.log(err)
              })
        }
      })
      .on('error', err => {
        console.error(err);
      });
  });
}

function updateDB(req) {
  return new Promise(async resolve => {
    try {
      var count = await queries.getCount('new_nonprofits')
      var batchSize = 999
      var batchCount = Math.ceil(count / batchSize)
      for (var i = 0; i < batchCount; i++) {
        var test = await compareBatch(i, batchCount - 1)
        if (test) {
          updateManager.setStatus('parse', 'finished', req)
          resolve()
        }
      }
    } catch (err) {
      console.log(err)
    }
  });
}

module.exports = {
  compareBatch,
  fetchCSVFile,
  updateDB
};
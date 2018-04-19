const queries = require('./nonprofits');
var db = require('../models')
var Sequelize = db.Sequelize
var sequelize = db.sequelize
const Op = Sequelize.Op;

function createVectors() {
  return new Promise(async resolve => {
    try {
      var count = await queries.getCount('nonprofits')
      var batchSize = 2
      var batchCount = Math.ceil(count / batchSize)
      for (var i = 0; i < batchCount; i++) {
        var test = await createVectorBatch(i, batchCount - 1)
        if (test) {
          resolve()
        }
      }
    } catch (err) {
      console.log(err)
    }
  });
}

function createVectorBatch(index, batchCount) {
  return new Promise(async resolve => {
    try {
      var batchSize = 2
      var batch = await db.nonprofits.findAll({ limit: batchSize, offset: batchSize * index, raw: true })

      sequelize.query(batchVectorQuery('nonprofits_vectors', batch, 'EIN'))
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

function batchVectorQuery(tableName, data, id) {

//  sequelize.query(`INSERT INTO nonprofits_vectors VALUES (to_tsvector('english','The big blue elephant jumped over the crippled blue dolphin.'));`)
// 6112166

  var parsed = [];
  var keys = [
    "NAME",
    "SORT_NAME",
    "CITY",
    "ACTIVITY"
  ];
  for (var key in data[0]) {
    keys.push(`"${key}"`)
  }
  data.forEach(nonprofit => {
    var values = []
    keys.forEach((key) => {
      values.push(key)
    })
    parsed.push(`(to_tsvector('english','${nonprofit["NAME"]}'), ${nonprofit["EIN"]})`)
    //${values.join(',')})`)
  })

//  return 'INSERT INTO phraseTable VALUES (to_tsvector('english','The big blue elephant jumped over the crippled blue dolphin.'));'
  return `INSERT INTO ${tableName} VALUES ${parsed.join(',')} ON CONFLICT ("${id}") DO NOTHING`
}


function create() {
  sequelize.query(`INSERT INTO nonprofits_vectors VALUES (to_tsvector('english','The big blue elephant jumped over the crippled blue dolphin.'));`)
}

function deleteVectors() {
  sequelize.query('')
}

module.exports = {
  createVectors,
  deleteVectors
};


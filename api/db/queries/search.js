const queries = require('./nonprofits');
var db = require('../models')
var Sequelize = db.Sequelize
var sequelize = db.sequelize
const Op = Sequelize.Op;

function createVectors() {
  return new Promise(async resolve => {
    try {
      var count = await queries.getCount('nonprofits')
      var batchSize = 1000
      var batchCount = Math.ceil(count / batchSize)
      for (var i = 0; i < batchCount; i++) {
        var test = await createVectorBatch(i, batchCount - 1)
        if (test) {
          sequelize.query('CREATE INDEX IF NOT EXISTS nonprofits_trgm_idx ON nonprofits_vectors USING gin ("TRIGRAM" gin_trgm_ops);')
          .then(() => {
            resolve()
          })
          .catch(err => {
            console.log(err)
          })
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
      var batchSize = 1000
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
  var parsed = [];
  var weights = {
    NAME: "A",
    SORT_NAME: "B",
    CITY: "C",
    ACTIVITY: "D"
  }
  data.forEach(nonprofit => {
    var values = []
    var vectors = []
    for (var k in weights) {
      if (nonprofit[k] !== '' && nonprofit[k] !== 0 && nonprofit[k] !== '0') {
        vectors.push(`setweight(to_tsvector('english','${nonprofit[k]}'), '${weights[k]}')`)
        values.push(`${nonprofit[k]}`)
      }
    }
    parsed.push(`(${vectors.join('||')}, ${nonprofit["EIN"]}, '${values.join(' ')}', '${nonprofit["NAME"]}')`)
  })

  return `INSERT INTO nonprofits_vectors VALUES ${parsed.join(',')} ON CONFLICT ("${id}") DO NOTHING`
}

function getNonprofitByMatch(query) {
  try {
    var queryAsArray = query.split(' ')
    queryAsArray.forEach((word, index, arr) => {
      arr[index] = word + ':*'
    })
    return sequelize.query(`SELECT "EIN","NAME" FROM nonprofits_vectors WHERE "NONPROFIT_DATA" @@ to_tsquery('english','${queryAsArray.join(' & ')}') LIMIT 10;`, { type: sequelize.QueryTypes.SELECT })
  } catch (err) {
    console.log(err)
  }
}

function getNonprofitByTrigram(query) {
  try {
    var queryAsArray = query.split(' ')
    return sequelize.query(`SELECT "EIN","NAME" FROM nonprofits_vectors WHERE similarity("TRIGRAM", '${queryAsArray.join('+')}') > 0.1 LIMIT 10;`, { type: sequelize.QueryTypes.SELECT })
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  createVectors,
  getNonprofitByMatch,
  getNonprofitByTrigram
};


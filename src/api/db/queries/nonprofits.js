var Sequelize = require('sequelize')
const knex = require('../connection');

var db = require('../models')
var nonprofits = db.nonprofits
const Op = Sequelize.Op;

async function getNonprofits(page = 1, postsPerPage = 10) {
  try {
    // Sanitize inputs
    let {offset, limit} = standardizeParams(page, postsPerPage)

    // Perform queries
    var query = await nonprofits.findAll({ limit: limit, offset: offset })

    return query
  } catch (err) {
    console.log(err)
  }
}

async function getSingleNonprofit(ein) {
  try {
    if (isNaN(ein)) {
      return []
    }
    var query = await nonprofits.findAll({
      where: {
        EIN: parseInt(ein, 10)
      }
    })

    return query
  } catch (err) {
    console.log(err)
  }
}

async function getNonprofitByName(query, page = 1, postsPerPage = 10) {
  try {
    // Sanitize inputs
    let {offset, limit} = standardizeParams(page, postsPerPage)

    // Perform queries
    const upQuery = query.toUpperCase();

    var query = await nonprofits.findAll({
      where: {
        [Op.or]: [
          {
            NAME: {
              [Op.like]: `%${upQuery}%`
            }
          },
          {
            SORT_NAME: {
              [Op.like]: `%${upQuery}%`
            }
          },
          {
            CITY: {
              [Op.like]: `%${upQuery}%`
            }
          }
        ]
      },
      limit: limit,
      offset: offset
    })

    return query
  } catch (err) {
    console.log(err)
  }
}

async function getCount(tableName) {
  return new Promise(resolve => {
    db['nonprofits'].count()
      .then(count => {
        resolve(count)
      })
      .catch ((err) => {
        console.log(err)
      })
  })
}

function clearDB(tableName) {
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

function batchUpsert(tableName, data, id) {
  var parsed = [];
  data.forEach(nonprofit => {
    var values = []
    for (var k in nonprofit) {
      if (k === 'EIN' || k === 'DEDUCTIBILITY' || k === 'REVENUE_AMT') {
        values.push(`${nonprofit[k] || 0}`)
      } else {
        // Escape single quotes coming from text fields.
        values.push(`'${nonprofit[k].replace(/'/g, "\''") || ""}'`)
      }
    }
    parsed.push(`(${values.join(',')})`)
  })

  return `INSERT INTO ${tableName} VALUES ${parsed.join(',')} ON CONFLICT ("${id}") DO NOTHING`
}

module.exports = {
  batchUpsert,
  getNonprofits,
  getSingleNonprofit,
  getNonprofitByName,
  getCount,
  clearDB
};

// Helper functions to standardize queries before and after
function standardizeParams(page = 1, postsPerPage = 10) {
  var offset = 0
  if (postsPerPage > 100) {
    postsPerPage = 100
  }
  if (postsPerPage < 1) {
    postsPerPage = 10
  }
  if (page > 1) {
    offset = (page - 1) * postsPerPage
  }
  var limit = postsPerPage
  return { offset, limit }
}
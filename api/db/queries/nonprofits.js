var Sequelize = require('sequelize')

var db = require('../models')
var nonprofits = db.nonprofits
const Op = Sequelize.Op;

const attr = [
  "EIN",
  "NAME",
  "STREET",
  "CITY",
  "STATE",
  "ZIP",
  "ACTIVITY",
  "NTEE_CD",
  "SORT_NAME",
  "validated"
]


async function getNonprofits(page = 1, postsPerPage = 10, allFields = false) {
  try {
    // Sanitize inputs
    let {offset, limit} = standardizeParams(page, postsPerPage)

    // Perform queries
    var query = await nonprofits.findAll({
      attributes: allFields ? '' : attr,
      limit: limit,
      offset: offset
    })

    return query
  } catch (err) {
    console.log(err)
  }
}

async function getRevoked(page = 1, postsPerPage = 10, allFields = false) {
  try {
    // Sanitize inputs
    let {offset, limit} = standardizeParams(page, postsPerPage)

    // Perform queries
    var query = await nonprofits.findAll({
      attributes: allFields ? '' : attr,
      limit: limit,
      offset: offset,
      where: {
        validated: false
      }
    })

    return query
  } catch (err) {
    console.log(err)
  }
}

async function getNonprofitsCustom(page = 1, postsPerPage = 10, sort_by = 'REVENUE_AMT', order = 'DESC') {
  try {
    // Sanitize inputs
    let {offset, limit} = standardizeParams(page, postsPerPage)

    // Perform queries
    var query = await nonprofits.findAll({
      limit: limit,
      offset: offset,
      order: [
        [`${sort_by.toUpperCase()}`, `${order}`]
      ]
    })

    return query
  } catch (err) {
    console.log(err)
  }
}

async function getSingleNonprofit(ein, allFields = false) {
  try {
    if (isNaN(ein)) {
      return []
    }
    var query = await nonprofits.findAll({
      attributes: allFields ? '' : attr,
      where: {
        EIN: parseInt(ein, 10)
      }
    })

    return query
  } catch (err) {
    console.log(err)
  }
}

async function getNonprofitByName(query, page = 1, postsPerPage = 10, allFields = false) {
  try {
    // Sanitize inputs
    let {offset, limit} = standardizeParams(page, postsPerPage)

    // Perform queries
    const upQuery = query.toUpperCase();

    var query = await nonprofits.findAll({
      attributes: allFields ? '' : attr,
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
    db[tableName].count()
      .then(count => {
        resolve(count)
      })
      .catch ((err) => {
        console.log(err)
      })
  })
}

async function getRevokedCount() {
  return new Promise(resolve => {
    db['nonprofits'].count({
      where: {
        validated: false
      }
    })
      .then(count => {
        resolve(count)
      })
      .catch ((err) => {
        console.log(err)
      })
  })
}

async function getRevokedList() {
  return new Promise(resolve => {
    db['nonprofits'].findAll({
      attributes: [
        "EIN",
        "validated",
        "updatedAt"
      ],
      where: {
        validated: false
      }
    })
      .then(count => {
        resolve(count)
      })
      .catch ((err) => {
        console.log(err)
      })
  })
}

function markRevoked() {
  return new Promise(resolve => {
    db.sequelize.query('UPDATE nonprofits SET validated = false;')
      .then(count => {
        resolve(true)
      })
      .catch ((err) => {
        console.log(err)
      })
  });
}

function deleteRevoked() {
  return new Promise(resolve => {
    db['nonprofits'].destroy({
      where: {
        validated: false
      }
    })
      .then(count => {
        resolve(count)
      })
      .catch ((err) => {
        console.log(err)
      })
  });
}

function clearTable(tableName) {
  return new Promise(resolve => {
    console.log('here')
    // prepare the table for the import
    db.sequelize.getQueryInterface().bulkDelete(tableName, null, {})
      .then(() => {
        console.log('and here')
        resolve(1000);
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

function batchUpsert(tableName, data, id) {
  if (!data.length) {
    return ''
  }
  var parsed = [];
  var keys = [];
  for (var key in data[0]) {
    keys.push(`"${key}"`)
  }
  data.forEach(nonprofit => {
    var values = []
    for (var k in nonprofit) {
      if (!isNaN(nonprofit[k])) {
        values.push(`${nonprofit[k] || 0}`)
      } else if (nonprofit[k] === null || typeof nonprofit === 'undefined') {
        values.push(`'${nonprofit[k] || ""}'`)
      } else {
        values.push(`'${nonprofit[k].replace(/\'/g, '')}'`)
      }
    }
    parsed.push(`(${values.join(',')})`)
  })

  return `INSERT INTO ${tableName} (${keys.join(',')}) VALUES ${parsed.join(',')} ON CONFLICT ("${id}") DO UPDATE SET "updatedAt" = CURRENT_TIMESTAMP,"validated" = TRUE`
}

module.exports = {
  batchUpsert,
  getNonprofits,
  getSingleNonprofit,
  getNonprofitByName,
  getCount,
  deleteRevoked,
  getRevoked,
  getNonprofitsCustom,
  getRevokedCount,
  getRevokedList,
  markRevoked,
  clearTable
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
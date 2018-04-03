const knex = require('../connection');

async function getNonprofits(page = 1, postsPerPage = 10) {
  try {
    // Sanitize inputs
    let {offset, limit} = standardizeParams(page, postsPerPage)

    // Perform queries
    var query = await knex('nonprofits').select('*').limit(limit).offset(offset)
    var count = await knex('nonprofits').count('*')

    //return standardizeOutput(query, count)
    return standardizeOutput(query, count, limit)
  } catch (err) {
    console.log(err)
  }
}

async function getSingleNonprofit(ein) {
  try {
    var query = await knex('nonprofits')
      .select('*')
      .where({ EIN: parseInt(ein, 10) });

    var count = await knex('nonprofits')
      .count('*')
      .where({ EIN: parseInt(ein, 10) });

    return standardizeOutput(query, count)
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
    var query = await knex('nonprofits')
      .select('*')
      .where('NAME', 'LIKE', `%${upQuery}%`)
      .orWhere('SORT_NAME', 'LIKE', `%${upQuery}%`)
      .limit(limit)
      .offset(offset);

    var count = await knex('nonprofits')
      .count('*')
      .where('NAME', 'LIKE', `%${upQuery}%`)
      .orWhere('SORT_NAME', 'LIKE', `%${upQuery}%`);

    return standardizeOutput(query, count, limit)
  } catch (err) {
    console.log(err)
  }
}

function getNonprofitsCount() {
  return knex('nonprofits').count('*');
}

function getNewNonprofitsCount() {
  return knex('new_nonprofits').count('*');
}

module.exports = {
  getNonprofits,
  getSingleNonprofit,
  getNonprofitByName,
  getNewNonprofitsCount,
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

function standardizeOutput(query, count, limit = 10) {
  var totalPages = 0
  if (count[0].count > 0) {
    totalPages = Math.ceil(count[0].count / limit)
  }
  return {
    nonprofits: query,
    pages: totalPages,
    count: parseInt(count[0].count)
  }

}

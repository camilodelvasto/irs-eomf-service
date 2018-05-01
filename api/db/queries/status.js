var Sequelize = require('sequelize')
const queries = require('./nonprofits');

var db = require('../models')
var sequelize = db.sequelize
var update = db.update
const Op = Sequelize.Op;
const request = require('request')

async function getStatus() {
  try {
    var query = await update.findOne({
      order: [ [ 'id', 'DESC' ] ]
    })

    return {
      phase: query !== null ? query.phase : null,
      status: query !== null ? query.status : null,
      raw: query
    }
  } catch (err) {
    console.log(err)
  }
}

async function setStatus(phase = 'init', status = 'started') {
  try {
    // get last status, if finished, insert a new record
    var last = await update.findOne({
      order: [ [ 'id', 'DESC' ] ]
    })
    if (last && last.status === 'finished' && last.phase === 'index' || !last) {
      // insert new record
      var newUpdate = await sequelize.query(`INSERT INTO updates ("phase","status") VALUES ('${phase}','${status}')`)
    } else {
      // update last record
      var newUpdate = await sequelize.query(`INSERT INTO updates ("id","phase","status") VALUES (${last.id},'${phase}','${status}') ON CONFLICT ("id") DO UPDATE SET "updatedAt" = CURRENT_TIMESTAMP,"phase" = '${phase}',"status" = '${status}'`)
    }

    return newUpdate
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  getStatus,
  setStatus
};

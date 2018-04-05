const express = require('express');
const router = express.Router();
const queries = require('../../db/queries/nonprofits');
const csv = require('csv-stream');
const request = require('request');
const knex = require('../../../config/pg');

router.get('/', async function(req, res, next) {
  try {
    const a2 = await queries.clearDB('nonprofits');
    const a3 = await queries.clearDB('new_nonprofits');
    const count = await queries.getCount('nonprofits', a3);
    if (count.length) {
      res.status(200)
      res.json({
        status: 'success',
        message: 'The table was successfully emptied',
        count: parseInt(count[0].count, 10),        
      })
    } else {
      res.json({
        status: 'error',
        message: 'The table was not emptied'
      })
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

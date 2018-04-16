const express = require('express');
const router = express.Router();
const queries = require('../../db/queries/nonprofits');
var db = require('../../db/models')
var seed = require('../../tests/nonprofits.seed')

const Umzug = require('umzug');
const umzugConf = require('../../../config/umzug')
const umzug = new Umzug(umzugConf);

// Should return a reduced list of 10 nonprofits and the number of pages depending on the posts_per_page parameter.
router.get('/', async function(req, res, next) {
    try {
      const response = await queries.getNonprofits(req.query.page, req.query.posts_per_page);
      res.status(200)
      res.json(response)
    } catch (err) {
      next(err);
    }
  });

router.get('/:ein', async function(req, res, next) {
  try {
    const response = await queries.getSingleNonprofit(req.params.ein);
    res.status(200)
    res.json(response)
  } catch (err) {
    next(err);
  }
});

router.get('/search/:query', async function(req, res, next) {
  try {
    const response = await queries.getNonprofitByName(req.params.query, req.query.page, req.query.posts_per_page)
    res.status(200)
    res.json(response)
  } catch (err) {
    next(err);
  }
});
module.exports = router;

const express = require('express');
const router = express.Router();
const queries = require('../../db/queries/nonprofits');
const search = require('../../db/queries/search');
var db = require('../../db/models')
var seed = require('../../tests/nonprofits.seed')

const Umzug = require('umzug');
const umzugConf = require('../../../config/umzug')
const umzug = new Umzug(umzugConf);

// TODO
router.get('/', async function(req, res, next) {
    try {
      const response = await queries.getNonprofits(req.query.page, req.query.posts_per_page);
      res.status(200)
      res.json(response)
    } catch (err) {
      next(err);
    }
  }
);

router.get('/:ein', async function(req, res, next) {
    try {
      const response = await queries.getSingleNonprofit(req.params.ein);
      res.status(200)
      res.json(response)
    } catch (err) {
      next(err);
    }
  }
);

// Alternative method using standard/basic search and pagination.
router.get('/find/:query', async function(req, res, next) {
    try {
      const response = await queries.getNonprofitByName(req.params.query, req.query.page, req.query.posts_per_page)
      res.status(200)
      res.json(response)
    } catch (err) {
      next(err);
    }
  }
);

router.get('/search/:query', async function(req, res, next) {
    try {
      var q = req.params.query
      // For short queries, use full text search
      if (q.length < 5) {
        const basic = await queries.getNonprofitByName(q)
        if (basic.length < 1) {
          const match = await search.getNonprofitByMatch(q)
          if (match.length) {
            res.status(200)
            res.json(trigram)
          } else {
            const trigram = await search.getNonprofitByTrigram(q)
            res.status(200)
            res.json(trigram)
          }
        } else {
          res.status(200)
          res.json(basic)
        }
      } else {
        const match = await search.getNonprofitByMatch(q)
        if (match.length < 1) {
          const trigram = await search.getNonprofitByTrigram(q)
          if (trigram.length) {
            res.status(200)
            res.json(trigram)
          } else {
            const basic = await queries.getNonprofitByName(q)
            res.status(200)
            res.json(basic)
          }
        } else {
          res.status(200)
          res.json(match)
        }
      }

    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;

const express = require('express');
const router = express.Router();
const queries = require('../../db/queries/nonprofits');
const updateHelpers = require('../../db/queries/update');
var auth = require('../../middlewares/auth');

// TODO
// create methods to get nonprofits and sort by income/revenue

router.get('/nonprofits',
  auth.requireToken,
  async function(req, res, next) {
    try {
      const response = await queries.getNonprofits(req.query.page, req.query.posts_per_page, true);
      res.status(200)
      res.json(response)
    } catch (err) {
      next(err);
    }
  }
);

router.get('/nonprofits/:ein',
  auth.requireToken,
  async function(req, res, next) {
    try {
      const response = await queries.getSingleNonprofit(req.params.ein, true);
      res.status(200)
      res.json(response)
    } catch (err) {
      next(err);
    }
  }
);

router.get('/nonprofits/search/:query',
  auth.requireToken,
  async function(req, res, next) {
    try {
      const response = await queries.getNonprofitByName(req.params.query, req.query.page, req.query.posts_per_page, true)
      res.status(200)
      res.json(response)
    } catch (err) {
      next(err);
    }
  }
);

router.get('/custom',
  auth.requireToken,
  async function(req, res, next) {
    try {
      const response = await queries.getNonprofitsCustom(req.query.page, req.query.posts_per_page, req.query.sort_by, req.query.order);
      res.status(200)
      res.json(response)
    } catch (err) {
      next(err);
    }
  }
);

router.get('/summary',
  auth.requireToken,
  async function(req, res, next) {
    try {
      const response = await queries.getSummary();
      res.status(200)
      res.json(response)
    } catch (err) {
      next(err);
    }
  }
);

router.get('/revoked',
  auth.requireToken,
  async function(req, res, next) {
    try {
      const response = await queries.getRevoked(req.query.page, req.query.posts_per_page, true);
      res.status(200)
      res.json(response)
    } catch (err) {
      next(err);
    }
  }
);

router.get('/revoked/list',
  auth.requireToken,
  async function(req, res, next) {
    try {
      const response = await queries.getRevokedList();
      res.status(200)
      res.json(response)
    } catch (err) {
      next(err);
    }
  }
);

router.get('/revoked/delete',
  auth.requireToken,
  async function(req, res, next) {
    try {
      const count = await queries.deleteRevoked();
      res.status(200)
      res.json({
        status: 'success',
        count: count
      })
    } catch (err) {
      next(err);
    }
  }
);

router.get('/revoked/count',
  auth.requireToken,
  async function(req, res, next) {
    try {
      const count = await queries.getRevokedCount();
      res.json({
        status: 'success',
        count: parseInt(count, 10),        
      })
    } catch (err) {
      next(err);
    }
  }
);


module.exports = router;

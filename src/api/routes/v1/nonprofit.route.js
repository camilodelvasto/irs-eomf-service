const express = require('express');
const router = express.Router();
const queries = require('../../../server/db/queries/nonprofits');

const BASE_URL = '/nonprofits';


// Should return a reduced list of 10 nonprofits and the number of pages depending on the posts_per_page parameter.
router.get(BASE_URL, async function(req, res, next) {
  try {
    const response = await queries.getNonprofits(req.query.page, req.query.posts_per_page);
    res.status(200)
    res.json(response.nonprofits)
  } catch (err) {
    next(err);
  }
});

router.get(`${BASE_URL}/:ein`, async function(req, res, next) {
  try {
    const response = await queries.getSingleNonprofit(req.params.ein);
    res.status(200)
    res.json(response.nonprofits)
  } catch (err) {
    next(err);
  }
});

router.get(`${BASE_URL}/search/:query`, async function(req, res, next) {
  try {
    const response = await queries.getNonprofitByName(req.params.query, req.query.page, req.query.posts_per_page)
    res.status(200)
    res.json(response.nonprofits)
  } catch (err) {
    next(err);
  }
});
module.exports = router;

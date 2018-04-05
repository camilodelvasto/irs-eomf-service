const express = require('express');
const nonprofitRoutes = require('./nonprofit.route');
const downloadRoutes = require('./download.route');
const updateRoutes = require('./update.route');
const emptyNonprofitsRoutes = require('./empty.nonprofits.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));

router.use('/nonprofits', nonprofitRoutes);
router.use('/download', downloadRoutes);
router.use('/update', updateRoutes);
router.use('/empty', emptyNonprofitsRoutes);

module.exports = router;

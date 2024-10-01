// routes/stats.js
const express = require('express');
const router = express.Router();
const { getBugCount, getBugsByStatus } = require('../controllers/statsController');

router.get('/bugCount', getBugCount);
router.get('/bugsByStatus', getBugsByStatus);

module.exports = router;

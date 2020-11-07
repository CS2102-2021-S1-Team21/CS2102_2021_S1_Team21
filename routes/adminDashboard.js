const express = require('express');
const adminDashboard = require('../controllers/adminDashboard');

const router = express.Router();

router.get('/leaderboard', adminDashboard.index);
router.get('/performance', adminDashboard.performance);

module.exports = router;

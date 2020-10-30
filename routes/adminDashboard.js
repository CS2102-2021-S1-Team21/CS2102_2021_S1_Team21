const express = require('express');
const adminDashboard = require('../controllers/adminDashboard');

const router = express.Router();

router.get('/', adminDashboard.index);

module.exports = router;

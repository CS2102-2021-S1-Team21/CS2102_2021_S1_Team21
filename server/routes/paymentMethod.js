const express = require('express');
const paymentMethod = require('../controllers/paymentMethod');

const router = express.Router();

router.get('/', paymentMethod.retrieve);

module.exports = router;
 
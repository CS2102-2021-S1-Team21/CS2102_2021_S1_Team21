const express = require('express');
const caretakerMonthlyInfo = require('../controllers/caretakerMonthlyInfo');

const router = express.Router();

router.get('/:caretakerusername', caretakerMonthlyInfo.getPetDay);

module.exports = router;

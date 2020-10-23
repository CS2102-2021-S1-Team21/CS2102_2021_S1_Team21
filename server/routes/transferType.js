const express = require('express');
const transferType = require('../controllers/transferType');

const router = express.Router();

router.get('/', transferType.retrieve);

module.exports = router;
 
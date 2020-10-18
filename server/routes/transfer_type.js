const express = require('express');
const transfer_type = require('../controllers/transfer_type');

const router = express.Router();

router.get('/', transfer_type.retrieve);

module.exports = router;

const express = require('express');
const bids = require('../controllers/pet');

const router = express.Router();

router.get('/:petOwnerUsername', bids.retrieve);

module.exports = router;

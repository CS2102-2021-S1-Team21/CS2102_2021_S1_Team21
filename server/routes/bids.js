const express = require('express');
const bids = require('../controllers/bids');

const router = express.Router();

router.post('/', bids.apply);
router.get('/:petOwnerUsername', bids.retrieve);

module.exports = router;

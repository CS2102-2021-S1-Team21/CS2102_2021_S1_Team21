const express = require('express');
const availability = require('../controllers/availability');

const router = express.Router();

router.post('/', availability.apply);
router.get('/:caretakerUsername', availability.retrieve);

module.exports = router;

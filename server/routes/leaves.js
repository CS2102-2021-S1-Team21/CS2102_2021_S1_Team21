const express = require('express');
const leaves = require('../controllers/leaves');

const router = express.Router();

router.post('/', leaves.apply);
router.get('/:caretakerUsername', leaves.retrieve);

module.exports = router;

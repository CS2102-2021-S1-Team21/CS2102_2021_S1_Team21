const express = require('express');
const leaves = require('../controllers/leaves');

const router = express.Router();

router.post('/', leaves.apply);
// router.get('/:email', leaves.retrieve)
router.get('/', leaves.retrieve);

module.exports = router;

const express = require('express');
const caretakers = require('../controllers/caretakers');

const router = express.Router();

router.get('/', caretakers.index);
router.get('/:email', caretakers.view);

module.exports = router;

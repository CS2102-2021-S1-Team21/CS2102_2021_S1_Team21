const express = require('express');
const caretakers = require('../controllers/caretakers');

const router = express.Router();

router.get('/', caretakers.index);
router.get('/:username', caretakers.view);

module.exports = router;
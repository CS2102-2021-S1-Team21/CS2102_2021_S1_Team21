const express = require('express');
const caretakers = require('../controllers/caretakers');

const router = express.Router();

router.get('/', caretakers.index);
router.get('/browse', caretakers.browse);
router.get('/:username', caretakers.view);

module.exports = router;

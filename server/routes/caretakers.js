const express = require('express');
const caretakers = require('../controllers/userProfiles');

const router = express.Router();

router.get('/', caretakers.index);
router.get('/:username', caretakers.view);

module.exports = router;

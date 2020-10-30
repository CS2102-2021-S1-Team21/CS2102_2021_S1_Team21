const express = require('express');
const caresFor = require('../controllers/caresFor');

const router = express.Router();

router.get('/', caresFor.index);
router.get('/:username', caresFor.view);
router.put('/:username', caresFor.edit);

module.exports = router;

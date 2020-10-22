const express = require('express');
const profileSettings = require('../controllers/profileSettings');

const router = express.Router();

router.get('/:username', profileSettings.view);
router.put('/:username', profileSettings.edit);

module.exports = router;

const express = require('express');
const profileSettings = require('../controllers/profileSettings');

const router = express.Router();

router.get('/:username', profileSettings.view);
// router.post('/edit/:username', profileSettings.put);

module.exports = router;

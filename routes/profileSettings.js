const express = require('express');
const profileSettings = require('../controllers/profileSettings');

const router = express.Router();

router.get('/:username', profileSettings.view);
router.get('/admin/:username', profileSettings.adminView);
router.put('/:username', profileSettings.edit);
router.put('/admin/:username', profileSettings.adminEdit);

module.exports = router;

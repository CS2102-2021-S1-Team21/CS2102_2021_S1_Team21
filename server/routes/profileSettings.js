const express = require('express');
const profileSettings = require('../controllers/profileSettings');

const router = express.Router();

router.get('/:username', profileSettings.view);
router.put('/update/:username', profileSettings.edit);
router.post('/updateCares/:username', profileSettings.putCares);

module.exports = router;

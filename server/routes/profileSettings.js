const express = require('express');
const profileSettings = require('../controllers/profileSettings');

const router = express.Router();

router.get('/:username', profileSettings.view);
router.post('/update/:username', profileSettings.putProfile);
router.post('/updateCc/:username', profileSettings.putCc);
router.post('/updateCares/:username', profileSettings.putCares);

module.exports = router;

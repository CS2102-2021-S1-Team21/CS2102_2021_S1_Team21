const express = require('express');
const profiles = require('../controllers/userProfiles');

const router = express.Router();

router.get('/', profiles.index);
router.get('/:username', profiles.view);

module.exports = router;

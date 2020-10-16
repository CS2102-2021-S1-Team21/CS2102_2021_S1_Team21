const express = require('express');
const petOwners = require('../controllers/petOwners');

const router = express.Router();

router.get('/', petOwners.index);
router.post('/', petOwners.new);
router.get('/:username', petOwners.view);
router.get('/cc/:username', petOwners.viewCc);

module.exports = router;

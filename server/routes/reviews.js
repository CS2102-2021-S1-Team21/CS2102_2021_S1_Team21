const express = require('express');
const reviews = require('../controllers/reviews');

const router = express.Router();

router.post('/', reviews.index);
router.get('/:username', reviews.view);

module.exports = router;

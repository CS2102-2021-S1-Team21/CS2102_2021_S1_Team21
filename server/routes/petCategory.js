const express = require('express');
const petCategory = require('../controllers/petCategory');

const router = express.Router();

router.get('/', petCategory.index);
router.get('/:categoryName', petCategory.retrieve);

module.exports = router;

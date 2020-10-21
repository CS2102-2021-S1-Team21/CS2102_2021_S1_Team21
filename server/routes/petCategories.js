const express = require('express');
const petCategories = require('../controllers/petCategories');

const router = express.Router();

router.get('/', petCategories.index);
router.get('/:categoryName', petCategories.retrieve);

module.exports = router;

const express = require('express');
const petCategories = require('../controllers/petCategories');

const router = express.Router();

router.get('/:categoryName', petCategories.retrieve);
router.get('/', petCategories.index); // No authentication to allow registration of caretakers

module.exports = router;

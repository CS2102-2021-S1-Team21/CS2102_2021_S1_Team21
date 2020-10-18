const express = require('express');
const pet_category = require('../controllers/pet_category');

const router = express.Router();

router.get('/', pet_category.index);
router.get('/:categoryName', pet_category.retrieve);

module.exports = router;

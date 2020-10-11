const express = require('express');
const petCategories = require('../controllers/petCategories');

const router = express.Router();

router.get('/', petCategories.index);

module.exports = router;

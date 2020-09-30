const express = require('express');
const petOwners = require('../controllers/caretakers');

const router = express.Router();

router.get('/', caretakers.index);
router.get('/:email', caretakers.view);

module.exports = router;

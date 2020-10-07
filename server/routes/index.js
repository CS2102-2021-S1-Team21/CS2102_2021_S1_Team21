const express = require('express');
const petOwners = require('./petOwners');
const leaves = require('./leaves');
const caretakers = require('./caretakers');
const reviews = require('./reviews');

const router = express.Router();

// Routes

router.use('/pet-owners', petOwners);
router.use('/leaves', leaves);
router.use('/caretakers', caretakers);
router.use('/reviews', reviews);

// Example routes, to be removed

router.get('/', (req, res) => {
  res.json({ text: 'Hello World!' });
});

module.exports = router;

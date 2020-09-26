const express = require('express');
const petOwners = require('./petOwners');
const leaves = require('./leaves');

const router = express.Router();

// Routes

router.use('/pet-owners', petOwners);
router.use('/leaves', leaves);

// Example routes, to be removed

router.get('/', (req, res) => {
  res.json({ text: 'Hello World!' });
});

module.exports = router;

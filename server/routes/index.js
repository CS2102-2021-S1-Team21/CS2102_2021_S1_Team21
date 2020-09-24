const express = require('express');
const petOwners = require('./petOwners');

const router = express.Router();

// Routes

router.use('/pet-owners', petOwners);

// Example routes, to be removed

router.get('/', (req, res) => {
  res.json({ text: 'Hello World!' });
});

module.exports = router;

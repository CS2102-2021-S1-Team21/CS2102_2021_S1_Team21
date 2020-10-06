const router = require('express').Router();

const auth = require('./auth');
const { ensureAuthenticated } = require('../auth/middleware');
const petOwners = require('./petOwners');

router.use('/', auth);

// Routes

router.use('/pet-owners', ensureAuthenticated, petOwners);

// Catch-all route (used for error handling)

router.get('/', (req, res) => {
  res.json({ status: 401, message: 'Not logged in' });
});

module.exports = router;

const router = require('express').Router();

const auth = require('./auth');
const { ensureAuthenticated } = require('../auth/middleware');
const petOwners = require('./petOwners');
const leaves = require('./leaves');
const availability = require('./availability');
const caretakers = require('./caretakers');
const reviews = require('./reviews');
const bids = require('./bids');
const pet = require('./pet');
const petCategory = require('./petCategory');
const transferType = require('./transferType');

router.use('/', auth);

// Routes

router.use('/leaves', ensureAuthenticated, leaves);
router.use('/availability', ensureAuthenticated, availability);
router.use('/pet-owners', ensureAuthenticated, petOwners);
router.use('/caretakers', ensureAuthenticated, caretakers);
router.use('/reviews', ensureAuthenticated, reviews);
router.use('/bids', ensureAuthenticated, bids);
router.use('/pet', ensureAuthenticated, pet);
router.use('/petCategory', ensureAuthenticated, petCategory);
router.use('/transferType', ensureAuthenticated, transferType);

// Catch-all route (used for error handling)

router.get('/', (req, res) => {
  res.status(401).json({ error: 'Not logged in' }); // TODO: not needed here
});

module.exports = router;

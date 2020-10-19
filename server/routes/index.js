const router = require('express').Router();

const auth = require('./auth');
const { ensureAuthenticated } = require('../auth/middleware');
const pets = require('./pets');
const petCategories = require('./petCategories');
const petOwners = require('./petOwners');
const leaves = require('./leaves');
const availability = require('./availability');
const caretakers = require('./caretakers');
const reviews = require('./reviews');
const profileSettings = require('./profileSettings');

router.use('/', auth);

// Routes

router.use('/leaves', ensureAuthenticated, leaves);
router.use('/availability', ensureAuthenticated, availability);
router.use('/pet-owners', ensureAuthenticated, petOwners);
router.use('/caretakers', ensureAuthenticated, caretakers);
router.use('/reviews', ensureAuthenticated, reviews);
router.use('/profile-settings', ensureAuthenticated, profileSettings);
router.use('/pets', ensureAuthenticated, pets);
router.use('/pet-categories', ensureAuthenticated, petCategories);

// Catch-all route (used for error handling)

router.get('/', (req, res) => {
  res.status(401).json({ error: 'Not logged in' }); // TODO: not needed here
});

module.exports = router;

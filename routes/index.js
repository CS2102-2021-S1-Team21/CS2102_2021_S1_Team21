const router = require('express').Router();

const auth = require('./auth');
const adminDashboard = require('./adminDashboard');
const { ensureAuthenticated } = require('../auth/middleware');
const pets = require('./pets');
const petCategories = require('./petCategories');
const petOwners = require('./petOwners');
const leaves = require('./leaves');
const availability = require('./availability');
const caretakers = require('./caretakers');
const caresFor = require('./caresFor');
const reviews = require('./reviews');
const profileSettings = require('./profileSettings');
const profile = require('./userProfiles');

router.use('/', auth);

// Routes

router.use('/leaves', ensureAuthenticated, leaves);
router.use('/admin-dashboard', ensureAuthenticated, adminDashboard);
router.use('/availability', ensureAuthenticated, availability);
router.use('/pet-owners', ensureAuthenticated, petOwners);
router.use('/caretakers', ensureAuthenticated, caretakers);
router.use('/caresfor', ensureAuthenticated, caresFor);
router.use('/reviews', ensureAuthenticated, reviews);
router.use('/profile', ensureAuthenticated, profile);
router.use('/profile-settings', ensureAuthenticated, profileSettings);
router.use('/pets', ensureAuthenticated, pets);
router.use('/pet-categories', petCategories);

// Catch-all route (used for error handling)

router.get('/', (req, res) => {
  res.status(401).json({ error: 'Not logged in' }); // TODO: not needed here
});

module.exports = router;

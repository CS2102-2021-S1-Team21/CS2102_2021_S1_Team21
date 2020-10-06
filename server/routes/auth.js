const router = require('express').Router();
const passport = require('passport');
const { ensureAuthenticated } = require('../auth/middleware');

const auth = require('../controllers/auth');

router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/api/login', // redirect to GET /login if login fails
  }),
  auth.create_session,
);
router.get('/login', auth.create_session_failure);

router.delete('/logout', ensureAuthenticated, auth.delete_session);

router.post('/signup', auth.create_user);

module.exports = router;

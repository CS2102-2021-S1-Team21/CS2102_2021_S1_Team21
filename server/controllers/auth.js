const passport = require('passport');
// const db = require('../db');

// Login
exports.create_session = async (req, res, next) => {
  await passport.authenticate('local', (error, user) => {
    if (error) {
      next(error);
    }

    // authentication failed
    if (!user) {
      res.status(401).json({ error: 'Invalid username or password' });
      return;
    }

    req.login(user, (loginError) => {
      if (loginError) {
        return next(loginError);
      }
      const { username, email, name } = user;
      return res.status(200).json({
        message: `Welcome, ${req.user.name}!`,
        data: { username, email, name },
      });
    });
  })(req, res, next);
};

// Logout
exports.delete_session = async (req, res) => {
  await req.logout();
  res.status(200).json({ message: 'Good bye!' });
};

// Session info
exports.session_info = (req, res) => {
  if (!req.user) {
    // TODO: handle expired/ non-existent sessions
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
  const { username, email, name } = req.user;
  // TODO: permissions
  res.status(200).json({ data: { username, email, name } });
};

// Signup
exports.create_user = (req, res, next) => {
  // TODO: registration
};

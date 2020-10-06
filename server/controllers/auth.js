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
      res.status(401).json({ message: 'Invalid username or password' });
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
exports.delete_session = (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Good bye!' });
};

// Verify session
// exports.session_info = (req, res) => {
//   // get user for this session
//   // get user info from db
//   // send to frontend
//   console.log(req);
// };

// Signup
exports.create_user = (req, res, next) => {
  // TODO: registration
};

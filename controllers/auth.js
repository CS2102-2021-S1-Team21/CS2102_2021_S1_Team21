const passport = require('passport');

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
      const { username, email, name } = user; // don't send passwordDigest
      return res.status(200).json({
        success: `Welcome, ${req.user.name}!`,
        data: { username, email, name },
      });
    });
  })(req, res, next);
};

// Logout
exports.delete_session = async (req, res) => {
  await Promise.all([req.session.destroy(), req.logout()]);
  res.status(200).json({ success: 'Good bye!' });
};

// Session info
exports.session_info = (req, res) => {
  if (!req.user) {
    // TODO: handle expired/ non-existent sessions
    res.status(500).json({ error: 'An unexpected error occurred' });
    return;
  }

  const {
    username,
    email,
    name,
    isadmin,
    ispetowner,
    isparttimecaretaker,
    isfulltimecaretaker,
  } = req.user; // don't send passwordDigest
  res.status(200).json({
    username,
    email,
    name,
    isAdmin: isadmin,
    isPetOwner: ispetowner,
    isPartTimeCaretaker: isparttimecaretaker,
    isFullTimeCaretaker: isfulltimecaretaker,
  });
};

const passport = require('passport');
const db = require('../db');

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
        message: `Welcome, ${req.user.name}!`,
        data: { username, email, name },
      });
    });
  })(req, res, next);
};

// Logout
exports.delete_session = async (req, res) => {
  await Promise.all([req.session.destroy(), req.logout()]);
  res.status(200).json({ message: 'Good bye!' });
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

// Signup
// exports.create_user = (req, res, next) => {
  // TODO: registration
// };

exports.delete_user = async (req, res) => {
  try {
    const { username, deletedAt } = req.body;
    const result = await db.query('UPDATE app_user SET deletedAt = $2 WHERE username = $1', [
      username,
      deletedAt,
    ]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.json({ error: 'An unexpected error occurred' });
  }
};

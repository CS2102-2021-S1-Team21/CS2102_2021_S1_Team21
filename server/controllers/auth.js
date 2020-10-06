// const db = require('../db');

// Login
exports.create_session = (req, res) => {
  const { username, email, name } = req.user;
  res.json({
    status: 200,
    message: `Welcome, ${req.user.name}!`,
    data: { username, email, name },
  });
};
exports.create_session_failure = (req, res) => {
  res.json({ status: 401, message: 'Invalid username or password' });
};

// Logout
exports.delete_session = (req, res) => {
  req.logout();
  res.json({ status: 200, message: 'Good bye!' });
};

// Signup
exports.create_user = (req, res, next) => {
  // TODO: registration
};

// const db = require('../db');

// Login
exports.create_session = (req, res) => {
  const { username, email, name } = req.user;
  res.status(200).json({
    message: `Welcome, ${req.user.name}!`,
    data: { username, email, name },
  });
};
exports.create_session_failure = (req, res) => {
  res.status(401).json({ message: 'Invalid username or password' });
};

// Logout
exports.delete_session = (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Good bye!' });
};

// Signup
exports.create_user = (req, res, next) => {
  // TODO: registration
};

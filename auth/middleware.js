exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ error: 'Not logged in' });
  }
};

exports.ensureUnauthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    // TODO: not sure what the correct response should be
    res.status(200).json({ info: 'Already logged in' });
  }
};

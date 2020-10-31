const users = require('./users');

exports.permissions = {
  // Note: Ensure that there are no conflicting keys in any of the permissions objects
  ...users,
};

exports.checkPermissions = (...permissions) => (req, res, next) => {
  const canPerformAction = permissions.reduce(
    (isAllowed, hasAbility) => isAllowed && hasAbility(req.user),
    true,
  );
  if (canPerformAction) {
    next();
  } else {
    res.status(401).json({ error: 'You are not allowed to carry out this action' });
  }
};

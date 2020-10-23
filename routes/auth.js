const router = require('express').Router();
const { ensureAuthenticated } = require('../auth/middleware');
const { permissions, checkPermissions } = require('../permissions');

const auth = require('../controllers/auth');
const users = require('../controllers/users');

router.get('/sessions', auth.session_info);
router.post('/sessions', auth.create_session);
router.delete('/sessions', ensureAuthenticated, auth.delete_session);

router.post('/users', users.create_user);
router.delete('/users/:username', users.delete_user);

router.post('/admins', ensureAuthenticated, checkPermissions(permissions.canCreateAdmin), users.create_admin_user);

module.exports = router;

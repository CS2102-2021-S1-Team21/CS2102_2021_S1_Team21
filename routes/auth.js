const router = require('express').Router();
const { ensureAuthenticated } = require('../auth/middleware');

const auth = require('../controllers/auth');
const users = require('../controllers/users');

router.get('/sessions', auth.session_info);
router.post('/sessions', auth.create_session);
router.delete('/sessions', ensureAuthenticated, auth.delete_session);

// router.post('/users', auth.create_user);
router.delete('/users/:username', users.delete_user);

router.post('/admins', users.create_admin_user);

module.exports = router;

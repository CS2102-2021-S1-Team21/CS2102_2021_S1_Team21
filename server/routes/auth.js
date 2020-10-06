const router = require('express').Router();
const { ensureAuthenticated } = require('../auth/middleware');

const auth = require('../controllers/auth');

router.post('/login', auth.create_session);

router.delete('/logout', auth.delete_session);

router.post('/signup', auth.create_user);

module.exports = router;

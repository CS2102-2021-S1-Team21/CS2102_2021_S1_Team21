const express = require('express');
const caretakers = require('../controllers/caretakers');

const router = express.Router();

router.get('/', caretakers.index);
router.get('/:username', caretakers.view);
router.get('/salary/:username', caretakers.viewSalary);

module.exports = router;

const express = require('express');
const leaves = require('../controllers/leaves');

const router = express.Router();

router.post('/', leaves.apply);
router.get('/:caretakerUsername', leaves.retrieve);
router.get('/', leaves.retrieveAllPending);
router.put('/:caretakerUsername/:startDate/:endDate', leaves.updateApproval);
router.post('/delete', leaves.cancel);

module.exports = router;

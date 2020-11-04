const express = require('express');
const bids = require('../controllers/bids');

const router = express.Router();

router.post('/', bids.apply);
router.delete('/:petName/:petOwnerUsername/:caretakerUsername/:submittedAt/:startDate/:endDate', bids.delete);
router.get('/petOwner/:petOwnerUsername', bids.petOwnerRetrieve);
router.get('/caretaker/:caretakerUsername', bids.caretakerRetrieve);
router.put('/update', bids.updateBids);
router.get('/update', bids.retrieve);

module.exports = router;

const express = require('express');
const pets = require('../controllers/pets');

const router = express.Router();

router.post('/', pets.new);

router.get('/:petOwnerUsername', pets.index);

//temp
router.get('/retrieve/:petOwnerUsername', pets.retrieve);

router.get('/:petOwnerUsername/:petName', pets.view);
router.put('/:petOwnerUsername/:petName', pets.edit);
router.delete('/:petOwnerUsername/:petName', pets.delete);

module.exports = router;

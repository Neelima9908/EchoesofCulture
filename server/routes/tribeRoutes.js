const express = require('express');
const { getAllTribes, addTribe,checkSpecies } = require('../controllers/tribesController');

const router = express.Router();

router.get('/tribe', getAllTribes);
router.post('/tribe', addTribe);
router.get('/check', checkSpecies);
module.exports = router;

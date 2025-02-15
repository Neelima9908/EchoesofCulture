const express = require('express');
const { getAllLanguages, addLanguage ,checkSpecies} = require('../controllers/languagesController');

const router = express.Router();

router.get('/lang', getAllLanguages);
router.post('/lang', addLanguage);
router.get('/check', checkSpecies);

module.exports = router;

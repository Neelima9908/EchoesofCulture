const express = require('express');
const { getAllComments, addComment } = require('../controllers/commentsController');

const router = express.Router();

router.get('/', getAllComments);
router.post('/', addComment);

module.exports = router;

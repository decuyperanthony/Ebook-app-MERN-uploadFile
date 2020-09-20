const express = require('express');
const router = express.Router();

const authorController = require('../controllers/authorController');

router.get('/authors', authorController.getAllAuthors);
router.get('/author/:id', authorController.getOneAuthor);
router.post('/author', authorController.addAuthor);

module.exports = router;
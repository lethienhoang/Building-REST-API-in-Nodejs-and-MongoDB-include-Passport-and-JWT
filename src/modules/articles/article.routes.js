
const express = require('express');
const router = express.Router();
const validate = require('express-validation');
const articleController = require('./article.controller');
const auth = require('../../services/auths/auth.service');

router.post('/', auth.required, articleController.article_post);
router.get('/search', articleController.article_search_get);

module.exports = router;
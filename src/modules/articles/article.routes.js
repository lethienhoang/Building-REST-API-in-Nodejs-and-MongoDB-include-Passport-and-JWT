
const express = require('express');
const router = express.Router();
const validate = require('express-validation');
const articleController = require('./article.controller');
const auth = require('../../services/auths/auth.service');

router.post('/',  auth.required, articleController.article_post);
router.get('/:id', articleController.article_byId_get);
router.get('/search', articleController.article_search_get);
router.get('/myfeed', auth.required, articleController.article_byUserId_get);
router.get('/feed', auth.required, articleController.feed_get);
router.delete('/:id', auth.required, articleController.article_delete);
module.exports = router;
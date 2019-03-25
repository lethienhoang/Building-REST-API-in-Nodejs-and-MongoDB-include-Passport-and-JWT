const express = require('express');
const router = express.Router();
const validate = require('express-validation');
const auth = require('../../services/auths/auth.service');
const commentControler = require('./comment.controller');
const commentValidation = require('./comment.validations');

const commentValidation = require('./comment.validations');
router.post('/:article/comments',  auth.required, validate(commentValidation.comment), validate(articleValidation.create_article), articleController.article_post);
router.get('/:article/comments', commentControler.comment_get);
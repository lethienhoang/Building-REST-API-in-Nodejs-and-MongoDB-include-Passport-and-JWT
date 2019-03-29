const express = require('express');
const router = express.Router();
const validate = require('express-validation');
const auth = require('../../services/auths/auth.service');
const commentControler = require('./comment.controller');
const commentValidation = require('./comment.validations');

router.post('/:id/comments',  auth.required, validate(commentValidation.comment), commentControler.comment_post);
router.get('/:id/comments', commentControler.comment_get);

module.exports = router;
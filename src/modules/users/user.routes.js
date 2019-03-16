const express = require('express');
const router = express.Router();
const validate = require('express-validation');
const userValidation = require('./user.validations');
const userController = require('./user.controller');
const auth = require('../../services/auth.service');

router.post('/signup', validate(userValidation.signup), userController.signUp_post);
router.post('/login', auth.authLocal, userController.login_post);
module.exports =  router;
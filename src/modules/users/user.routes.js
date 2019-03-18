const express = require('express');
const router = express.Router();
const validate = require('express-validation');
const userValidation = require('./user.validations');
const userController = require('./user.controller');


router.post('/signup', validate(userValidation.signup), userController.signUp_post);
router.post('/login', validate(userValidation.login), userController.login_post);
module.exports =  router;
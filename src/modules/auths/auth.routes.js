const express = require('express');
const router = express.Router();
const validate = require('express-validation');
const userValidation = require('../users/user.validations');
const userController = require('../users/user.controller');


router.post('/login', validate(userValidation.login), userController.login_post);
module.exports =  router;

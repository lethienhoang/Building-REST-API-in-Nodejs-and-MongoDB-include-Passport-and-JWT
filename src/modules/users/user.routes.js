const express = require('express');
const router = express.Router();
const validate = require('express-validation');
const userValidation = require('./user.validations');
const userController = require('./user.controller');
const auth = require('../../services/auth.service');

router.post('/signup', validate(userValidation.signup), userController.signUp_post);
router.post('/login', validate(userValidation.login), userController.login_post);
router.get('/me', auth.required, userController.getUserByid_get);
router.put('/', auth.required, validate(userValidation.update), userController.updateUser_put);
router.put('/me', auth.required, validate(userValidation.changePassword), userController.changePassword_put);

module.exports =  router;
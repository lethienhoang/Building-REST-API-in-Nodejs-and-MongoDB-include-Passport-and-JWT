const express = require('express');
const router = express.Router();
const validate = require('express-validation');
const userController = require('./user.controller');
const auth = require('../../services/auths/auth.service');

router.post('/signup', userController.signUp_post);
router.get('/me', auth.required, userController.getUserByid_get);
router.put('/', auth.required, userController.updateUser_put);
router.put('/me', auth.required, userController.changePassword_put);

module.exports =  router;
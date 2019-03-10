var express = require('express');
var router = express.Router();
const userController = require('./user.controller');

router.post('/signup', userController.signUp_post);
router.get('/:id', userController.signIn_post);
module.exports =  router;
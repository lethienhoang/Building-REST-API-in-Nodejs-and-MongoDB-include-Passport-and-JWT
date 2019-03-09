const { Router } = require('express');
const userController = require('./user.controller');
const routes = new Router();

routes.post('/signup', userController.signUp);
routes.get('/:id', userController.signIn);
module.exports =  routes;
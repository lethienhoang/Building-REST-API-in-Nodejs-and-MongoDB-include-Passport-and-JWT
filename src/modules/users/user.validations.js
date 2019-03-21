const  Joi = require('joi');

const passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
exports.passwordReg = passwordReg;
exports.signup = function()  {
     const signup = {
         email: Joi.string().email().required(),
         password: Joi.string().regex(passwordReg).required(),
         firstName: Joi.string().required(),
         lastName: Joi.string().required(),
         userName: Joi.string().required(),
     }
     return signup;
 };

 exports.login = function() {
    const signin = {
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }

    return signin;
 }

 exports.update = function() {
     const user = {
        email: Joi.string().email().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        userName: Joi.string().required(),
     }

     return user;
 }

 exports.changePassword = function() {
    const user = {
       password: Joi.string().regex(passwordReg).required(),
    }

    return user;
}
const  Joi = require('joi');

const passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
exports.passwordReg = passwordReg;
exports.validation_signup = function()  {
     const signup = {
         email: Joi.string().email().required(),
         password: Joi.string().regex(passwordReg).required(),
         firstName: Joi.string().required(),
         lastName: Joi.string().required(),
         userName: Joi.string().required(),
     }
     return signup;
 };

 exports.validation_signin = function() {
    const signin = {
        userName: Joi.string().required(),
        password: Joi.string().required(),
    }

    return signin;
 }
const  Joi = require('joi');

const passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
exports.passwordReg = passwordReg;
exports.signup = function(model)  {
     const validate = {
         email: Joi.string().email().required(),
         password: Joi.string().regex(passwordReg).required(),
         firstName: Joi.string().required(),
         lastName: Joi.string().required(),
         userName: Joi.string().required(),
     }
     return Joi.validate(model, validate);
 };

 exports.login = function(model) {
    const validate = {
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }

    return Joi.validate(model, validate);
 }

 exports.update = function(model) {
     const validate = {
        email: Joi.string().email().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        userName: Joi.string().required(),
     }

     return Joi.validate(model, validate);
 }

 exports.changePassword = function(model) {
    const validate = {
       password: Joi.string().regex(passwordReg).required(),
    }

    return Joi.validate(model, validate);
}
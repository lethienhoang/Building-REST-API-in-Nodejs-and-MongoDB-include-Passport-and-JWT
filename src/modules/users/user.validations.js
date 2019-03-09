const  Joi = require('joi');

const passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
module.exports.passwordReg = passwordReg;
module.exports = {
     signup: {
         email: Joi.string().email().required(),
         password: Joi.string().regex(passwordReg).required(),
         firstName: Joi.string().required(),
         lastName: Joi.string().required(),
         userName: Joi.string().required(),
     },
     signin: {
         userName: Joi.string().required(),
         password: Joi.string().required(),
     }
 };
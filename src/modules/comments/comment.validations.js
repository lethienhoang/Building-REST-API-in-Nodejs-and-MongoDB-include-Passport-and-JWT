const Joi = require('joi');

exports.comment = function(model) {
    const validate = {
        body: Joi.string().required(),
    }

    return Joi.validate(model, validate);;}

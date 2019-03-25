const Joi = require('joi');

exports.create_article = function() {
    const validate = {
        title: Joi.string().required(),
        body: Joi.string().required(),
    }

    return validate;
}

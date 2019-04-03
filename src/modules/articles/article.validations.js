const Joi = require('joi');

exports.create_article = function(model) {
    const validate = {
        title: Joi.string().required(),
        body: Joi.string().required(),
    }

    return Joi.validate(model, validate);
}

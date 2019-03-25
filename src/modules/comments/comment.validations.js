const Joi = require('joi');

exports.comment = function() {
    const validate = {
        body: Joi.string().required(),
    }

    return validate;
}

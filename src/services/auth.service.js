const jwt = require('jsonwebtoken');
const constant = require('../contansts/constants');

function getTokenFromHeaders(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') {
        return req.headers.authorization.split(' ')[1];
    }
}


var auth = {
    required: jwt({
        secret: constant.secret,
        userProperty: 'payload',
        getToken: getTokenFromHeaders
    }),
    optional: jwt({
        secret: constant.secret,
        userProperty: 'payload',
        credentialsRequired: false,
        getToken: getTokenFromHeaders
    })
};

module.exports = auth;
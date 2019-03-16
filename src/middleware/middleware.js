const morgan = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const passport = require('passport');
// const { isPrimitive } =  require("util");
const constants = require('../contansts/constants');

const isDev = process.env.NODE_ENV === constants.DEV_ENV;
const isProd = process.env.DEV_ENV === constants.PROD_ENV;

module.exports = function(app) {
    
    if (isProd) {
        app.use(compression());
        app.use(helmet());
    } else if (isDev) {
        app.use(morgan('dev'));
    }

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(passport.initialize());

}
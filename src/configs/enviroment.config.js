const constants = require('../contansts/constants');

const prodConfig = {
    PORT: constants.PORT,
    DB_URL: constants.MONGO_URL_PROD
};
const devConfig = {
    PORT: constants.PORT,
    DB_URL: constants.MONGO_URL_DEV,
};

const testConfig = {
    PORT: constants.PORT,
    DB_URL: constants.MONGO_URL_TEST,
}

module.exports = function(env) {
    switch(env) {
        case constants.PROD_ENV:
            return prodConfig;
        case constants.TEST_ENV:
            return testConfig;
        default:
            return devConfig;
    }
};
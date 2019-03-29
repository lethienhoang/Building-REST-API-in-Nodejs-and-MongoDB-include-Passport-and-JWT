

module.exports =  Object.freeze({ 
    PORT: process.env.PORT || 3000,
    PROD_ENV: 'production',
    DEV_ENV: 'development',
    TEST_ENV: 'none',
    // Database
    MONGO_URL_DEV: 'mongodb://localhost:27017/demo_api_dev',
    MONGO_URL_PROD: 'mongodb://localhost:27017/demo_api_prod',
    MONGO_URL_TEST: 'mongodb://localhost:27017/demo_api_test',

    // 
    SALT_WORK_FACTOR: 10,
    JWT_SECRET: 'JWT_SECRET',
});

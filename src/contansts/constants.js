module.exports =  Object.freeze({ 
    PORT: process.env.PORT || 3000,
    PROD_ENV: 'production',
    DEV_ENV: 'development',
    // Database
    MONGO_URL_DEV: 'mongodb://localhost/nodejs_basic_api_dev',
    MONGO_URL_PROD: 'mongodb://localhost/nodejs_basic_api_prod',

    // 
    
});

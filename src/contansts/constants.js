module.exports =  Object.freeze({ 
    PORT: process.env.PORT || 3000,
    PROD_ENV: 'production',
    DEV_ENV: 'development',
    // Database
    MONGO_URL_DEV: 'mongodb://localhost/demo_api_dev',
    MONGO_URL_PROD: 'mongodb://localhost/demo_api_prod',

    // 
    
});

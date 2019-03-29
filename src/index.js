const express = require('express');
const envConfig = require('./configs/enviroment.config');
const middlewareConfig = require('./middleware/middleware');
const apiRoutes = require('./modules');
const db = require('./configs/db.config');
const passport = require('passport');
const configPassport = require('./configs/passport');
const logger = require('./logs/logging');
const env = envConfig(process.env.NODE_ENV);
const app = express();

middlewareConfig(app);
apiRoutes(app);
db(env);
configPassport(passport);
logger(app);

app.listen(env.PORT, err => {    
    if(err) {
        console.log(err);
        throw err;
    } else {
        console.log(`Server running on port: ${env.PORT} --- running on ${process.env.NODE_ENV}`)
    }
});


module.exports = app;

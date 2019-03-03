const express = require('express');
const config = require('../configs/enviroment.config');
const env = config.envConfig(process.env.NODE_ENV);
const app = express();

app.listen(env.PORT, err => {
    if(err) {
        throw err;
    } else {
        console.log(`Server running on port: ${PORT} --- running on ${process.env.NODE_ENV}`)
    }
});


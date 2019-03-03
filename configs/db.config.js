const mongoose = require('mongoose');
const config = require('../configs/enviroment.config');
const env = config.envConfig(process.env.NODE_ENV);
//Removes the warning with promises 
mongoose.Promise = global.Promise;

// Connection to db
try {
    mongoose.connect(env.DB_URL)
}
catch (err) {
    mongoose.createConnection(env.DB_URL)
}

mongoose.connection.once('open', () => console.log('Db is running')).on('error', e => {
    throw e;
})
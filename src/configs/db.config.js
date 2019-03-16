const mongoose = require('mongoose');
const option = {
    useNewUrlParser: true,
    useCreateIndex: true
}
module.exports = function(env) {
//Removes the warning with promises 
    mongoose.Promise = global.Promise;

    // Connection to db
    try {
        mongoose.connect(env.DB_URL, option);
    }
    catch (err) {
        mongoose.createConnection(env.DB_URL, option);
    }

    mongoose.connection.once('open', () => console.log('Database is running')).on('error', e => {
        throw e;
    });
}

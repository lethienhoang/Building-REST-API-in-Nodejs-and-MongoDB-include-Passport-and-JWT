const wintons = require('../configs/wintons');
const morgan = require('morgan');

module.exports = function(app){
    app.use(morgan('combined', {stream: wintons.stream}));

    app.use(function(err, req, res, next){
         // add this line to include winston logging
        winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    
        // render the error page
        res.status(err.status || 500);
        // render error html here
        res.render('error');
    })
}


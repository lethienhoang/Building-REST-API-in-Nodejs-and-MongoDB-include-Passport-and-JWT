const userRoutes = require('./users/user.routes');

module.exports = function(app) {
    // user routes
    app.use('/api/v1/users', userRoutes);
    
    // another routes
}
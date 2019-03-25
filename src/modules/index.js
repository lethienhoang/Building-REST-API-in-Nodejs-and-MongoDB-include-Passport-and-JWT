const userRoutes = require('./users/user.routes');
const articleRoutes = require('./articles/article.routes');
const authRoutes = require('./auths/auth.routes');
const commentRoutes = require('./comments/comment.routes');

module.exports = function(app) {
    // user routes
    app.use('/api/v1/users', userRoutes);
    // auth routes
    app.use('/api/v1/auth', authRoutes);
    
    // article routes
    app.use('/api/v1/article', articleRoutes);
    // comments
    app.use('/api/v1/article', commentRoutes);
}
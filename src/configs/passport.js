
const User = require('../modules/users/user.model');
const LocalStrategy = require('passport-local').Strategy;
const localOpts = {
    usernameField: 'email',
};

module.exports = function(passport) {

    passport.serializeUser(function (user, done) {
       done(null, user._id)
    });
    
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
        done(err, user)
      });
    });

    passport.use('local', new LocalStrategy(localOpts, function(email, password, done) {        
        User.findOne({email: email}, function(err, user) {
            if (err) { return done(err); }
    
            if (!user) { return done(null, false); }
            
            user.verifyPassword(password,function(err, isMatch) {
                if (err) return done(err , false);
                if (!isMatch) return done(null , false);
            });           
    
            return done(null, user);
        });
    }));
};
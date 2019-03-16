
const passport = require('passport');
const User = require('../modules/users/user.model');
const LocalStrategy = require('passport-local').Strategy;

const localOpts = {
    usernameField: 'email',
};

passport.use(new LocalStrategy(localOpts, async function(email, password, done) {
    console.log(email + passport);
    await User.findOne({email: email}, function(err, user) {
        
        if (err) { return done(err); }

        if (!user) { return done(null, false); }

        if (!user.verifyPassword(password)) { return done(null, false); }

        return done(null, true);
    });
}));


exports.authLocal = passport.authenticate('local', {
    session: false,
    // failureRedirect: '/login'
});
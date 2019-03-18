const User = require('./user.model');
const _ = require('lodash');
const passport = require('passport');

exports.signUp_post =  async function(req, res) {
    try {
        const user = new User(_.pick(req.body, ['email','firstName', 'lastName','userName','password']));
        await user.save(function(err) {
            if (err) throw err;
        });
        
        return res.status(200).send(_.pick(user, ['email','firstName', 'lastName','userName']));

    } catch (e) {
        return res.status(500).send(e);
    }
}

exports.login_post =  async function(req, res, next) {
    try {
        return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
          if(err) {
           return next(err);
          }
           
          console.log(info);          
          if(passportUser) {
            const user = passportUser;
            user.token = passportUser.generateJWT();
        
            return res.send({ user: user.toAuthJSON() });
          }
        
          return res.status(400);
          })(req, res, next);
        
    } catch (e) {
        return res.status(500).send(e);
    }
}
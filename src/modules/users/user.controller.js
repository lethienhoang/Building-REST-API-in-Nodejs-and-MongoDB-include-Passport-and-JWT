const User = require('./user.model');
const _ = require('lodash');
const passport = require('passport');
const userValidation = require('./user.validations');

exports.signUp_post =  async function(req, res) {
    try {
 
		const { error } = userValidation.signup(req.body);
		if (error) return res.status(400).send(error.details[0].message);
		
        const user =  new User(_.pick(req.body, ['email','firstName', 'lastName','userName','password']));
        await user.save();
        
        return res.status(200).send(user.toAuthJSON());

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

exports.getUserByid_get = async function(req, res) {

    const user = await User.findById(req.payload.id).select('-password');
    if (!user) return res.status(404).send('User was not found');

    return res.status(200).send(_.pick(user, ['email','firstName', 'lastName','userName']));
    
}

exports.updateUser_put = async function(req, res) {
    try {


		const { error } = userValidation.update(req.body);
		if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findByIdAndUpdate(req.payload.id, _.pick(['firstName', 'lastName','userName']));

        if (!user) return res.status(404).send('User was not found');

        const _user = await user.save();
        res.send(_.pick(_user, ['email','firstName', 'lastName','userName']));
    }
    catch (e) {
        return res.status(500).send(e);
    }
}

exports.changePassword_put =  async function(req, res) {
    try {
		
		const { error } = userValidation.changePassword(req.body);
		
		if (error) return res.status(400).send(error.details[0].message);
        const user = await User.findByIdAndUpdate(req.payload.id, _.pick(['password']));

        if (!user) return res.status(404).send('User was not found');

        const _user = await user.save();
        res.send(_.pick(_user, ['email','firstName', 'lastName','userName']));
    }
    catch (e) {
        return res.status(500).send(e);
    }
}
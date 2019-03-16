const User = require('./user.model');
const _ = require('lodash');

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

exports.login_post =  async function(req, res) {
    try {
        res.status(200).send(req.user);
        return next();
        
    } catch (e) {
        return res.status(500).send(e);
    }
}
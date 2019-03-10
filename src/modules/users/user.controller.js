const User = require('./user.model');

exports.signUp_post =  async function(req, res) {
    try {
        
        const user = await User.create(req.body);
        return res.status(200).join(user);

    } catch (e) {
        return res.status(500).json(e);
    }
}

exports.signIn_post =  async function(req, res) {
    try {

    } catch (e) {
        
    }
}
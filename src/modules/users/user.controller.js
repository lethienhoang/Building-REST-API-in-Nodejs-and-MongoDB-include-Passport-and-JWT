const User = require('./user.model');

module.exports =  async function signUp(req, res) {
    try {
        
        const user = await User.create(req.body);
        return res.status(200).join(user);

    } catch (e) {
        return res.status(500).json(e);
    }
}

module.exports =  async function signIn(req, res) {
    try {

    } catch (e) {
        
    }
}
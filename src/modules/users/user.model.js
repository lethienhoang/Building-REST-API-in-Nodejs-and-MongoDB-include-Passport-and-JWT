const mongoose = require('mongoose');
const validator = require('validator');
const { passwordReg } = require('./user.validations');
const bcrypt =  require('bcrypt');
const constant = require('../../contansts/constants');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
        trim: true,
        validate: {
            validator(email) {
                return validator.isEmail(email);
            },
            message: '{VALUE} is not a valid email',
        },
    },
    firstName: {
        type: String,
        required: [true, 'FirstName is required'],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'LastName is required'],
        trim: true
    },
    userName: {
        type: String,
        required: [true, 'UserName is required'],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password need to be longer'],
        trim: true,
        validate: {
            validator(password) {
                return passwordReg.test(password);
            },
            message: '{VALUE} is not a valid password!',
        }
    }
});



UserSchema.pre('save', function(next) {
    
    var user = this;
    if (user.isModified('password') && user.password !== undefined) {  
         // generate a salt
        bcrypt.genSalt(constant.SALT_WORK_FACTOR, function(err, salt) {
            if (err) console.log(err);

            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) console.log(err);

                user.password = hash;
                next();
            })
        })     
    } else {
        next();
    }
   
});

UserSchema.methods.verifyPassword  = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
}

UserSchema.methods.generateJWT = function() {
    const today = new Date();
    const exp = new Date(today);

    // Set expire
    exp.setDate(today.getDate() + 5);

    return jwt.sign({
        id: this._id,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        userName: this.userName,
        exp: parseInt(exp.getTime() / 1000)
    }, constant.JWT_SECRET)
}

UserSchema.methods.toAuthJSON = function(){
    return {
        username: this.userName,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        token: this.generateJWT()
    };
};

module.exports =  mongoose.model('User', UserSchema);
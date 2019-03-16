const mongoose = require('mongoose');
const validator = require('validator');
const { passwordReg } = require('./user.validations');
const bcrypt =  require('bcrypt');
const SALT_WORK_FACTOR = 10;

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
        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
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

UserSchema.methods.verifyPassword  = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
}


module.exports =  mongoose.model('User', UserSchema);
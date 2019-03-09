const mongoose = require('mongoose');
const validator = require('validator');
const { passwordReg } = require('./user.validations');

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

module.exports =  mongoose.model('User', UserSchema);
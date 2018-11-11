const Joi = require('joi');
const bcrypt = require('bcrypt');
const PasswordComplexity = require('joi-password-complexity');
const mongoose = require('mongoose');

// Schema to Validate incomming Complaint Object from user.
const schema = {
    name: Joi.string().min(10).max(255).required(),
    email: Joi.string().min(3).max(255).email().required(),
    password: Joi.string().min(5).max(255).required(),
    position: Joi.string().min(5).max(35).required(),
    phone: Joi.string().min(10).max(10).required()
}

// This is the actual Schema that how the complaint object will be saved in MongoDB.
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    position: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 255,
        unique: true,
        required: true
    },
    password: {
        type: String,
        maxlength: 1024,
        minlength: 5,
        required: true
    },
    phone: {
        type: String,
        required: true,
        maxlength: 10
    }
});

// Creating instance of Model User to store,reteive,uodate and delete records from complaints Collection.
const User = mongoose.model('User', userSchema);

// function to validate incomming object with the schema and return the result.
function validateUser(user) {
    return Joi.validate(user, schema);
}

async function validatePasswrodComplexity(password) {
    return await Joi.validate(password, new PasswordComplexity());
}

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}


exports.User = User;
exports.validate = validateUser;
exports.validatePassword = validatePasswrodComplexity;
exports.hashPassword = hashPassword;
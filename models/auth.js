const Joi = require('joi');
const _ = require('lodash');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

const schema = {
    email: Joi.string().min(3).max(255).email().required(),
    password: Joi.string().min(5).max(255).required()
}

async function comparePassword(password, hashed) {
    return bcrypt.compare(password, hashed);
}

function validateUserAuth(user) {
    return Joi.validate(user, schema);
}

function createAuthToken(user) {
    return jwt.sign(user, config.get("jwtPrivateKey"));
}


exports.validate = validateUserAuth;
exports.compare = comparePassword;
exports.createToken = createAuthToken;
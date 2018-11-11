const { User, validate, validatePassword, hashPassword } = require('../models/user');
const _ = require('lodash');
const express = require('express');
const router = express.Router();

router.post('/register', async (req, res) => {

    const result = validate(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send("User already exist with this email.");


        await validatePassword(req.body.password);

        newUser = new User({
            name: req.body.name,
            email: req.body.email,
            position: req.body.position,
            phone: req.body.phone,
            password: req.body.password
        });

        newUser.password = await hashPassword(newUser.password);

        user = await newUser.save();
        res.status(200).send(_.pick(user, ['_id', 'name', 'email', 'position', 'phone', 'password']));

    } catch (ex) {
        res.status(400).send(ex.message);
    }

});


module.exports = router;
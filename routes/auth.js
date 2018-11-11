const { validate, compare, createToken } = require('../models/auth');
const { User } = require('../models/user');
const _ = require('lodash');
const express = require('express');
const router = express.Router();

router.post('/login', async (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(result.error.details[0].message);

    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send("Invalid email or password.");

        const validPassword = await compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send("Invalid email or password.");

        const userToken = createToken(_.pick(user, ['_id', 'name', 'email']));

        res.header('x-auth-token', userToken).send("Login Success....");

    } catch (ex) {
        res.status(400).send(ex.message);
    }

});


module.exports = router;
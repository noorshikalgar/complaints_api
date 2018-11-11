const mongoose = require('mongoose');
const config = require('config');
const home = require('./routes/home');
const complaints = require('./routes/complaints');
const users = require('./routes/users');
const auth = require('./routes/auth');
const express = require('express');
const app = express();


if (!config.get('jwtPrivateKey')) {
    console.error("FATAL ERROR : jwtPrivateKey is not Set....");
    process.exit(1);
}

app.use(express.json());

mongoose.connect('mongodb://localhost/complaints', { useNewUrlParser: true })
    .then(() => { console.log('Connected to Database....') })
    .catch(err => console.log(err));

app.use('/', home);
app.use('/api/complaints', complaints);
app.use('/api/users/', users);
app.use('/auth', auth);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on Port ${port}`);
});
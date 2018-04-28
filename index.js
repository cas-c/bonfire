const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config');
const endpoints = require('./endpoints');
const { isAuthed } = require('./utils');

const mongoose = require('mongoose');
mongoose.connect(config.db.url);


const app = express();
app.set('secret', config.secret);
app.use(require('morgan')(config.env));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/leaderboard', endpoints.leaderboard);
app.use('/api/transaction', isAuthed, endpoints.transaction);
app.use('/api/user', isAuthed, endpoints.user);
//app.use('/api/test', isAuthed, require('./endpoints/test'));

app.listen(config.port, () => {
    console.log(`Running on port ${config.port}`);
});





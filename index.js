const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config');
const endpoints = require('./endpoints');

const mongoose = require('mongoose');
mongoose.connect(config.db.url);



const app = express();
app.set('secret', config.secret);
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/transaction', endpoints.transaction);

app.listen(3000, () => {
    console.log('Running on port 3000!');
});





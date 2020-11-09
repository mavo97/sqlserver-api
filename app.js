'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const api = require('./routes')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', api)

app.get('/', function (req, res) {
	res.send('<h1>Hello node web server</h1>');
});


module.exports = app
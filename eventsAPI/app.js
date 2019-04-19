var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
app.use(bodyParser.json());
app.use(morgan('combined'));

app.route('/events')
    .all(function(req, res, next) {
        // runs for all HTTP verbs first
        // think of it as route specific middleware!
    })
    .get(function(req, res, next) {

    })
    .post(function(req, res, next) {
        // maybe add a new event...
    })
    .put(function(req, res, next) {
        // maybe add a new event...
    });
app.listen(3000);
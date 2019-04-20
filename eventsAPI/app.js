var express = require('express');
var app = express();
var bodyParser = require('body-parser');
let morgan = require('morgan');
var controlador = require('./controladorEventos.js');

app.use(bodyParser.json());
app.use(morgan('combined'));

app.route('/eventos')
    .get(function(req, res) {

        res.send('Get a random book');
    })
    .post(function(req, res) {
        controlador.insertarEvento(req.body);
        res.send('se ha insertado ' + req.body);
    })
    .put(function(req, res) {
        res.send('Update the book');
    });
app.listen(3000);
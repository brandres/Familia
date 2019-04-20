var express = require('express');
var app = express();
var bodyParser = require('body-parser');
let morgan = require('morgan');
var controlador = require('./controladorEventos.js');

app.use(bodyParser.json());
app.use(morgan('tiny'));

app.route('/eventos')
    .get(function(req, res) {
        controlador.getEventos().then(function(result){
            res.set('Content-Type', 'application/json')
            var jsonResult = {
                codigo: 'ok',
                eventos: result
            }
            res.send(jsonResult);
        });
    })
    .post(function(req, res) {
        controlador.insertarEvento(req.body);
        res.send('se ha insertado ' + JSON.stringify(req.body));
    })
    .put(function(req, res) {
        res.send('Update the book');
    });
app.listen(8080);
controlador.conectarseBD();
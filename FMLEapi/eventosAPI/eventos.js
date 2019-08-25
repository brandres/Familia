var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
let morgan = require('morgan');
var controlador = require('./controladorEventos.js');

router.use(bodyParser.json());
router.use(morgan('tiny'));

router.route('/eventos')
    .get(function(req, res) {
        controlador.getEventos().then(function(result){
            res.set('Content-Type', 'application/json');
            var jsonResult = {
                codigo: 'ok',
                eventos: result
            };
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
module.exports = router;
controlador.conectarseBD();
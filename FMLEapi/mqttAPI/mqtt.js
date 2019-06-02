var express = require('express');
var router = express.Router();
var io = require('socket.io')(8081);

var bodyParser = require('body-parser');
let morgan = require('morgan');
let mqtt = require('mqtt');
let client  = mqtt.connect('mqtt://fmle.ddns.net');


router.use(bodyParser.json());
router.use(morgan('tiny'));

client.on('connect', function () {
    console.log('connected');
});
router.route('/*')
    .get(function(req, res) {
        client.subscribe(req.params[0]);


    })
    .post(function(req, res) {
        console.log(req.params[0]);
        console.log(req.body.message);
        client.publish(req.params[0], req.body.message);
        client.end();
        res.send('jsonResult');
    })
    .put(function(req, res) {
        res.send('resultado');
    })
    .patch(function (req,res) {
      client.unsubscribe(req.params[0],function () {
      });
});

client.on('message', function (topic, message) {
    console.log(topic.toString());
    // message is Buffer
    io.sockets.emit(message.toString(),topic)
    console.log(message.toString());
});
module.exports = router;

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var io = require('socket.io').listen(8081);
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

    })
    .post(function(req, res) {
        console.log(req.params[0]);
        console.log(req.body);
        console.log(req.body.action);
        switch(req.body.action){
            case 'sub': client.subscribe(req.params[0]); break;
            case 'desub': client.unsubscribe(req.params[0]);break;
            case 'pub': client.publish(req.params[0], req.body.message);break;
            default: break;
        }
        res.send('jsonResult');
    })
    .put(function(req, res) {
        res.send('resultado');
    })
    .patch(function (req,res) {
      client.unsubscribe(req.params[0],function () {
      });
});
io.on('connection', function(socket){
    console.log('a user connected');
});
client.on('message', function (topic, message) {
    console.log(topic.toString());
    // message is Buffer
    io.sockets.emit(topic,message.toString());
    console.log(message.toString());
});

module.exports = router;

let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let io = require('socket.io').listen(8081, {'pingTimeout': 400, 'pingInterval': 200});
let morgan = require('morgan');
let mqtt = require('mqtt');
let client = mqtt.connect('mqtt://fmle.ddns.net');
let subscriptions = [];
router.use(bodyParser.json());
router.use(morgan('tiny'));
client.on('connect', function () {
    console.log('connected');
});

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log(socket.id);
    });
});
router.route('/*')
    .get(function (req, res) {

    })
    .post(function (req, res) {
        switch (req.body.action) {
            case 'sub':
                if (!subscriptions[req.params[0]] || subscriptions[req.params[0]].length <= 0) {
                    subscriptions[req.params[0]] = [];
                    subscriptions[req.params[0]].push(req.body.id);
                    client.subscribe(req.params[0]);
                } else {
                    if (subscriptions[req.params[0]].indexOf(req.body.id) === -1) {
                        subscriptions[req.params[0]].push(req.body.id);
                    }
                }

                break;
            case 'desub':
                subscriptions[req.params[0]] = subscriptions[req.params[0]].filter(function (e) {
                    return e !== req.body.id
                });

                if (subscriptions[req.params[0]].length <= 0) {
                    client.unsubscribe(req.params[0]);
                }
                break;
            case 'pub':
                client.publish(req.params[0], req.body.message);
                break;
            default:
                break;
        }
        res.send('OK');
    });

client.on('message', function (topic, message) {
    console.log(subscriptions[topic].toString());
    console.log(subscriptions[topic].length);
    subscriptions[topic].forEach(function (e) {
        console.log(e);
        io.sockets.emit(e + '/' + topic, message.toString());
    });

});

module.exports = router;

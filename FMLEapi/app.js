var express = require('express');
var app = express();
var events = require('./eventosAPI/eventos');
var mqtt = require('./mqttAPI/mqtt')
app.use('/fullcalendar', events);
app.use('/mqtt',mqtt);

app.listen(8080);
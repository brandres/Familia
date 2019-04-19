
var mgdb=require('mongodb');
var assert = require('assert');

var mongoclient = mgdb.MongoClient;

var url='mongodb://localhost:27017/familia';

mongoclient.connect(url,function (err,db) {
    console.log('conectado');
});
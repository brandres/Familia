var accesoBD = require('./conexionBD.js');


exports.insertarEvento = function (evento){
    accesoBD.getBD().collection('eventos').insertOne(evento,function(err) {
        if (err) throw err;
        console.log("1 document inserted");
        accesoBD.close();
    })
};

exports.getEventos =  function () {
    return accesoBD.getBD().collection('eventos').find().toArray();
};

exports.conectarseBD = function(){
    accesoBD.connect();
};
var accesoBD = require('./conexionBD.js');



exports.insertarEvento = function (evento){
    accesoBD.connect(function(){
        accesoBD.get().collection('evento').insertOne(evento,function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            accesoBD.close();
        })
    });
}
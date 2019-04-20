var accesoBD = require('./conexionBD.js');



exports.insertarEvento = function (evento){
    accesoBD.connect(function(){
        console.log(JSON.stringify(evento));
        accesoBD.getBD().collection('eventos').insertOne(evento,function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            accesoBD.close();
        })
    });
};

exports.getEventos = async function () {
    await accesoBD.connect();
    return await accesoBD.getBD().collection('eventos').find();
}
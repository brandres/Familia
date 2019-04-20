
const mongoClient = require( 'mongodb' ).MongoClient;

const mongoDbUrl='mongodb://fullcalendar:6121@localhost:27017/familia';
let cliente;
let bd;

function connect(callback){
    mongoClient.connect(mongoDbUrl, (err, client) => {
        console.log(err);
        cliente = client;
        bd = cliente.db('familia')
        callback();
    });
}
function getBD(){
    return bd;
}

function close(){
    cliente.close();
}
module.exports = {
    connect,
    getBD,
    close
};
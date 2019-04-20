
const mongoClient = require( 'mongodb' ).MongoClient;

const mongoDbUrl='mongodb://fullcalendar:6121@localhost:27017/familia';
let cliente;
let bd;

function connect(){
    mongoClient.connect(mongoDbUrl,  function (err, client)  {
        cliente =  client;
        bd =  cliente.db('familia');
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
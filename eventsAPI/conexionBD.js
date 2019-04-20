
const mongoClient = require( 'mongodb' ).MongoClient;

const mongoDbUrl='mongodb://localhost:27017';
let mongodb;

function connect(callback){
    mongoClient.connect(mongoDbUrl, (err, client) => {
        console.log(err);
        mongodb = client;
        callback();
    });
}
function getBD(){
    return mongodb.db('familia');
}

function close(){
    mongodb.close();
}

module.exports = {
    connect,
    getBD,
    close
};
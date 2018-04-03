const mongo = require('mongodb').MongoClient;
const client = require('socket.io').listen(4155).sockets;

// Connect to mongo
mongo.connect('mongodb://127.0.0.1/mongochat', function(err, db) {
  if (err) {
    throw err;
  }

  console.log('MongoDB connected...');
  export default db;
});

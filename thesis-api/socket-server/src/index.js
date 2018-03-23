const mongo = require('mongodb').MongoClient;
const PORT = process.env.PORT || 4000
const socket = require('socket.io').listen(PORT).sockets;
import Rooms from './rooms';
const users = {}
let currentUsersNumber = 0;
const rooms = new Rooms(socket);
mongo.connect('mongodb://127.0.0.1/barterChat', (err, db) => {
  if(err) { 
    throw err
  }
  const chat = db.collection('chat')
  console.log('mongo db connected!!! and socket server is listening on port', PORT)
  socket.on('connection', client => {
    console.log('a user is connected')
    client.emit('connected')
    client.on('new user', username => {
      if(!users[username]) {
        client.nickname = username;
        users[username] = client  //if code didnt work refactor this
        currentUsersNumber++;
        console.log ('total user connect', currentUsersNumber)
      }
    })
    client.on('disconnect', data => {
      console.log(' a user disconneted')
      if(!users[client.nickname]) return;
      delete users[client.nickname];
      currentUsersNumber--;
      console.log ('total user connect', currentUsersNumber)
    })
    client.on('joinRoom', data => {
      const room = rooms.findOrCreate(data.roomId || 'default');
      client.join(room.get('id'))
    })
    client.on('message', data => {
      chat.insert(data)
      console.log('message event triggered', data, )

      if(users[data.to]) {
        console.log('find the user trying to send him a message')
        users[data.to].emit('directMessage', data)
      }
      socket.in(data.roomId).emit('room:message', data)
    })
  })
})

// import http from 'http';
// import SocketIo from 'socket.io';
// // import { each } from 'lodash';

// // import Rooms from './rooms';
// // import clientEvents from './clientEvents';

// const server = http.createServer();
// const io = SocketIo(server);
// // // const rooms = new Rooms(io);

// io.on('connection', (client) => {
//   console.log('someone connect to socket!!!!')
//   client.on('chat',data => {
//     console.log('this is the data send  by client', data)
//     client.emit('chat', data)
//   })
//   client.on('SEND_MESSAGE', function(data){
//     io.emit('RECEIVE_MESSAGE', data);
// })
//   client.on('disconnect', function(){
//     console.log('user disconnected');
//   });
// });
// //   // const { roomId, title } = client.handshake.query;
// //   // const room = rooms.findOrCreate(roomId || 'default', title);
// //   // client.join(room.get('id'));

// //   // each(clientEvents, (handler, event) => {
// //   //   client.on(event, handler.bind(null, { io, client, room }));
// //   // });
// // // });

// const PORT = process.env.PORT || 4155;
// server.listen(PORT, () => console.log(`socket server listening on port ${PORT}`));
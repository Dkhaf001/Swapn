const mongo = require('mongodb').MongoClient;

const PORT = process.env.PORT || 4000;
const socket = require('socket.io').listen(PORT).sockets;

import Rooms from './rooms';

const users = {};

let currentUsersNumber = 0;
const rooms = new Rooms(socket);
mongo.connect('mongodb://127.0.0.1/barterChat', (err, db) => {
  if (err) {
    throw err;
  }
  const chat = db.collection('chat');
  const offers = db.collection('offers');
  console.log('mongo db connected!!! and socket server is listening on port', PORT);
  socket.on('connection', (client) => {
    console.log('a user is connected');
    client.emit('connected');
    client.on('new user', (username) => {
      if (!users[username]) {
        client.nickname = username;
        users[username] = client; // if code didnt work refactor this
        currentUsersNumber++;
        console.log('total user connect', currentUsersNumber);
      }
      chat.find({ to: username, read: 'false' }).toArray((err, result) => {
        client.emit('notifications', result);
      });
      offers.find({ buyer: username, status: 'progress' }).toArray((err, data) => {
        console.log('trying to find all accepted offers', data);
        client.emit('acceptedOffersdata', data);
      });
    });
    client.on('updateDatabase', ({ to, roomId }) => {
      console.log('receive a update database request', to, roomId);
      chat.update(
        { to, roomId, read: 'false' },
        { $set: { read: 'true' } },
        { multi: true },
        (err, updated) => {
          chat.find({ to, read: 'false' }).toArray((err, result) => {
            client.emit('notifications', result);
          });
        },
      );
    });
    client.on('showUsers', () => {
      console.log(users);
    });
    client.on('disconnect', (data) => {
      console.log(' a user disconneted');
      if (!users[client.nickname]) return;
      delete users[client.nickname];
      currentUsersNumber--;
      console.log('total user connect', currentUsersNumber);
    });
    client.on('joinRoom', (roomId) => {
      const room = rooms.findOrCreate(roomId || 'default');
      console.log('a user has join the room', room.get('id'));
      client.join(room.get('id'));
      db
        .collection('chat')
        .find({ roomId })
        .toArray((err, result) => {
          if (err) throw err;
          client.emit('history', result);
        });
    });
    client.on('message', (data) => {
      console.log('message event triggered', data);
      data.read = 'false';
      if (users[data.to]) {
        console.log('find the user trying to send him a message');
        users[data.to].emit('directMessage', data);
      } else {
      }
      chat.insert(data);
      console.log('socket try8ingto send message to every one in this room', data.roomId);
      socket.in(data.roomId).emit('room:message', data);
    });

    client.on('accept', (data) => {
      console.log('accept request received', data);
      offers.insert(data);
      if (users[data.buyer]) {
        console.log('this user is online tryingto send to him');
        users[data.buyer].emit('offerAccepted', data);
      }
    });
    client.on('fetchAllAcceptedOffers', (buyer) => {
      offers.find({ buyer, status: 'progress' }).toArray((err, data) => {
        client.emit('acceptedOffersdata', data);
      });
    });
    client.on('deleteOffers', (data) => {
      offers.deleteMany({ post_id: Number(data) }, (err, data) => {
        console.log('deleteOffers  DELETED', err, data);
      });
    });
  });
});

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

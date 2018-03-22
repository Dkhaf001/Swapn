import http from 'http';
import SocketIo from 'socket.io';
// // import { each } from 'lodash';

// // import Rooms from './rooms';
// // import clientEvents from './clientEvents';

const server = http.createServer();
const io = SocketIo(server);
// // const rooms = new Rooms(io);

io.on('connection', (client) => {
  console.log('someone connect to socket!!!!')
  client.on('chat',data => {
    console.log('this is the data send  by client', data)
    client.emit('chat', data)
  })
  client.on('SEND_MESSAGE', function(data){
    io.emit('RECEIVE_MESSAGE', data);
})
  client.on('disconnect', function(){
    console.log('user disconnected');
  });
});
//   // const { roomId, title } = client.handshake.query;
//   // const room = rooms.findOrCreate(roomId || 'default', title);
//   // client.join(room.get('id'));

//   // each(clientEvents, (handler, event) => {
//   //   client.on(event, handler.bind(null, { io, client, room }));
//   // });
// // });

const PORT = process.env.PORT || 4155;
server.listen(PORT, () => console.log(`socket server listening on port ${PORT}`));

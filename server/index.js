var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(4000);
// WARNING: app.listen(80) will NOT work here!

let roomName = 'example'
io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('hello', function (data) {
    console.log(data);
    socket.emit('Hey man');
  });

  socket.on('message', message =>
    io.in(roomName).emit('new message', message)
  );
//   socket.on('Some event')'
  socket.on('join', () => {
    io.in(roomName).emit('new join','This cool guy is here!')
    socket.join(roomName);
})
  console.log('Connection made!');
});

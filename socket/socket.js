const app = require('express')()
const server = require('http').Server(app);
const io = require('socket.io')(server);

// Socket.io
// io.on('connection', function (socket) {
//   console.log(logSymbols.success, '\x1b[32m','Client connected !');

//   socket.on('join', function (data) {
//     console.log(data);
//     socket.emit('messages', 'Hello from server');
//   });
//   socket.emit('emit to client', {
//     msg: 'Welcome to API Chronchain !'
//   });
//   socket.on('messageClientServer', function (data) {
//     console.log(data);
//   });
// });

// server.listen(4444);
module.exports = io;
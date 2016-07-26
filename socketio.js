Message = require('./models/message');

module.exports = (http) => {
  var io = require('socket.io')(http);

  io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('chat message', (msg)=>{
      
      console.log('Message: ' + msg);
      io.emit('chat message', {msg: msg, name: socket.name});
    });

    socket.on('new user', (user)=>{
      socket.name = user;
    });  
  });

  return io;
}  
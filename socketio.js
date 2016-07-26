var crypt = require('./helpers/crypt');

Message = require('./models/message');

module.exports = (http) => {
  var io = require('socket.io')(http);

  io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
      var newMsg = new Message({
        from:socket.id,
        body: msg 
      });

      newMsg.save((err)=>{
        console.log('Message: ' + msg);
        io.emit('chat message', { msg: msg, name: socket.name });
      }); 
    });

    socket.on('new user', (user, id) => {
      socket.name = crypt.decrypt(user);
      socket.id = crypt.decrypt(id);
    });
  });

  return io;
}  
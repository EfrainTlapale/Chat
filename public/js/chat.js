var socket = io();

$('#chat').submit(function(){
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
});

socket.on('chat message', function(data){
  $('#messages').append($('<li class="collection-item">').text(data.name + ' says: ' + data.msg));
});

$( document ).ready(function() {
  socket.emit('new user', $('#username').text());
});

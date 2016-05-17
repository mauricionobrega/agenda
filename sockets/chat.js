module.exports = function(io) {
  var sockets = io.sockets;

  sockets.on('connection', function(client) {
    client.on('send-server', function(data) {
      var msg = '<p><strong>'+data.nome+': </strong> '+data.msg+'</p>';
      client.emit('send-client', msg);
      client.broadcast.emit('send-client', msg);
    });
  });

};

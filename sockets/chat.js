module.exports = function(io) {
  var crypto = require('crypto'), // TODO: https://github.com/ncb000gt/node.bcrypt.js/
      sockets = io.sockets,
      onlines = {};

  sockets.on('connection', function(client) {
    var session = client.handshake.session,
        usuario = session.usuario;

    onlines[usuario.email] = usuario.email;

    for (var email in onlines) {
      client.emit('notify-onlines', email);
      client.broadcast.emit('notify-onlines', email);
    }

    client.on('send-server', function(msg) {
      var sala = session.sala,
          data = {
            'email': usuario.email,
            'sala': sala
          },
          formattedMsg = '<p><strong>'+usuario.nome+': </strong> '+msg+'</p>';

      client.broadcast.emit('new-message', data);
      sockets.in(sala).emit('send-client', formattedMsg);
    });

    client.on('join', function(sala) {
      if(!sala) {
        var timestamp = new Date().toString(),
            md5 = crypto.createHash('md5');
        sala = md5.update(timestamp).digest('hex');
      }
      session.sala = sala;
      client.join(sala);
    });

    client.on('disconnect', function() {
      var sala = session.sala,
          formattedMsg = '<p><strong>'+usuario.nome+': '+'</strong> saiu</p>';

      client.broadcast.emit('notify-offlines', usuario.email);
      sockets.in(sala).emit('send-client', formattedMsg);
      delete onlines[usuario.email];
      client.leave(session.sala);
    });

  });

};

module.exports = function(io) {
  var crypto = require('crypto'), // TODO: https://github.com/ncb000gt/node.bcrypt.js/
      redis = require('redis').createClient(), // parameters: createClient(port, ip)
      sockets = io.sockets;

  sockets.on('connection', function(client) {
    var session = client.handshake.session,
        usuario = session.usuario;

    redis.sadd('onlines', usuario.email, function(erro) {
      redis.smembers('onlines', function(erro, emails) {
        emails.forEach(function(email) {
          client.emit('notify-onlines', email);
          client.broadcast.emit('notify-onlines', email);
        })
      });
    });

    client.on('send-server', function(msg) {
      var sala = session.sala,
          data = {
            'email': usuario.email,
            'sala': sala
          },
          formattedMsg = '<p><strong>'+usuario.nome+': </strong> '+msg+'</p>';

      redis.lpush(sala, formattedMsg);
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

      var msg = '<p><strong>'+usuario.nome+':</strong> entrou.</p>';
      redis.lpush(sala, msg, function(erro, res) {
        redis.lrange(sala, 0, -1, function(erro, msgs) {
          msgs.forEach(function(msg) {
            sockets.in(sala).emit('send-client', msg);
          });
        });
      });
    });

    client.on('disconnect', function() {
      var sala = session.sala,
          formattedMsg = '<p><strong>'+usuario.nome+': '+'</strong> saiu</p>';

      redis.lpush(sala, formattedMsg);
      client.broadcast.emit('notify-offlines', usuario.email);
      sockets.in(sala).emit('send-client', formattedMsg);
      redis.srem(usuario.email);
      client.leave(session.sala);
    });

  });

};

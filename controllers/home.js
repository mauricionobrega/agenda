module.exports = function(app) {
  return {
    index: function(request, response) {
      response.render('home/index');
    },
    login: function(request, response) {
      var email = request.body.usuario.email,
          nome = request.body.usuario.nome,
          query = {email: email};

      if (email && nome) {
        var usuario = request.body.usuario;
        usuario['contatos'] = [];
        request.session.usuario = usuario;
        response.redirect('/contatos');
      } else {
        response.redirect('/');
      }

/*
      Usuario.findOne(query)
             .select('nome email')
             .exec(function(erro, usuario){
        if (usuario) {
          request.session.usuario = usuario;
          response.redirect('/contatos');

        } else {
          Usuario.create(request.body.usuario, function(erro, usuario) {
            if(erro){
              response.redirect('/');
            }else{
              request.session.usuario = usuario;
              response.redirect('/contatos');
            }
          });
        }
      });
*/

    },
    logout: function(request, response) {
      request.session.destroy();
      // respose.redirect('/');
      response.render('home/index');
    }
  };
};

/*
exports.index = function(request, response, next) {
  response.send('Hello world!');
};
*/

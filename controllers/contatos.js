module.exports = function(app) {
  var Usuario = app.models.usuario;
  return {
    index: function(request, response) {
      var _id = request.session.usuario._id;
      Usuario.findById(_id, function(erro, usuario) {
        var contatos = usuario.contatos,
            resultado = {
              'contatos': contatos
            };
        response.render('contatos/index', resultado);
      });
    },
    show: function(request, response) {
      var id = request.params.id,
          contato = request.session.usuario.contatos[id],
          params = {
            contato: contato,
            id: id
          };
      response.render('contatos/show', params);
    },
    create: function(request, response) {
      var _id = request.session.usuario._id;
      Usuario.findById(_id, function(erro, usuario) {
        var contato = request.body.contato,
            contatos = usuario.contatos;
        contatos.push(contato);
        usuario.save(function() {
          response.redirect('/contatos');
        });
      });
    },
    edit: function(request, response) {
      var id = request.params.id,
          usuario = request.session.usuario,
          contato = usuario.contatos[id],
          params = {
            usuario: usuario,
            contato: contato,
            id: id
          };
      response.render('contatos/edit', params);
    },
    update: function(request, response) {
      var contato = request.body.contato,
          usuario = request.session.usuario;

      usuario.contatos[request.params.id] = contato;
      response.redirect('/contatos');
    },
    destroy: function(request, response) {
      var usuario = request.session.usuario,
          id = request.params.id;

      usuario.contatos.splice(id, 1);
      response.redirect('/contatos');
    }
  };
};

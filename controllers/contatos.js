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
      var _id = request.session.usuario._id;
      Usuario.findById(_id, function(erro, usuario) {
        var contatoId = request.params.id,
            contato = usuario.contatos.id(contatoId),
            resultado = {
              'contato': contato
            };
        response.render('contatos/show', resultado);
      });
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
      var _id = request.session.usuario._id;
      Usuario.findById(_id, function(erro, usuario) {
        var contatoId = request.params.id,
            contato = usuario.contatos.id(contatoId),
            resultado = {
              'contato': contato
            };
        response.render('contatos/edit', resultado);
      });
    },
    update: function(request, response) {
      var _id = request.session.usuario._id;
      Usuario.findById(_id, function(erro, usuario) {
        var contatoId = request.params.id,
            contato = usuario.contatos.id(contatoId);

        contato.nome = request.body.contato.nome;
        contato.email = request.body.contato.email;
        usuario.save(function() {
          response.redirect('/contatos');
        });
      });
    },
    destroy: function(request, response) {
      var _id = request.session.usuario._id;
      Usuario.findById(_id, function(erro, usuario) {
        var contatoId = request.params.id;
        usuario.contatos.id(contatoId).remove();
        usuario.save(function() {
          response.redirect('/contatos');
        });
      });
    }
  };
};

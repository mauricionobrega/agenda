module.exports = function(app) {
  var contatos = app.controllers.contatos,
      autenticar = app.middlewares.autenticator.verify;

  app.get('/contatos', autenticar, contatos.index);
  app.get('/contato/:id', autenticar, contatos.show);
  app.post('/contato', autenticar, contatos.create);
  app.get('/contato/:id/editar', autenticar, contatos.edit);
  app.put('/contato/:id', autenticar, contatos.update);
  app.delete('/contato/:id', autenticar, contatos.destroy);

};

module.exports = function(app) {
  var chat = app.controllers.chat,
      autenticar = app.middlewares.autenticator.verify;

  app.get('/chat', autenticar, chat.index);

};

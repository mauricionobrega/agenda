module.exports = function(app) {
  return {
    index: function(request, response) {
      var params = {
            usuario: request.session.usuario
          };

      response.render('chat/index', params);
    }
  }
};

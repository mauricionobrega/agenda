module.exports = function(app) {
  return {
    verify: function(request, response, next) {
      if(!request.session.usuario) {
        return response.redirect('/');
      }
      return next();
    }
  }
}

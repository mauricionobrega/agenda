module.exports = function(app) {
  return {
    index: function(request, response) {
      var params = {
        'sala': request.query.sala
      };

      response.render('chat/index', params);
    }
  }
};

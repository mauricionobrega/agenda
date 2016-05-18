module.exports = function(app) {
  return {
    index: function(request, response) {
      var params = {
        'sala': request.query.sala
      };

      console.log(params);

      response.render('chat/index', params);
    }
  }
};

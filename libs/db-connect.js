module.exports = function() {
  var mongoose = require('mongoose'),
      envUrl = {
        'test': 'mongodb://localhost:27017/ntalk_test',
        'development': 'mongodb://localhost:27017/ntalk'
      },
      url = envUrl[process.env.NODE_ENV || 'development'];
  return mongoose.connect(url);
};

module.exports = function() {
  var mongoose = require('mongoose'),
      cfg = require('../config.json'),
      env = process.env.NODE_ENV || 'development',
      url = cfg.MONGODB[env];

  return mongoose.connect(url);
};

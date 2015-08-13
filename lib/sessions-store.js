var moment = require('moment');
var config = require('./config');

module.exports.findAll = function() {
  return config.data.exercises;
};

module.exports.add = function(result) {
  var now = moment();

  config.data.results[now.toString()] = result;
  config.save();
};

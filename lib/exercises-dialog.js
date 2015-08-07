var inquirer = require('inquirer-bluebird');
var moment = require('moment');

var config = require('./config');
config.data.exercises = config.data.exercises || [];
config.data.results = config.data.results || {};

var scheduler = require('./../scheduler');

module.exports = function() {
  var answers = config.data.exercises.map(function(exercise) {
    return {
      type: 'input',
      message: exercise,
      name: exercise
    };
  });

  return inquirer.prompt(answers).then(function(result) {
    var now = moment();

    config.data.results[now.toString()] = result;
    config.save();

    sceduler.reload();
  });
};

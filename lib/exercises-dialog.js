var inquirer = require('inquirer-bluebird');
var moment = require('moment');

var config = require('./config');
var scheduler = require('./../scheduler');

var exercisesPrompt = function() {
  var answers = config.data.exercises.map(function(exercise) {
    return {
      type: 'input',
      message: exercise,
      name: exercise
    };
  });

  return inquirer.prompt(answers);
};

module.exports = function() {
  return inquirer.prompt({
    type: 'input',
    message: 'Are you ready? (yes or your excuse)',
    name: 'action'
  }).then(function(result) {
    if (result.action === 'yes') {
      return exercisesPrompt();
    } else {
      return {
        excuse: result.action
      };
    }
  }).then(function(result) {
    var now = moment();

    config.data.results[now.toString()] = result;
    config.save();

    scheduler.reload();
  });
};

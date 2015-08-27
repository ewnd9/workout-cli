var inquirer = require('inquirer-bluebird');
var moment = require('moment');

var sessionsStore = require('./sessions-store');
var scheduler = require('./../scheduler');

var exercisesPrompt = function() {
  var answers = sessionsStore.findAll().map(function(exercise) {
    return {
      type: 'input',
      message: exercise,
      name: exercise
    };
  });

  return inquirer.prompt(answers);
};

var readyPrompt = function() {
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
  });
};

module.exports.session = function() {
  return exercisesPrompt().then(function(result) {
    sessionsStore.add(result);
  });
};

var Promise = require('bluebird');

module.exports.excuse = function(excuse) {
  var data = {
    excuse: excuse
  };

  sessionsStore.add(data);
  return Promise.resolve(true);
};

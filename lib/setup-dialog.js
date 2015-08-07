var inquirer = require('inquirer-bluebird');

var pm2 = require('./pm2-utils');

var config = require('./config');

config.data.period = config.data.period || 30;
config.data.exercises = config.data.exercises || [];

module.exports = function() {
  var periodPrompt = function() {
    return inquirer.prompt({
      type: 'input',
      message: 'Select Time Period',
      name: 'period',
      default: config.data.period
    }).then(function(result) {
      config.data.period = parseInt(result.period);
      config.save();

      pm2.restart();

      return true;
    });
  };

  var exercisePrompt = function() {
    return inquirer.prompt({
      type: 'input',
      message: 'New Exercise',
      name: 'exercise',
    }).then(function(result) {
      config.data.exercises.push(result.exercise);
      config.save();

      return true;
    });
  };

  var menuPrompt = function() {
    return inquirer.prompt({
      type: 'list',
      message: 'Select Action',
      name: 'action',
      choices: [
        'Change period (' + config.data.period + ')',
        'Add exercises (' + config.data.exercises.join(', ') + ')',
        'Exit'
      ]
    }).then(function(result) {
      if (result.action.indexOf('Change period') > -1) {
        return periodPrompt();
      } else if (result.action.indexOf('Add exercises') > -1) {
        return exercisePrompt().then(menuPrompt);
      } else {
        process.exit(0);
      }
    });
  };

  return menuPrompt();
};

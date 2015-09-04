var inquirer = require('inquirer-question');
var menu = require('inquirer-menu');

var config = require('./../config');

config.data.period = config.data.period || 30;
config.data.exercises = config.data.exercises || [];

module.exports = function() {

  var periodPrompt = function() {
    return inquirer.prompt({
      type: 'input',
      message: 'New Interval',
      name: 'period',
      default: config.data.period
    }).then(function(result) {
      config.data.period = parseInt(result.period);
      config.save();

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

  var createMenu = function() {
    var setupMenu = {
      message: 'setup',
      choices: {}
    };

    console.log('hi');

    setupMenu.choices['Change interval (' + config.data.period + ')'] = function() {
      return periodPrompt();
    };

    setupMenu.choices['Add exercises (' + config.data.exercises.join(', ') + ')'] = function() {
      return periodPrompt();
    };

    return setupMenu;
  };

  return menu(createMenu);

};

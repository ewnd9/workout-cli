var inquirer = require('inquirer-question');
var menu = require('inquirer-menu');

var moment = require('moment');

var config = require('./../config');

var sessionsStore = require('./../sessions-store');
var scheduler = require('./../../scheduler');
var lock = require('./../lock');

module.exports = function() {
  var data = {};
  var now = moment();

  var createMenu = function() {
    var setupMenu = {
      message: 'exercise',
      choices: {}
    };

    sessionsStore.findAll().forEach(function(exercise) {

      setupMenu.choices[exercise + (data[exercise] ? ' (' + data[exercise] + ')' : '')] = function() {
        return inquirer.prompt({
          type: 'input',
          message: exercise,
          name: exercise
        }).then(function(_data) {
          var key = Object.keys(_data)[0];
          data[key] = _data[key];

          sessionsStore.add(data, now);
          scheduler.reload();
        });
      };

    });

    return setupMenu;
  };

  return menu(createMenu);
};

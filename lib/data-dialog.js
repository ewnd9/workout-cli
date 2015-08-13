var sessionsStore = require('./sessions-store');
var inquirer = require('inquirer-bluebird');

var q1 = {
  type: 'input',
  name: 'name',
  message: 'Data name'
};

var q2 = {
  type: 'input',
  name: 'value',
  message: 'Data value'
};

module.exports = function() {
  return inquirer.prompt([q1, q2]).then(function(result) {
    var session = {};
    session[result.name] = result.value;

    sessionsStore.add(session);
  });
};

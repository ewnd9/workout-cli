#!/usr/bin/env node

'use strict';

var meow = require('meow');
var pm2 = require('./lib/pm2-utils');

var cli = meow({
  help: [
    'Usage',
    '  workout --start',
    '  workout --stop',
    '  workout --restart',
    '  workout --status'
  ]
});

var lock = require('./lib/lock');
var notify = require('./lib/notify');
var config = require('./lib/config');
var scheduler = require('./scheduler');

var showStatus = function() {
  var period = config.data.period;
  var last = scheduler.last();

  console.log((period - last) + ' minutes left');
};

if (cli.flags.start) {
  pm2.start();
} else if (cli.flags.stop) {
  pm2.stop();
} else if (cli.flags.restart) {
  pm2.restart();
} else if (cli.flags.status) {
  showStatus();
} else if (cli.flags.setup) {
  require('./lib/setup-dialog')();
} else if (cli.flags.debug) {
  showStatus();
  console.log('lock=' + lock.isLocked());
} else if (lock.isLocked()) {
  require('./lib/exercises-dialog')().then(function() {
    lock.setLock(false);
  });
} else {
  cli.showHelp();
}

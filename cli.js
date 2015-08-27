#!/usr/bin/env node

'use strict';

var meow = require('meow');
var config = require('./lib/config');

var cli = meow({
  help: [
    'Usage',
    '',
    '  workout --setup',
    '',
    '  # app lifecycle',
    '  workout --start',
    '  workout --stop',
    '  workout --restart',
    '  workout --status',
    '',
    '  # start completing scheduled session',
    '  workout --session',
    '',
    '  # skip scheduled session with given excuse',
    '  workout --excuse <excuse>',
    '',
    'Data',
    '  ' + config.path
  ]
});

var pm2 = require('./lib/pm2-utils');
var lock = require('./lib/lock');
var notify = require('./lib/notify');
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
} else if (cli.flags.data) {
  require('./lib/data-dialog')();
} else if (cli.flags.session) {
  require('./lib/exercises-dialog').session().then(function() {
    lock.setLock(false);
    scheduler.reload();
  });
} else if (cli.flags.excuse) {
  require('./lib/exercises-dialog').excuse(cli.flags.excuse).then(function() {
    lock.setLock(false);
    scheduler.reload();
  });
} else if (cli.flags.setup) {
  require('./lib/setup-dialog')();
} else if (cli.flags.debug) {
  showStatus();
  console.log('lock=' + lock.isLocked());
} else {
  cli.showHelp();
}

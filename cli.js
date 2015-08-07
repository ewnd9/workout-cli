#!/usr/bin/env node

'use strict';

var meow = require('meow');
var pm2 = require('./lib/pm2-utils');

var cli = meow({
  help: [
    'Usage',
    '  workout start',
    '  workout stop',
  ]
});

var lock = require('./lib/lock');
var notify = require('./lib/notify');
var config = require('./lib/config');

if (cli.flags.start) {
  pm2.start();
} else if (cli.flags.stop) {
  pm2.stop();
} else if (cli.flags.restart) {
  pm2.restart();
} else if (cli.flags.last) {
  var period = config.data.period;
  var last = require('./scheduler').last();
  console.log((period - last) + ' minutes left');
} else if (cli.flags.setup) {
  require('./lib/setup-dialog')();
} else if (lock.isLocked()) {
  lock.setLock(false);
  notify('end annoying');

  require('./lib/exercises-dialog')();
} else {
  cli.showHelp();
}

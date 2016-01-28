#!/usr/bin/env node

'use strict';

const meow = require('meow');
const config = require('./config');
const constants = require('./constants');

const cli = meow({
  help: [
    'Usage',
    '',
    '  workout --setup',
    '',
    '  # app lifecycle',
    '  workout --start',
    '  workout --restart',
    '  workout --status',
    '',
    '  # start completing scheduled session',
    '  workout --session',
    '',
    'Data',
    '  ' + config.path
  ]
});

const sendMessage = event => {
  require('./client')(event)
    .then(data => console.log(data))
    .catch(err => console.log(err));
};


if (cli.flags.start) {
  require('./server');
} else if (cli.flags.status) {
  sendMessage(constants.STATUS_REQUEST);
} else if (cli.flags.data) {
  require('./lib/data-dialog')();
} else if (cli.flags.session) {
  require('./tui/exercises-menu')()
    .then(() => sendMessage());
} else if (cli.flags.excuse) {
  require('./lib/exercises-dialog').excuse(cli.flags.excuse).then(function() {
    lock.setLock(false);
    scheduler.reload();
  });
} else if (cli.flags.setup) {
  require('./tui/setup-menu')();
} else {
  cli.showHelp();
}

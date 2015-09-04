var moment = require('moment');

var dateMessage = function(prefix) {
  return prefix + ' ::: ' + moment().toString();
};

var lock = require('./lib/lock');
lock.setLock(false);

var notify = require('./lib/notify');
var config = require('./lib/config');

var sessionInProgress = false;

var sessionLoop = function() {
  if (lock.isLocked()) {
    console.log('notify');
    notify('workout');
    setTimeout(sessionLoop, 2000);
  } else {
    // sessionInProgress = false;
    console.log(dateMessage('stop session'));
  }
};

var main = function() {
  console.log(dateMessage('running (sessionInProgress=' + sessionInProgress + ', lock=' + lock.isLocked() + ')'));

  // if (!sessionInProgress) {
    // sessionInProgress = true;

    lock.setLock(true);
    sessionLoop();
  // }
};

var period = config.data.period || 30;

notify('started every ' + period + ' minutes');
require('./scheduler').start(period, main);

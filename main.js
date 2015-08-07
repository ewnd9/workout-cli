var moment = require('moment');

var dateMessage = function(prefix) {
  return prefix + ':::' + moment().toString();
};

var lock = require('./lib/lock');
var notify = require('./lib/notify');
var config = require('./lib/config');

var annoyingProgress = false;

var startAnnoying = function() {
  if (lock.isLocked()) {
    annoyingProgress = true;

    notify('annoying');
    setTimeout(startAnnoying, 3000);
  } else {
    annoyingProgress = false;

    console.log(dateMessage('startAnnoying !lock.isLocked()'));
  }
};

var main = function() {
  if (!annoyingProgress) {
    lock.setLock(true);
    startAnnoying();
  }

  console.log(dateMessage('hi ' + annoyingProgress));
};

var period = config.data.period || 30;

notify('started every ' + period + ' minutes');
require('./scheduler').start(period, main);

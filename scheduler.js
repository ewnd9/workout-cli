var fs = require('fs');
var moment = require('moment');

var config = require('dot-file-config')('.workout-cli-scheduler-npm', {
  cloudSync: false
});

var renewConfig = function() {
  config.reload();

  config.data.lastTick = config.data.lastTick ? moment(config.data.lastTick) : moment();
  config.data.lastMain = config.data.lastMain ? moment(config.data.lastMain) : moment();
};

renewConfig();

var minsDiff = function(t2) {
  return moment().diff(t2, 'minutes');
};

var reload = module.exports.reload = function() {
  config.data.lastMain = moment();
  config.save();
};

var isAfterSleep = function() {
  var shouldReset = minsDiff(config.data.lastTick) > 2;

  config.data.lastTick = moment();

  if (shouldReset) {
    var lock = require('./lib/lock');
    lock.setLock(false);
    console.log('reset aftersleep', moment().format('hh:mm'));

    config.data.lastMain = moment();
  }

  config.save();

  return shouldReset;
};

var job = function(delay, main) {
  renewConfig();

  var cond = isAfterSleep();
  var diff = minsDiff(config.data.lastMain);

  console.log(cond, diff, delay, config.data.lastMain.format('hh:mm'));

  if (!cond && diff >= delay) {
    main();

    config.data.lastMain = moment();
    config.save();
  }
};

var schedule = function(delay, main) {
  setTimeout(function() {
    job(delay, main);
    schedule(delay, main);
  }, 1000 * 60);
};

module.exports.start = function(delay, main) {
  job(delay, main);
  schedule(delay, main);
};

module.exports.last = function() {
  return minsDiff(config.data.lastMain);
};

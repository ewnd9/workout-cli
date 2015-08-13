var fs = require('fs');
var moment = require('moment');

var config = require('dot-file-config')('.workout-cli-scheduler-npm', {
  cloudSync: false
});

config.data.lastTick = config.data.lastTick ? moment(config.data.lastTick) : moment();
config.data.lastMain = config.data.lastMain ? moment(config.data.lastMain) : moment();

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
    console.log('shouldReset', moment());
    config.data.lastMain = moment();
  }

  config.save();

  return shouldReset;
};

var job = function(delay, main) {
  var cond = isAfterSleep();
  var diff = minsDiff(config.data.lastMain);

  if (!cond && (diff >= delay || (delay - diff) < 0)) {
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

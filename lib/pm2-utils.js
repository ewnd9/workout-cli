var pm2 = require('pm2');
var path = require('path');

var lock = require('./lock');
var start = function(cb) {
  pm2.start({
    name: 'workout-cli',
    script: path.resolve(__dirname + '/../main.js')
  }, cb);
};

module.exports.start = function() {
  pm2.connect(function() {
    start(function() {
      console.log('started');
      process.exit(0);
    });
  });
};

module.exports.stop = function() {
  pm2.connect(function() {
    pm2.stop('workout-cli', function() {
      console.log('stopped');
      process.exit(0);
    });
  });
};

module.exports.restart = function() {
  pm2.connect(function() {
    pm2.delete('workout-cli', function() {
      start(function() {
        lock.setLock(false);

        console.log('restarted');
        process.exit(0);
      });
    });
  });
};

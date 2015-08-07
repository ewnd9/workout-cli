var pm2 = require('pm2');

module.exports.start = function() {
  pm2.connect(function() {
    pm2.start({
      'name': 'workout-cli',
      'script': 'main.js'
    }, function() {
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
      console.log('deleted');

      pm2.start({
        'name': 'workout-cli',
        'script': 'main.js'
      }, function() {
        console.log('started');
        process.exit(0);
      });
    });
  });
};

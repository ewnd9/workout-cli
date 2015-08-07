var notifier = require('node-notifier');

module.exports = function(message) {
  notifier.notify({
    'title': 'workout-cli',
    'message': message
  });
};

var notifier = require('node-notifier');

module.exports = function(message) {
  notifier.notify({
    'title': 'workout-cli',
    'message': message
  }, function(error, response) {
		// console.log('notifier-error', error);
		// console.log('notifier-response', response);
	});
};

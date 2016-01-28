const notifier = require('node-notifier');

module.exports = (message, onClick) => {
  const n = notifier.notify({
    title: 'workout-cli',
    message: message,
    wait: true
  }, function(error, response) {
    // open
  });
  n.on('click', () => console.log('clicked'));
};

var getConfig = function() {
  return require('dot-file-config')('.workout-cli-lock-npm', {
    cloudSync: false
  });
};

module.exports.isLocked = function() {
  var config = getConfig();
  var result = config.data.isLocked === true;
  config.close(); // cache config was a mistake

  return result;
};

module.exports.setLock = function(status) {
  var config = getConfig();
  config.data.isLocked = status;
  config.save();
  config.close(); // cache config was a mistake
};

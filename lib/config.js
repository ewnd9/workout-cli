const config = require('dot-file-config')('.workout-cli-npm');

config.data.exercises = config.data.exercises || [];
config.data.results = config.data.results || {};
config.data.interval = config.data.interval || 25;

module.exports = config;

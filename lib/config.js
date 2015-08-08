var config = require('dot-file-config')('.workout-cli-npm');

config.data.exercises = config.data.exercises || [];
config.data.results = config.data.results || {};

module.exports = config;

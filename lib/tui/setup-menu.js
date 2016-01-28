const inquirer = require('inquirer-question');
const menu = require('inquirer-menu');

const config = require('./../config');

module.exports = () => {
  const periodPrompt = () => inquirer
		.prompt({
      type: 'input',
      message: 'New Interval',
      name: 'period',
      default: config.data.period
    })
		.then((result) => {
      config.data.period = parseInt(result.period);
      config.save();
    });

	const exercisesPrompt = () => inquirer
		.prompt({
      type: 'input',
      message: 'New Exercise',
      name: 'exercise',
    })
		.then((result) => {
      config.data.exercises.push(result.exercise);
      config.save();
    });

  return menu(() => ({
		message: 'setup',
		choices: {
			[`Change interval (${config.data.period})`]: periodPrompt,
			[`Add exercise (${config.data.exercises.join(', ')})`]: exercisesPrompt
		}
	}));
};

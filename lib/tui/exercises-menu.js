const inquirer = require('inquirer-question');
const menu = require('inquirer-menu');
const config = require('./../config');

module.exports = () => {
  const data = {};
	const now = new Date().toISOString();

  const saveData = result => {
    const key = Object.keys(result)[0];
    data[key] = result[key];

		config.data.results[now] = data;
		config.save();
  };

  const createMenu = () => {
		const menu = {
	    message: 'exercise',
	    choices: config.data.exercises.reduce((result, exercise) => {
				const exerciseLabel = exercise + (data[exercise] ? ' (' + data[exercise] + ')' : '');

				result[exerciseLabel] = () => inquirer
					.prompt({
		        type: 'input',
		        message: exercise,
		        name: exercise
		      })
					.then(saveData);

				return result;
			}, {})
		};

		menu.choices.other = () => inquirer
			.prompt([{
	      type: 'input',
	      message: 'name',
	      name: 'name'
	    }, {
	      type: 'input',
	      message: 'value',
	      name: 'value'
	    }])
			.then(result => {saveData({ [result.name]: result.value }) });

		return menu;
  };

  return menu(createMenu);
};

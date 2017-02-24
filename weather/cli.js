#!/usr/bin/env node
'use strict';

const meow = require('meow');         // Call of the necessaries librairies
const chalk = require('chalk');
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');
const weather = require('./');

const cli = meow({
	help: [
		'Usage',
		'  $ weather <input>',
		'',
		'Options',
		'  city [Default: Dhaka]',
		'  country [Default: Bangladesh]',
		'  scale (C/F) [Default: Celcius]',
		'',
		'Examples',
		'  $ weather London UK C',
		'  London, UK',
		'  Condition: Partly Cloudy',
		'  Temperature: 32C'
	]
});

function _toCelcius(temp) {   // translate the temperature tu celcius
	return Math.round(((temp - 32) * 5) / 9);
}

updateNotifier({ pkg}).notify();

weather(cli.input, (err, result) => {  //error management
	if (err) {
		console.log(chalk.bold.red(err));
		process.exit(1);
	}

	let condition = result.query.results.channel.item.condition.text;
	let temperature;

	if (cli.input[2] && cli.input[2] === 'C') {
		temperature = _toCelcius(result.query.results.channel.item.condition.temp) + 'C';
	} else if (cli.input[2] && cli.input[2] === 'F') {
		temperature = result.query.results.channel.item.condition.temp + 'F';
	} else {
		temperature = _toCelcius(result.query.results.channel.item.condition.temp) + 'C';
	}    //Takes the arguments and sends the request

	let city = cli.input[0] ? cli.input[0] : 'Dhaka';        //Default values
	let country = cli.input[1] ? cli.input[1] : 'Bangladesh';

	console.log(chalk.red(city + ', ' + country));                    //Print the informations in the console
	console.log(chalk.cyan('Condition: ' + chalk.yellow(condition)));
	console.log(chalk.cyan('Temperature: ' + chalk.yellow(temperature)));
	process.exit(); // exit the program
});

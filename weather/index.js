'use strict'; //Choose a restrictive variant of JavaScript

const YQL = require('yql');  // Call the requierements
const _ = require('lodash');

module.exports = (opts, callback) => {
	opts = opts || []; //Creat an array with options

	let query;

	if (_.isEmpty(opts)) { //database management
		query = new YQL('select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="Dhaka, Bangladesh")');
	} else {
		query = new YQL('select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + opts[0] + ', ' + opts[1] + '")');
	}

	query.exec((err, response) => { //error management
		if (err) {
			return callback(err);
		}

		callback(null, response);
	});
};

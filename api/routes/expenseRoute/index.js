"use strict";

const expenses = require( "./expenses" );

module.exports.register = async server => {
	await expenses.register( server );
};

"use strict";

const utils = require( "../utils" );

const register = async ( { sql, getConnection } ) => {
	const sqlQueries = await utils.loadSqlQueries( "expenses" );
	
	const getExpenses = async userId => {
		const cnx = await getConnection();
		const request = await cnx.request();
		request.input( "userId", sql.VarChar( 50 ), userId );
		return await request.query( sqlQueries.getExpenses );
	};
	
	return {
		getExpenses
	};
};

module.exports = { register };


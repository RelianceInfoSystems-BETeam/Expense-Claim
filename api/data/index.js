"use strict";

const expenses = require( "./expenses" );
const sql = require( "mssql" );

const client = async ( server, config ) => {
	let pool = null;

	const closePool = async () => {
		try {
			await pool.close();
			pool = null;
		} catch ( err ) {
			pool = null;
			server.log( [ "error", "data" ], "closePool error" );
           server.log( [ "error", "data" ], err );
		}
	};

	const getConnection = async () => {
		try {
			if ( pool ) {
				return pool;
			} 
			pool = await sql.connect( config );
			pool.on( "error", async err => {
				server.log( [ "error", "data" ], "connection pool error" );
               server.log( [ "error", "data" ], err );
				await closePool();
			} );
			return pool;
		} catch( err ) {
			server.log( [ "error", "data" ], "error connecting to sql server" );
           server.log( [ "error", "data" ], err );
			pool=null;
		}
	};

	return {
		expenses: await expenses.register( { sql, getConnection } )
	};
};

module.exports = client;

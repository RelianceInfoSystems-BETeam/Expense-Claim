"use strict";

//const boom = require( "boom" );

module.exports.register = async server => {
	server.route( {
		method: "GET",
		path: "/expenseRoute/expenses",
		/*options: {
			auth: { mode: "try" }
		},*/
		handler: async request => {
			try {
				/*if ( !request.auth.isAuthenticated ) {
					return boom.unauthorized();
				}*/
				const db = request.server.plugins.sql.client;

				const userId = "user123"; //request.auth.credentials.profile.id;
				const res = await db.expenses.getExpenses( userId );

				return res.recordset;
			} catch( err ) {
				console.log( err );
			}
		}
	} );
/*
	server.route( {
		method: "POST",
		path: "/expenseRoute/expenses",
		options: {
			auth: { mode: "try" }
		},
		handler: async request => {
			try {
				if ( !request.auth.isAuthenticated ) {
					return boom.unauthorized();
				}
				const db = request.server.plugins.sql.client;
				const userId = request.auth.credentials.profile.id;
				const { startDate, startTime, endDate, endTime, title, description } = request.payload;
				const res = await db.expenses.addExpense( { userId, startDate, startTime, endDate, endTime, title, description } );
				return res.recordset[ 0 ];
			} catch ( err ) {
				console.log( err );
				return boom.boomify( err );
			}
		}
	} );

	server.route( {
		method: "DELETE",
		path: "/expenseRoute/expenses/{id}",
		options: {
			auth: { mode: "try" }
		},
		handler: async ( request, h ) => {
			try {
				if ( !request.auth.isAuthenticated ) {
					return boom.unauthorized();
				}   
				const id = request.params.id;
				const userId = request.auth.credentials.profile.id;
				const db = request.server.plugins.sql.client;
				const res = await db.expenses.deleteExpense( { id, userId } );
                    
				return res.rowsAffected[ 0 ] === 1 ? h.response().code( 204 ) : boom.notFound();
			} catch ( err ) {
				console.log( err );
				return boom.boomify( err );
			}
		}
	} );
*/
};

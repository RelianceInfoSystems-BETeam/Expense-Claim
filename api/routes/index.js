"use strict";

const expenseRoute = require( "./expenseRoute" );

module.exports.register = async server => {

	await expenseRoute.register( server );

   server.route( {
       method: "GET",
       path: "/",
       handler: async ( request, h ) => {
           return "My first hapi server!";
       }
   } );
};

/*
const routes = require('express').Router();
const controller = require('./controller/expenseController');

routes.route('/api/categories')
    .post(controller.create_Categories)
    .get(controller.get_Categories)

routes.route('/api/transaction')
    .post(controller.create_Transaction)
    .get(controller.get_Transaction)
    .delete(controller.delete_Transaction)

routes.route('/api/labels')
    .get(controller.get_Labels)

module.exports = routes;
*/
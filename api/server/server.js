"use strict";

const Hapi = require( "hapi" );
const plugins = require( "../plugins" );
const routes = require( "../routes" );

const app = async config => {
   const { host, port } = config;

   // create an instance of hapi
   const server = Hapi.server( { host, port } );
   server.app.config = config;

   // store the config for later use
   server.app.config = config;

   // register routes
   await plugins.register( server );
   await routes.register( server );

   return server;
};

module.exports = app;
/*
const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config({ path : "./config.env"});
const port = process.env.SQL__PORT || 5000;

// use middleware
app.use(cors());
app.use(express.json());

// mongodb connection
const con = require('./connection');

// using routes
app.use(require('./routes/expenseRoute'));

con.then(db => {
    if(!db) return process.exit(1);

    // listen to the http server 
    app.listen(port, () => {
        console.log(`Server is running on port: http://localhost:${port}`)
    })

    app.on('error', err => console.log(`Failed To Connect with HTTP Server : ${err}`));
    // error in mondb connection
}).catch(error => {
    console.log(`Connection Failed...! ${error}`);
});
*/
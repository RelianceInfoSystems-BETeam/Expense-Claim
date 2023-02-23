const config = {
  sqlEndpoint: (process.env["local_env"]) ? process.env.SQL__ENDPOINT : process.env.SQL_ENDPOINT,
 	sqlUsername: (process.env["local_env"]) ? process.env.SQL__USER_NAME : process.env.SQL_USER_NAME,
 	sqlPassword: (process.env["local_env"]) ? process.env.SQL__PASSWORD : process.env.SQL_PASSWORD,
	sqlDatabaseName: (process.env["local_env"]) ? process.env.SQL__DATABASE_NAME : process.env.SQL_DATABASE_NAME,
};

module.exports = config;

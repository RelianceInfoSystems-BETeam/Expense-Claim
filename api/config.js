const config = {
    authorityHost: process.env.M365_AUTHORITY_HOST,
    tenantId: process.env.M365_TENANT_ID,
    clientId: process.env.M365_CLIENT_ID,
    clientSecret: process.env.M365_CLIENT_SECRET,
    sqlEndpoint: (process.env["local_env"]) ? process.env.SQL__ENDPOINT : process.env.SQL_ENDPOINT,
 	  sqlUsername: (process.env["local_env"]) ? process.env.SQL__USER_NAME : process.env.SQL_USER_NAME,
 	  sqlPassword: (process.env["local_env"]) ? process.env.SQL__PASSWORD : process.env.SQL_PASSWORD,
	  sqlDatabaseName: (process.env["local_env"]) ? process.env.SQL__DATABASE_NAME : process.env.SQL_DATABASE_NAME,
    identityID: process.env.IDENTITY_ID
  };
  
  module.exports = config;
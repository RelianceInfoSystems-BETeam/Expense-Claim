/* This code sample provides a starter kit to implement server side logic for your Teams App in JavaScript,
 * refer to https://docs.microsoft.com/en-us/azure/azure-functions/functions-reference for complete Azure Functions
 * developer guide.
 */

// Import polyfills for fetch required by msgraph-sdk-javascript.
require("isomorphic-fetch");
const {
  TeamsFx,
  getTediousConnectionConfig,
  OnBehalfOfUserCredential
} = require("@microsoft/teamsfx");
const fetch = require("node-fetch");
const { Connection, Request } = require('tedious');
const config = require("../config");

/**
 * This function handles requests from teamsfx client.
 * The HTTP request should contain an SSO token queried from Teams in the header.
 * Before trigger this function, teamsfx binding would process the SSO token and generate teamsfx configuration.
 *
 * This function initializes the teamsfx SDK with the configuration and calls these APIs:
 * - new OnBehalfOfUserCredential(ssoToken, authConfig)  - Construct OnBehalfOfUserCredential instance with the received SSO token and initialized configuration.
 * - getUserInfo() - Get the user's information from the received SSO token.
 * - createMicrosoftGraphClientWithCredential() - Get a graph client to access user's Microsoft 365 data.
 *
 * The response contains multiple message blocks constructed into a JSON object, including:
 * - An echo of the request body.
 * - The display name encoded in the SSO token.
 * - Current user's Microsoft 365 profile if the user has consented.
 *
 * @param {Context} context - The Azure Functions context object.
 * @param {HttpRequest} req - The HTTP request.
 * @param {teamsfxContext} { [key: string]: any; } - The context generated by teamsfx binding.
 */
module.exports = async function (context, req, teamsfxContext) {
  context.log("HTTP trigger function processed a request.");

  // Initialize database connection
  let connection;
  try {

    // Initialize route and query parameters
    let route = context.bindingData.route;
    let id = context.bindingData.id;
    let method = req.method.toLowerCase();
    let queryParams = req.query;

    // Initialize response.
    const res = {
      status: 200,
      body: {},
    };

    // Put an echo into response body.
    // res.body.receivedHTTPRequestBody = req.body || "";

    // Prepare access token.
    const ssoToken = teamsfxContext["AccessToken"];
    if (!ssoToken) {
      return {
        status: 400,
        body: {
          error: "No access token was found in request header.",
        },
      };
    }

    // get access token through on-behalf-of flow
    let accessToken = await getAccessToken(ssoToken);

    // Primary routing
    let routeResponse;
    switch (method) {
      case "get":
        routeResponse = await getRequestHandler(accessToken, route, queryParams);
        break;
      case "post":
        routeResponse = await postRequestHandler(accessToken, route, req);
        break;
      case "put":
        routeResponse = await putRequestHandler(accessToken, route, id);
        break;
      case "delete":
        routeResponse = await deleteRequestHandler(accessToken, route, id);
        break;
    }

    if (!routeResponse.data && routeResponse.query) {
      try {
        connection = await getSQLConnection();
        const result = await execQuery(routeResponse.query, connection);
        res.body = result;
      } catch (err) {
        console.log(err);
      }
    } else {
      res.body = routeResponse.data;
    }

    return res;
  } catch (err) {
    return {
      status: 500,
      body: {
        error: err.message
      }
    }
  } finally {
    if (connection) {
      connection.close();
    }
  }
};

// functions to handle requests based on request method and secondary routing
async function getRequestHandler(accessToken, route, queryParams) {
  let data, query;
  switch (route) {
    case "user":
      data = await getSignedInUserDetail(accessToken); // get user details and it's manager
      break;
    case "Currency":
      query = "select id, CurrencyName, CurrencySymbol, CurrencyCode from dbo.Currency"
      break;
    case "Expenses":
      /*if (Object.keys(queryParams).length === 1) {
        query = `select RequestID as id, userId, Name, Amount, Description, Date, Status, Method, Attachment, Status from dbo.Expense where ${(Object.keys(queryParams)[0])} = N'${queryParams[(Object.keys(queryParams)[0])]}'`
      } else if (Object.keys(queryParams).length === 2) {
        query = `select leaveRequestId as id, userId, fullName, email, department, jobTitle, managerId, managerFullName, managerEmail, type, leaveType, startDate, endDate, totalDays, reason, approvalStatus from dbo.LeaveRequest where ${(Object.keys(queryParams)[0])} = N'${queryParams[(Object.keys(queryParams)[0])]}' and ${(Object.keys(queryParams)[1])} = N'${queryParams[(Object.keys(queryParams)[1])]}'`
      } else {
        query = "select leaveRequestId as id, userId, fullName, email, department, jobTitle, managerId, managerFullName, managerEmail, type, leaveType, startDate, endDate, totalDays, reason, approvalStatus from dbo.LeaveRequest"
      }*/
      query = `select RequestID as id, userId, Name, Amount, Description, Date, Status, Method, Attachment, Status from dbo.Expense where RequestID = ${queryParams[(Object.keys(queryParams)[0])]}`
      break;
    case "ApprovalLog":
      query = `select id, ExpenseID, 'ApprovalName', 'ApprovalTime', 'ApprovalStatus', Comment from dbo.ApprovalLog where ExpenseID = ${queryParams[(Object.keys(queryParams)[0])]}`
      break;
  }

  return {
    data: data,
    query: query
  }
}

async function postRequestHandler(accessToken, route, req) {
  try {
    let data, query;
    let requestData = req.body;
    switch (route) {
      case "Currency":
        query = `insert into dbo.Currency (CurrencyName, CurrencySymbol, CurrencyCode) values (N'${requestData.CurrencyName}',N'${requestData.CurrencySymbol}', N'${requestData.CurrencyCode}')`;
        break;
      case "Expenses":
        query = `insert into dbo.Expenses (userId, Name, Amount, Description, Date, Status, Method, Attachment, Status) values (N'${requestData.userId}', N'${requestData.Name}', N'${requestData.Amount}', N'${requestData.Description}', N'${requestData.Date}', N'${requestData.Status}', N'${requestData.Method}', N'${requestData.Attachment}')`
        break;
      case "ApprovalLog":
        query = `begin transaction;insert into dbo.ApprovalLog (ExpenseID, 'ApprovalName', 'ApprovalTime', 'ApprovalStatus', Comment, 'ApprovalRole') values (${parseInt(requestData.ExpenseID)}, N'${requestData.ApprovalName}', N'${requestData.ApprovalTime}', N'${requestData.ApprovalStatus}', N'${requestData.Comment}', N'${requestData.ApprovalRole}');update dbo.Expenses set ApprovalStatus = N'${requestData.ApprovalStatus}' where ExpenseID = ${parseInt(requestData.ExpenseID)};commit;`
        break;
    }

    return {
      data: data,
      query: query
    }
  } catch (error) {
    console.log("!!!!!!!!!!!!!", error);
  }
}

async function putRequestHandler(accessToken, route, id) {
  let data, query;
  switch (route) {
    case "Currency":
      //
      break;
    case "Expenses":
      //
      break;
      case "Personnel":
      //
      break;
  }

  return {
    data: data,
    query: query
  }
}

async function deleteRequestHandler(accessToken, route, id) {
  let data, query;
  switch (route) {
    case "Currency":
      //
      break;
    case "Expenses":
      //
      break;
      case "Personnel":
      //
      break;
  }

  return {
    data: data,
    query: query
  }
}

// function to exchange sso token for access token on-behalf-of the user from Azure AD
async function getAccessToken(ssoToken) {
  try {
    const tokenEndpoint = `https://login.microsoftonline.com/${config.tenantId}/oauth2/v2.0/token`;

    let Headers = new fetch.Headers();
    Headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlencoded = new URLSearchParams();
    urlencoded.append('grant_type', 'urn:ietf:params:oauth:grant-type:jwt-bearer');
    urlencoded.append('client_id', config.clientId);
    urlencoded.append('client_secret', config.clientSecret);
    urlencoded.append('assertion', ssoToken);
    urlencoded.append('scope', "User.Read");
    urlencoded.append('requested_token_use', 'on_behalf_of');

    let options = {
      method: 'POST',
      headers: Headers,
      body: urlencoded
    };

    let response = await fetch(tokenEndpoint, options);
    if (response.ok) {
      let tokenData = await response.json();
      return tokenData.access_token;
    } else {
      // This should be used to request user's consent in a case where individual consent is required
      throw { status: 500, message: "Unable to get access token to fetch resources." };
    }
  } catch (err) {
    throw { status: 500, message: "Unable to get access token to fetch resources." };
  }
}


// function to get signed in user's detail and manager detail
async function getSignedInUserDetail(accessToken) {
  let userEndpoint = "https://graph.microsoft.com/v1.0/me?$select=id,displayName,mail,department,jobTitle&$expand=manager($levels=max;$select=id,displayName,mail)"
  let userOptions = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Accept-Charset': 'utf-8',
      'ConsistencyLevel': 'eventual'
    },
  };

  try {
    let response = await fetch(userEndpoint, userOptions);
    if (response.ok) {
      let user = await response.json();
      return user;
    } else {
      throw { status: 500, message: "Unable to get user detail." };
    }
  } catch (err) {
    throw { status: 500, message: "Unable to get user detail." };
  }
}

// Create connection to Azure SQL Database
async function getSQLConnection(teamsfx) {
  const tediousConfig = {
    authentication: {
      options: {
        userName: config.sqlUsername,
        password: config.sqlPassword,
      },
      type: 'default'
    },
    server: config.sqlEndpoint,
    options: {
      database: config.sqlDatabaseName,
      encrypt: true,
      trustServerCertificate: (process.env["local_env"]) ? true : false // value is set to true for local development
    }
  };
  const connection = new Connection(tediousConfig);
  return new Promise((resolve, reject) => {
    connection.on('connect', err => {
      if (err) {
        reject(err);
      }
      resolve(connection);
    })

    connection.on('debug', function (err) {
      console.log('debug:', err);
    });

    connection.connect()
  })
}

// Query connected SQL database
async function execQuery(query, connection) {
  return new Promise((resolve, reject) => {
    const res = [];
    const request = new Request(query, (err) => {
      if (err) {
        reject(err);
      }
    });

    request.on('row', columns => {
      const row = {};
      columns.forEach(column => {
        row[column.metadata.colName] = column.value;
      });
      res.push(row)
    });

    request.on('requestCompleted', () => {
      resolve(res)
    });

    request.on("error", err => {
      reject(err);
    });

    connection.execSql(request);
  })
}
const Server = require('./core/webServer.js');
const API = require('./api/api.js');
const db = require('./db/connectDb.js');

/** Inits the webserver, API and database */
Server.Init();
API.Init();
db.Init();

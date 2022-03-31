const Server = require('./core/webServer.js');
const API = require('./api/api.js');
const db = require('./db/connectDb.js');

Server.Init();
API.Init();
db.Init();

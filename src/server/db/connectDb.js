const pg = require('pg');
const dbConfig = require('./config/dbConfig.js');
const Logger = require('../logger.js');
const { Pool } = pg;

Logger.Database(`Connecting to database as user: ${dbConfig.user}`);

module.exports = new Pool({
  user: dbConfig.user,
  host: dbConfig.host,
  database: 'block_shop',
  password: 'Outdoor23',
  port: dbConfig.port,
});

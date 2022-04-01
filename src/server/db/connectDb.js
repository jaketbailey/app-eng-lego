/**
 * @file connectDb.js
 * @author UP2002753
 * @description Connections to the database. Including connect and disconnect functions.
 * @namespace Database
 */
const pg = require('pg');
const dbConfig = require('./config/dbConfig.js');
const Logger = require('../logger.js');
const { Pool } = pg;

/**
 * @type {Pool}
 * @memberof Database
 * @description The connection pool to the database.
 * @property {string} user - The username for the database.
 * @property {string} host - The host of the database.
 * @property {string} database - The database name.
 * @property {string} password - The password for the database.
 * @property {string} port - The port of the database.
 */
const pool = new Pool({
  user: dbConfig.user,
  host: dbConfig.host,
  database: 'block_shop',
  password: 'Outdoor23',
  port: dbConfig.port,
});

/**
 * @function Init
 * @memberof Database
 * @description Initialises the database connection. It also handles exit events to disconnect from the db.
 */
const Init = async () => {
  await pool.connect()
    .then(() => {
      Logger.Info('Connected to database');
    }).catch((err) => {
      Logger.Error(err);
      throw err;
    });
  process.stdin.resume();

  process
    .on('exit', () => {
      disconnectDb('exit');
    }).on('SIGTERM', () => {
      disconnectDb('SIGTERM');
    }).on('SIGUSR2', () => {
      disconnectDb('SIGUSR2');
    }).on('SIGINT', () => {
      disconnectDb('SIGINT');
    });
};

/**
 * @function disconnectDb
 * @memberof Database
 * @description Disconnects from the database.
 */
const disconnectDb = (eventType) => {
  Logger.Info(`Detected a ${eventType} event. Closing database connection.`);
  pool.end()
    .then(() => {
      Logger.Info('Disconnected from database');
    })
    .catch(() => {
      Logger.Info('Database already disconnected');
    });
};


module.exports = {
  Init,
  Pool: pool,
};

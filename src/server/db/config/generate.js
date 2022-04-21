/**
 * @file generate.js
 * @author UP2002753
 * @description Creates tables and inserts into the tables.
 */

const pg = require('pg');
const Logger = require('../../logger.js');
const fs = require('fs');

const { Client } = pg;

const dbConfigJSON = fs.readFileSync('./dbConfig.json', 'utf8');
const dbConfig = JSON.parse(dbConfigJSON);


/**
 * @type {Client}
 * @memberof DatabaseConfig
 * @description The client to the database.
 * @property {string} user - The username for the database.
 * @property {string} host - The host of the database.
 * @property {string} database - The database name.
 * @property {string} password - The password for the database.
 * @property {string} port - The port of the database.
 */
const client = new Client({
  user: dbConfig.user,
  host: dbConfig.host,
  database: 'block_shop',
  password: dbConfig.password,
  port: dbConfig.port,
});

/**
 * @function Init
 * @memberof DatabaseConfig
 * @description Connects to the psql server and creates all the tables in the database.
 */
function init() {
  const create = fs.readFileSync('./psql/create_statements.sql', 'utf8');
  client.connect();
  client.query(create, (err) => {
    if (err) {
      Logger.Error(err);
      process.exit(-1);
    }
    Logger.Database('Create tables successful');
    insertInto(client);
  });
}

/**
 * @function insertInto
 * @memberof DatabaseConfig
 * @description Inserts all products into the database.
 * @param {Client} client - The client to the database.
 */
function insertInto(client) {
  const insert = fs.readFileSync('./psql/insert_statements.sql', 'utf8');
  client.query(insert, (err) => {
    if (err) {
      Logger.Error(err);
      process.exit(-1);
    }
    Logger.Database('Insert into tables successful');
    Logger.Database('Database creation successful');
    process.exit(0);
  });
}

module.exports = {
  Init: init,
};

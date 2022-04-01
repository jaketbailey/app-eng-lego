/**
 * @file dbConfig.js
 * @author UP2002753
 * @description Holds database config information.
 */


/**
 * @type {Object}
 * @memberof DatabaseConfig
 * @description The database config object.
 * @property {string} user - The database username.
 * @property {string} password - The database password.
 * @property {string} host - The database host.
 * @property {string} port - The database port.
 */
const config = {
  user: 'postgres',
  password: 'Outdoor23',
  host: 'localhost',
  port: 5432,
};

module.exports = config;

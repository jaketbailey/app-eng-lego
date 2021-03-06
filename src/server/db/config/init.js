/**
 * @file init.js
 * @author UP2002753
 * @description Creates and inserts into the database
 */

const pgtools = require('pgtools');
const generate = require('./generate.js');
const Logger = require('../../logger.js');
const fs = require('fs');

const dbConfigJSON = fs.readFileSync('./dbConfig.json', 'utf8');
const dbConfig = JSON.parse(dbConfigJSON);

/**
 * @function Init
 * @memberof DatabaseConfig
 * @description Inits createDb function from pgtools to create database.
 */
function Init() {
  pgtools.createdb(dbConfig, 'block_shop', (err) => {
    if (err) {
      Logger.Error(err);
      process.exit(-1);
    }
    Logger.Database('Created database: block_shop');
    generate.Init();
  });
}

module.exports = {
  Init,
};

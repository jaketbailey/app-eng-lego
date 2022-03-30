const pg = require('pg');
const dbConfig = require('./dbConfig.js');
const Logger = require('../../logger.js');
const fs = require('fs');

const { Client } = pg;

const client = new Client({
  user: dbConfig.user,
  host: dbConfig.host,
  database: 'block_shop',
  password: dbConfig.password,
  port: dbConfig.port,
});

export default function () {
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

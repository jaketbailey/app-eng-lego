const { Client } = require('pg');
const fs = require('fs');

const dbConfig = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

function createTables(password) {
  const client = new Client({
    user: dbConfig.user,
    host: dbConfig.host,
    database: 'block_shop',
    password: password,
    port: dbConfig.port,
  });
  const create = fs.readFileSync('./psql/create_statements.sql', 'utf8');
  client.connect();
  client.query(create, (err, res) => {
    if (err) {
      console.error(err);
      process.exit(-1);
    }
    console.log(res);
    insertInto(client);
  });
}

function insertInto(client) {
  const insert = fs.readFileSync('./psql/insert_statements.sql', 'utf8');
  client.query(insert, (err, res) => {
    if (err) {
      console.error(err);
      process.exit(-1);
    }
    console.log(res);
  });
}

module.exports = {
  init: (password) => {
    createTables(password);
  },
};

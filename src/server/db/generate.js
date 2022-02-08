const { Client } = require('pg');
const fs = require('fs');

const dbConfig = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

const client = new Client({
  user: dbConfig.user,
  host: dbConfig.host,
  database: 'block_shop',
  password: dbConfig.password,
  port: dbConfig.port,
});

function createTables() {
  const create = fs.readFileSync('./psql/create_statements.sql', 'utf8');
  client.connect();
  client.query(create, (err, res) => {
    if (err) {
      console.error(err);
      process.exit(-1);
    }
    console.log(res);
    insertInto();
  });
}

function insertInto() {
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
  init: () => {
    createTables();
  },
};

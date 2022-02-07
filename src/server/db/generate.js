const { Client } = require('pg');
const fs = require('fs');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'block_shop',
  password: 'Outdoor23',
  port: 5432,
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

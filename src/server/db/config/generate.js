
import pg from 'pg';
import dbConfig from './dbConfig.js';
import * as fs from 'fs';

console.log(dbConfig);

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

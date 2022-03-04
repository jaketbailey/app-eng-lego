const { Pool } = require('pg');
const fs = require('fs');
const dbConfig = JSON.parse(fs.readFileSync('./db/config.json', 'utf8'));
console.log(dbConfig);

const pool = new Pool({
  user: dbConfig.user,
  host: dbConfig.host,
  database: 'block_shop',
  password: 'Outdoor23',
  port: dbConfig.port,
});

module.exports = {
  Pool: pool,
};

import pg from 'pg';
import dbConfig from './db/dbConfig.js';
console.log(dbConfig);
const { Pool } = pg;

export default new Pool({
  user: dbConfig.user,
  host: dbConfig.host,
  database: 'block_shop',
  password: 'Outdoor23',
  port: dbConfig.port,
});

import pg from 'pg';
import dbConfig from './config/dbConfig.js';
import * as Logger from '../logger.js';
const { Pool } = pg;

Logger.Database('Connecting to database');
export default new Pool({
  user: dbConfig.user,
  host: dbConfig.host,
  database: 'block_shop',
  password: 'Outdoor23',
  port: dbConfig.port,
});

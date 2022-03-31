const pg = require('pg');
const dbConfig = require('./config/dbConfig.js');
const Logger = require('../logger.js');
const { Pool } = pg;

const pool = new Pool({
  user: dbConfig.user,
  host: dbConfig.host,
  database: 'block_shop',
  password: 'Outdoor23',
  port: dbConfig.port,
});

const Init = async () => {
  await pool.connect()
    .then(() => {
      Logger.Info('Connected to database');
    }).catch((err) => {
      Logger.Error(err);
      throw err;
    });
};

process.on('SIGINT', () => {
  disconnectDb();
}).on('SIGTERM', () => {
  disconnectDb();
}).on('SIGUSR2', () => {
  disconnectDb();
}).on('exit', () => {
  disconnectDb();
});


const disconnectDb = async () => {
  await pool.end()
    .then(() => {
      Logger.Info('Disconnected from database');
    }).catch((err) => {
      Logger.Error(err);
      throw err;
    });
};

module.exports = {
  Init,
  Pool: pool,
};

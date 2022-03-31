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
  process.stdin.resume();

  process
    .on('exit', () => {
      disconnectDb('exit');
    }).on('SIGTERM', () => {
      disconnectDb('SIGTERM');
    }).on('SIGUSR2', () => {
      disconnectDb('SIGUSR2');
    }).on('SIGINT', () => {
      disconnectDb('SIGINT');
    });
};

const disconnectDb = (eventType) => {
  Logger.Info(`Detected a ${eventType} event. Closing database connection.`);
  pool.end()
    .then(() => {
      Logger.Info('Disconnected from database');
    })
    .catch(() => {
      Logger.Info('Database already disconnected');
    });
  process.exit();
};


module.exports = {
  Init,
  Pool: pool,
};

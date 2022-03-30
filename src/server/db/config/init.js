const pgtools = require('pgtools');
const generate = require('./generate.js');
const Logger = require('../../logger.js');
const dbConfig = require('./dbConfig.js');

function Init() {
  pgtools.createdb(dbConfig, 'block_shop', (err) => {
    if (err) {
      Logger.Error(err);
      process.exit(-1);
    }
    Logger.Database('Created database: block_shop');
    generate.Init();
  });
}

module.exports = {
  Init,
};

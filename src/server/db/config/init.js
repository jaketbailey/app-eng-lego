import * as pgtools from 'pgtools';
import Init from './generate.js';
import dbConfig from './dbConfig.js';
import * as Logger from '../../logger.js';

export default function () {
  console.log(dbConfig);
  pgtools.createdb(dbConfig, 'block_shop', (err) => {
    if (err) {
      Logger.Error(err);
      process.exit(-1);
    }
    Logger.Database('Created database: block_shop');
    Init();
  });
}

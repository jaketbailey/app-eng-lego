import * as pgtools from 'pgtools';
import init from './generate.js';
import dbConfig from './dbConfig.js';

export default function () {
  console.log(dbConfig);
  pgtools.createdb(dbConfig, 'block_shop', (err, res) => {
    if (err) {
      console.error(err);
      process.exit(-1);
    }
    console.log(res);
    console.log(dbConfig);

    const data = JSON.stringify(dbConfig, null, 2);
    console.log(data);

    init();
  });
}

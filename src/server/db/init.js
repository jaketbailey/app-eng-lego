import * as pgtools from 'pgtools';
import init from './generate.js';
import * as readline from 'readline';
import * as fs from 'fs';
import dbConfig from './dbConfig.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.stoutMuted = true;

export default function () {
  pgtools.createdb(dbConfig, 'block_shop', (err, res) => {
    if (err) {
      console.error(err);
      process.exit(-1);
    }
    console.log(res);
    console.log(dbConfig);

    const data = JSON.stringify(dbConfig, null, 2);
    console.log(data);

    fs.writeFileSync('./config.json', data, (err) => {
      if (err) throw err;
      console.log('Config written to file');
    });
    init();
  });
}

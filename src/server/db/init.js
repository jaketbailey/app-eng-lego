const pgtools = require('pgtools');
const generate = require('./generate.js');
const readline = require('readline');
const fs = require('fs');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function init() {
  rl.question('Enter your postgres username: ', (username) => {
    rl.question('Enter your postgres password: ', (password) => {
      rl.question('Enter your postgres port: ', (port) => {
        rl.question('Enter your postgres host: ', (host) => {
          createDB(username, password, port, host);
        });
      });
    });
  });
}

function createDB(username, password, port, host) {
  const config = {
    user: username,
    password: password,
    port: parseInt(port),
    host: host,
  };

  const data = JSON.stringify(config, null, 2);

  fs.writeFileSync('./config.json', data, (err) => {
    if (err) throw err;
    console.log('Config written to file');
  });

  pgtools.createdb(config, 'block_shop', (err, res) => {
    if (err) {
      console.error(err);
      process.exit(-1);
    }
    console.log(res);
    generate.init();
  });
}

module.exports = {
  init: init,
};

const pgtools = require('pgtools');
const generate = require('./generate.js');
const readline = require('readline');
const fs = require('fs');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.stoutMuted = true;

function init() {
  rl.history = rl.history.slice(1);

  rl.stdoutMuted = false;

  rl.query = 'Enter your postgres username: ';
  rl.question(rl.query, (username) => {
    rl.stdoutMuted = true;
    rl.query = 'Enter your postgres password: ';
    rl.question(rl.query, (password) => {
      rl.stdoutMuted = false;
      rl.query = 'Enter your postgres port: ';
      rl.question(rl.query, (port) => {
        rl.query = 'Enter your postgres host: ';
        rl.question(rl.query, (host) => {
          createDB(username, password, port, host);
          rl.close();
        });
      });
    });
  });

  rl._writeToOutput = function _writeToOutput(stringToWrite) {
    if (rl.stdoutMuted) {
      rl.output.write('\x1B[2K\x1B[200D' + rl.query + '[' + ((rl.line.length % 2 === 1) ? '=-' : '-=') + ']');
    } else {
      rl.output.write(stringToWrite);
    }
  };
}

function createDB(username, password, port, host) {
  const config = {
    user: username,
    password: password,
    port: parseInt(port),
    host: host,
  };

  pgtools.createdb(config, 'block_shop', (err, res) => {
    if (err) {
      console.error(err);
      process.exit(-1);
    }
    console.log(res);
    console.log(config);
    delete config.password;
    delete config.database;

    const data = JSON.stringify(config, null, 2);
    console.log(data);

    fs.writeFileSync('./config.json', data, (err) => {
      if (err) throw err;
      console.log('Config written to file');
    });
    generate.init(password);
  });
}

module.exports = {
  init: init,
};

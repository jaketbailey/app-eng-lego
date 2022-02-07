const pgtools = require('pgtools');
const generate = require('./generate.js');

function init() {
  const config = {
    user: 'postgres',
    password: 'Outdoor23',
    port: 5432,
    host: 'localhost',
  };

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

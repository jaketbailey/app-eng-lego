const { Client } = require('pg');
const fs = require('fs');
const admin = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'block_shop',
  password: 'Outdoor23',
  port: 5432,
});

const test = fs.readFileSync('test.sql').toString();
function init() {
  admin.connect();
  console.log('Database handling initialized');
  admin.query(test, (err, res) => {
    if (err) {
      console.log(err);
      admin.end();
    }
    console.log(res);
  });
}

module.exports = {
  init: init,
};

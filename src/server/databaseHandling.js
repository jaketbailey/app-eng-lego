const { Pool, Client } = require('pg');
const client = new Client();

function init() {
  client.connect();
  console.log('Database handling initialized');
  client.query('SELECT * FROM users', (err, res) => {
    if (err) {
      console.log(err);
    }
    console.log(res.rows);
    client.end();
  });
}
module.exports = {
  init: init,
};

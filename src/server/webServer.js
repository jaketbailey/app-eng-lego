// Imports the express.js api and sets the port to 8080 as specified in the coursework spec
const express = require('express');
const bodyParser = require('body-parser');
const port = 8080;
const auth = require('./authentication');
const colors = require('colors');
const app = express();
const db = require('./queries.js');
colors.setTheme({
  boot: 'cyan',
  error: ['red', 'bold'],
  warn: 'yellow',
  info: 'green',
});
/*  Function initWebServer is ran from index.js when the program is initially loaded
this starts the webserver using express and  statically serves the directory for the
web application  */
function init() {
  const jsonParser = bodyParser.json();
  app.get('/shop/all', db.getAllProducts);
  app.get('/shop/item/:id', db.getProductById);
  app.get('/shop/filter/:filter', db.getProductByFilter);
  app.post('/create-user/', jsonParser, db.createUser);

  app.use(express.static('../app/'));
  auth.auth0(app);

  app.listen(port, err => {
    if (err) {
      return err;
    } else {
      console.log(`[BOOT] Server running on port: ${port}`.boot);
    }
  });
}

module.exports = {
  init: init,
  app: app,
};

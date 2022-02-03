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
  app.get('/get-user/:id', db.getUser);
  app.get('/get-previous-order/', db.getPreviousOrder);
  app.get('/check-exists/:id', db.checkExists);
  app.get('/return-to-shop/', (req, res) => {
    res.redirect('/shop/');
  });
  app.get('/get-basket-items/:id', db.getBasketItems);
  app.get('/get-stock/:id', db.getStock);
  app.post('/create-user/', jsonParser, db.createUser);
  app.post('/create-basket/', jsonParser, db.createBasket);
  app.post('/add-to-basket/', jsonParser, db.addToBasket);
  app.put('/update-user/', jsonParser, db.updateUser);
  app.put('/update-stock/', jsonParser, db.updateStock);
  app.put('/add-to-stock/', jsonParser, db.addToStock);
  app.delete('/remove-basket-item/', jsonParser, db.removeBasketItem);

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

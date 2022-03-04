const Server = require('./webServer');
const db = require('./queries.js');
const bodyParser = require('body-parser');

function init() {
  const jsonParser = bodyParser.json();
  // All GET requests to retrieve data from the database
  Server.app.get('/shop/all', db.getAllProducts);
  Server.app.get('/shop/item/:id', db.getProductById);
  Server.app.get('/get-user/:id', db.getUser);
  Server.app.get('/get-previous-order/', db.getPreviousOrder);
  Server.app.get('/check-exists/:id', db.checkExists);
  Server.app.get('/get-basket-items/:id', db.getBasketItems);
  Server.app.get('/get-stock/:id', db.getStock);
  Server.app.get('/get-total-cost/:id', db.getTotalCost);
  Server.app.get('/get-user-name/:id', db.getUserName);
  Server.app.get('/get-basket/:id', db.getBasketId);
  Server.app.get('/type-filters/:filter/', db.getProductByFilter);

  // All POST requests to add data to the database
  Server.app.post('/create-user/', jsonParser, db.createUser);
  Server.app.post('/create-basket/', jsonParser, db.createBasket);
  Server.app.post('/add-to-basket/', jsonParser, db.addToBasket);

  // All PUT requests to update data in the database
  Server.app.put('/update-user/', jsonParser, db.updateUser);
  Server.app.put('/update-stock/', jsonParser, db.updateStock);
  Server.app.put('/add-to-stock/', jsonParser, db.addToStock);
  Server.app.put('/add-total-cost/', jsonParser, db.addTotalCost);
  Server.app.put('/add-shipping-address/', jsonParser, db.addShippingAddress);
  Server.app.put('/update-order/', jsonParser, db.updateOrder);

  // All DELETE requests to delete data from the database
  Server.app.delete('/remove-basket-item/', jsonParser, db.removeBasketItem);
  Server.app.delete('/delete-user/', jsonParser, db.deleteUser);
}

module.exports = {
  init: init,
};

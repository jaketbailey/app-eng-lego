const Server = require('./webServer');
const dbGet = require('./getDb');
const dbPost = require('./postDb');
const dbPut = require('./putDb');
const dbDelete = require('./deleteDb');
const bodyParser = require('body-parser');

function init() {
  const jsonParser = bodyParser.json();
  // All GET requests to retrieve data from the database
  Server.app.get('/shop/all', dbGet.getAllProducts);
  Server.app.get('/shop/item/:id', dbGet.getProductById);
  Server.app.get('/get-user/:id', dbGet.getUser);
  Server.app.get('/get-previous-order/', dbGet.getPreviousOrder);
  Server.app.get('/check-exists/:id', dbGet.checkExists);
  Server.app.get('/get-basket-items/:id', dbGet.getBasketItems);
  Server.app.get('/get-stock/:id', dbGet.getStock);
  Server.app.get('/get-total-cost/:id', dbGet.getTotalCost);
  Server.app.get('/get-user-name/:id', dbGet.getUserName);
  Server.app.get('/get-basket/:id', dbGet.getBasketId);
  Server.app.get('/type-filters/:filter/', dbGet.getProductByFilter);
  Server.app.get('/check-order-detail/:id', dbGet.checkOrderDetail);

  // All POST requests to add data to the database
  Server.app.post('/create-user/', jsonParser, dbPost.createUser);
  Server.app.post('/create-basket/', jsonParser, dbPost.createBasket);
  Server.app.post('/add-to-basket/', jsonParser, dbPost.addToBasket);

  // All PUT requests to update data in the database
  Server.app.put('/update-user/', jsonParser, dbPut.updateUser);
  Server.app.put('/update-stock/', jsonParser, dbPut.updateStock);
  Server.app.put('/add-to-stock/', jsonParser, dbPut.addToStock);
  Server.app.put('/add-total-cost/', jsonParser, dbPut.addTotalCost);
  Server.app.put('/add-shipping-address/', jsonParser, dbPut.addShippingAddress);
  Server.app.put('/update-order/', jsonParser, dbPut.updateOrder);
  Server.app.put('/update-basket-item/', jsonParser, dbPut.updateOrderDetail);

  // All DELETE requests to delete data from the database
  Server.app.delete('/remove-basket-item/', jsonParser, dbDelete.removeBasketItem);
  Server.app.delete('/delete-user/', jsonParser, dbDelete.deleteUser);
}

module.exports = {
  init: init,
};

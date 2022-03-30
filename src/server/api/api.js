const Server = require('../core/webServer.js');
const getDb = require('./getDb.js');
const postDb = require('./postDb.js');
const putDb = require('./putDb.js');
const deleteDb = require('./deleteDb.js');
const Logger = require('../logger.js');
const bodyParser = require('body-parser');

function Init() {
  Logger.Express('Initialising API routes');
  const jsonParser = bodyParser.json();
  // All GET requests to retrieve data from the database
  Server.App.get('/block/api/shop/all', getDb.getAllProducts);
  Server.App.get('/block/api/shop/item/:id', getDb.getProductById);
  Server.App.get('/block/api/get-user/:id', getDb.getUser);
  Server.App.get('/block/api/check-exists/:id', getDb.checkExists);
  Server.App.get('/block/api/get-basket-items/:id', getDb.getBasketItems);
  Server.App.get('/block/api/get-stock/:id', getDb.getStock);
  Server.App.get('/block/api/get-total-cost/:id', getDb.getTotalCost);
  Server.App.get('/block/api/get-user-name/:id', getDb.getUserName);
  Server.App.get('/block/api/get-basket/:id', getDb.getBasketId);
  Server.App.get('/block/api/type-filters/:filter/', getDb.getProductByFilter);
  Server.App.get('/block/api/check-order-detail/:id', getDb.checkOrderDetail);
  Server.App.get('/block/api/search-product/:search', getDb.searchProduct);

  // All POST requests to add data to the database
  Server.App.post('/block/api/create-user/', jsonParser, postDb.createUser);
  Server.App.post('/block/api/create-basket/', jsonParser, postDb.createBasket);
  Server.App.post('/block/api/add-to-basket/', jsonParser, postDb.addToBasket);

  // All PUT requests to update data in the database
  Server.App.put('/block/api/update-user/', jsonParser, putDb.updateUser);
  Server.App.put('/block/api/update-stock/', jsonParser, putDb.updateStock);
  Server.App.put('/block/api/add-to-stock/', jsonParser, putDb.addToStock);
  Server.App.put('/block/api/add-total-cost/', jsonParser, putDb.addTotalCost);
  Server.App.put('/block/api/add-shipping-address/', jsonParser, putDb.addShippingAddress);
  Server.App.put('/block/api/update-order/', jsonParser, putDb.updateOrder);
  Server.App.put('/block/api/update-order-detail/', jsonParser, putDb.updateOrderDetail);

  // All DELETE requests to delete data from the database
  Server.App.delete('/block/api/remove-basket-item/', jsonParser, deleteDb.removeBasketItem);
  Server.App.delete('/block/api/delete-user/', jsonParser, deleteDb.deleteUser);
}

module.exports = { Init };

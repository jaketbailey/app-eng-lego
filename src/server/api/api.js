import { app } from '../core/webServer.js';
import * as getDb from '../db/getDb.js';
import * as postDb from '../db/postDb.js';
import * as putDb from '../db/putDb.js';
import * as deleteDb from '../db/deleteDb.js';
import bodyParser from 'body-parser';

export default function () {
  const jsonParser = bodyParser.json();
  // All GET requests to retrieve data from the database
  app.get('/block/api/shop/all', getDb.getAllProducts);
  app.get('/block/api/shop/item/:id', getDb.getProductById);
  app.get('/block/api/get-user/:id', getDb.getUser);
  app.get('/block/api/check-exists/:id', getDb.checkExists);
  app.get('/block/api/get-basket-items/:id', getDb.getBasketItems);
  app.get('/block/api/get-stock/:id', getDb.getStock);
  app.get('/block/api/get-total-cost/:id', getDb.getTotalCost);
  app.get('/block/api/get-user-name/:id', getDb.getUserName);
  app.get('/block/api/get-basket/:id', getDb.getBasketId);
  app.get('/block/api/type-filters/:filter/', getDb.getProductByFilter);
  app.get('/block/api/check-order-detail/:id', getDb.checkOrderDetail);
  app.get('/block/api/search-product/:search', getDb.searchProduct);

  // All POST requests to add data to the database
  app.post('/block/api/create-user/', jsonParser, postDb.createUser);
  app.post('/block/api/create-basket/', jsonParser, postDb.createBasket);
  app.post('/block/api/add-to-basket/', jsonParser, postDb.addToBasket);

  // All PUT requests to update data in the database
  app.put('/block/api/update-user/', jsonParser, putDb.updateUser);
  app.put('/block/api/update-stock/', jsonParser, putDb.updateStock);
  app.put('/block/api/add-to-stock/', jsonParser, putDb.addToStock);
  app.put('/block/api/add-total-cost/', jsonParser, putDb.addTotalCost);
  app.put('/block/api/add-shipping-address/', jsonParser, putDb.addShippingAddress);
  app.put('/block/api/update-order/', jsonParser, putDb.updateOrder);
  app.put('/block/api/update-basket-item/', jsonParser, putDb.updateOrderDetail);
  app.put('/block/api/update-order-detail/', jsonParser, putDb.updateOrderDetail);

  // All DELETE requests to delete data from the database
  app.delete('/block/api/remove-basket-item/', jsonParser, deleteDb.removeBasketItem);
  app.delete('/block/api/delete-user/', jsonParser, deleteDb.deleteUser);
}

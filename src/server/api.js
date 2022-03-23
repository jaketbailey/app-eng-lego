import { app } from './webServer.js';
import * as getDb from './getDb.js';
import * as postDb from './postDb.js';
import * as putDb from './putDb.js';
import * as deleteDb from './deleteDb.js';
import bodyParser from 'body-parser';

export default function () {
  const jsonParser = bodyParser.json();
  // All GET requests to retrieve data from the database
  app.get('/shop/all', getDb.getAllProducts);
  app.get('/shop/item/:id', getDb.getProductById);
  app.get('/get-user/:id', getDb.getUser);
  app.get('/get-previous-order/', getDb.getPreviousOrder);
  app.get('/check-exists/:id', getDb.checkExists);
  app.get('/get-basket-items/:id', getDb.getBasketItems);
  app.get('/get-stock/:id', getDb.getStock);
  app.get('/get-total-cost/:id', getDb.getTotalCost);
  app.get('/get-user-name/:id', getDb.getUserName);
  app.get('/get-basket/:id', getDb.getBasketId);
  app.get('/type-filters/:filter/', getDb.getProductByFilter);
  app.get('/check-order-detail/:id', getDb.checkOrderDetail);
  app.get('/search-product/:search', getDb.searchProduct);

  // All POST requests to add data to the database
  app.post('/create-user/', jsonParser, postDb.createUser);
  app.post('/create-basket/', jsonParser, postDb.createBasket);
  app.post('/add-to-basket/', jsonParser, postDb.addToBasket);

  // All PUT requests to update data in the database
  app.put('/update-user/', jsonParser, putDb.updateUser);
  app.put('/update-stock/', jsonParser, putDb.updateStock);
  app.put('/add-to-stock/', jsonParser, putDb.addToStock);
  app.put('/add-total-cost/', jsonParser, putDb.addTotalCost);
  app.put('/add-shipping-address/', jsonParser, putDb.addShippingAddress);
  app.put('/update-order/', jsonParser, putDb.updateOrder);
  app.put('/update-basket-item/', jsonParser, putDb.updateOrderDetail);
  app.put('/update-order-detail/', jsonParser, putDb.updateOrderDetail);

  // All DELETE requests to delete data from the database
  app.delete('/remove-basket-item/', jsonParser, deleteDb.removeBasketItem);
  app.delete('/delete-user/', jsonParser, deleteDb.deleteUser);
}

import { app } from './webServer.js';
import {
  getAllProducts,
  getProductById,
  getUser,
  getPreviousOrder,
  checkExists,
  getBasketItems,
  getStock,
  getTotalCost,
  getUserName,
  getBasketId,
  getProductByFilter,
  checkOrderDetail,
} from './getDb.js';
import {
  createUser,
  createBasket,
  addToBasket,
} from './postDb.js';
import {
  updateUser,
  updateStock,
  addToStock,
  addTotalCost,
  addShippingAddress,
  updateOrder,
  updateOrderDetail,
} from './putDb.js';
import {
  removeBasketItem,
  deleteUser,
} from './deleteDb.js';
import bodyParser from 'body-parser';
import config from './auth-config.js';
import authHelp from './auth0-helpers.js';

export default function () {
  app.get('/auth-config', (req, res) => {
    res.json(config);
  });
  const jsonParser = bodyParser.json();
  // All GET requests to retrieve data from the database
  app.get('/shop/all', getAllProducts);
  app.get('/shop/item/:id', getProductById);
  app.get('/get-user/:id', getUser);
  app.get('/get-previous-order/', getPreviousOrder);
  app.get('/check-exists/:id', checkExists);
  app.get('/get-basket-items/:id', getBasketItems);
  app.get('/get-stock/:id', getStock);
  app.get('/get-total-cost/:id', getTotalCost);
  app.get('/get-user-name/:id', getUserName);
  app.get('/get-basket/:id', getBasketId);
  app.get('/type-filters/:filter/', getProductByFilter);
  app.get('/check-order-detail/:id', checkOrderDetail);

  const auth0 = authHelp(config);

  app.get('/api/hello', async (req, res) => {
    const userId = auth0.getUserID(req);

    // load the user information, in production this would need caching or storing in a database
    const profile = await auth0.getProfile(req);

    res.send(`Hello user ${userId}, here's your profile:\n${JSON.stringify(profile, null, 2)}`);

    console.log('successful authenticated request by ' + userId);
  });

  // All POST requests to add data to the database
  app.post('/create-user/', jsonParser, createUser);
  app.post('/create-basket/', jsonParser, createBasket);
  app.post('/add-to-basket/', jsonParser, addToBasket);

  // All PUT requests to update data in the database
  app.put('/update-user/', jsonParser, updateUser);
  app.put('/update-stock/', jsonParser, updateStock);
  app.put('/add-to-stock/', jsonParser, addToStock);
  app.put('/add-total-cost/', jsonParser, addTotalCost);
  app.put('/add-shipping-address/', jsonParser, addShippingAddress);
  app.put('/update-order/', jsonParser, updateOrder);
  app.put('/update-basket-item/', jsonParser, updateOrderDetail);
  app.put('/update-order-detail/', jsonParser, updateOrderDetail);

  // All DELETE requests to delete data from the database
  app.delete('/remove-basket-item/', jsonParser, removeBasketItem);
  app.delete('/delete-user/', jsonParser, deleteUser);
}

/**
 * @file putDb.js
 * @author UP2002753
 * @description Put Api Endpoints
 */

const Logger = require('../logger.js');
const Query = require('../db/updateQueries.js');

/**
 * @function updateUser
 * @description API endpoint to update a user's address info.
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @memberof Api
 */
const updateUser = (req, res) => {
  const { id, address1, address2, city, country, county, postcode, phone } = req.body;
  Logger.Express('/block/api/update-user/', 'PUT');
  try {
    Query.updateUser(id, address1, address2, city, country, county, postcode, phone);
    res.status(204).send(`User updated with ID: ${id}`);
  } catch (err) {
    Logger.Error(err);
    res.status(500).send(`Error: ${err}`);
    throw err;
  }
};

/**
 * @function updateStock
 * @description API endpoint to update a product's stock.
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @memberof Api
 */
const updateStock = (req, res) => {
  const { id, quantity } = req.body;
  Logger.Express('/block/api/update-stock/', 'PUT');
  try {
    Query.updateStock(id, quantity);
    res.status(204).send(`Stock updated for product id: ${id}`);
  } catch (err) {
    Logger.Error(err);
    res.status(500).send(`Error: ${err}`);
    throw err;
  }
};

/**
 * @function addToStock
 * @description API endpoint to update a product's stock.
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @memberof Api
 */
const addToStock = (req, res) => {
  const { productId, quantity } = req.body;
  Logger.Express('/block/api/add-to-stock/', 'PUT');
  try {
    Query.addToStock(productId, quantity);
    res.status(204).send(`Stock updated for product id: ${productId}`);
  } catch (err) {
    Logger.Error(err);
    res.status(500).send(`Error: ${err}`);
    throw err;
  }
};

/**
 * @function addTotalCost
 * @description API endpoint to update a the total stock of a product.
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @memberof Api
 */
const addTotalCost = (req, res) => {
  const { id, total } = req.body;
  Logger.Express('/block/api/add-total-cost/', 'PUT');
  try {
    Query.addTotalCost(id, total);
    res.status(204).send(`Order total cost updated for order id: ${id}`);
  } catch (err) {
    Logger.Error(err);
    res.status(500).send(`Error: ${err}`);
    throw err;
  }
};

/**
 * @function addShippingAddress
 * @description API endpoint to update the order's shipping address.
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @memberof Api
 */
const addShippingAddress = (req, res) => {
  const { id, address1, address2, city, county, postcode, country } = req.body;
  Logger.Express('/block/api/add-shipping-address/', 'PUT');
  try {
    Query.addShippingAddress(id, address1, address2, city, county, postcode, country);
    res.status(204).send(`Shipping address updated with ID: ${id}`);
  } catch (err) {
    Logger.Error(err);
    res.status(500).send(`Error: ${err}`);
    throw err;
  }
};

/**
 * @function updateOrder
 * @description API endpoint to update an order's status.
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @memberof Api
 */
const updateOrder = (req, res) => {
  const { id, status } = req.body;
  Logger.Express('/block/api/update-order/', 'PUT');
  try {
    Query.updateOrder(id, status);
    res.status(204).send(`Order status updated to ${status} for order; ${id}`);
  } catch (err) {
    Logger.Error(err);
    res.status(500).send(`Error: ${err}`);
    throw err;
  }
};

/**
 * @function updateOrderDetail
 * @description API endpoint to update the price and quantity of an order detail/item.
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @memberof Api
 */
const updateOrderDetail = (req, res) => {
  const { id, productId, price, quantity } = req.body;
  Logger.Express('/block/api/update-order-detail/', 'PUT');
  try {
    Query.updateOrderDetail(id, productId, price, quantity);
    res.status(204).send(`Order updated with orderId: ${id}, ProductId: ${productId}`);
  } catch (err) {
    Logger.Error(err);
    res.status(500).send(`Error: ${err}`);
    throw err;
  }
};

module.exports = {
  updateUser,
  updateStock,
  addToStock,
  addTotalCost,
  addShippingAddress,
  updateOrder,
  updateOrderDetail,
};

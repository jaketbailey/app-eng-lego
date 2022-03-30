const Logger = require('../logger.js');
const Query = require('../db/updateQueries.js');

const updateUser = (req, res) => {
  const { id, address1, address2, city, country, county, postcode, phone } = req.body;
  Logger.Express('/block/api/update-user/', 'PUT');
  Query.updateUser(id, address1, address2, city, country, county, postcode, phone)
    .catch((err) => {
      Logger.Error(err);
      res.status(500).send(`Error: ${err}`);
      throw err;
    });
  res.status(200).send(`User updated with ID: ${id}`);
};

const updateStock = (req, res) => {
  const { id, quantity } = req.body;
  Logger.Express('/block/api/update-stock/', 'PUT');
  Query.updateStock(id, quantity)
    .catch((err) => {
      Logger.Error(err);
      res.status(500).send(`Error: ${err}`);
      throw err;
    });
  res.status(200).send(`Stock updated for product id: ${id}`);
};

const addToStock = (req, res) => {
  const { productId, quantity } = req.body;
  Logger.Express('/block/api/add-to-stock/', 'PUT');
  Query.addToStock(productId, quantity)
    .catch((err) => {
      Logger.Error(err);
      res.status(500).send(`Error: ${err}`);
      throw err;
    });
  res.status(200).send(`Stock updated for product id: ${productId}`);
};

const addTotalCost = (req, res) => {
  const { id, total } = req.body;
  Logger.Express('/block/api/add-total-cost/', 'PUT');
  Query.addTotalCost(id, total)
    .catch((err) => {
      Logger.Error(err);
      res.status(500).send(`Error: ${err}`);
      throw err;
    });
  res.status(200).send(`Order total cost updated for order id: ${id}`);
};

const addShippingAddress = (req, res) => {
  const { id, address1, address2, city, county, postcode, country } = req.body;
  Logger.Express('/block/api/add-shipping-address/', 'PUT');
  Query.addShippingAddress(id, address1, address2, city, county, postcode, country)
    .catch((err) => {
      Logger.Error(err);
      res.status(500).send(`Error: ${err}`);
      throw err;
    });
  res.status(200).send(`Shipping address updated with ID: ${id}`);
};

const updateOrder = (req, res) => {
  const { id, status } = req.body;
  Logger.Express('/block/api/update-order/', 'PUT');
  Query.updateOrder(id, status)
    .catch((err) => {
      Logger.Error(err);
      res.status(500).send(`Error: ${err}`);
      throw err;
    });
  res.status(200).send(`Order status updated to ${status} for order; ${id}`);
};

const updateOrderDetail = (req, res) => {
  const { id, productId, price, quantity } = req.body;
  Logger.Express('/block/api/update-order-detail/', 'PUT');
  Query.updateOrderDetail(id, productId, price, quantity)
    .catch((err) => {
      Logger.Error(err);
      res.status(500).send(`Error: ${err}`);
      throw err;
    });
  res.status(200).send(`Order updated with orderId: ${id}, ProductId: ${productId}`);
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

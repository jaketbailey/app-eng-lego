const Logger = require('../logger.js');
const Query = require('../db/insertQueries.js');

const createUser = (req, res) => {
  const { sub, name, email } = req.body;
  Logger.Express('/block/api/create-user/', 'POST');
  Query.createUser(sub, name, email)
    .catch((err) => {
      Logger.Error(err);
      res.status(500).send(`Error: ${err}`);
      throw err;
    });
  res.status(201).send(`User added with ID: ${sub}`);
};

const createBasket = (req, res) => {
  const { customerId, email } = req.body;
  Logger.Express('/block/api/create-basket/', 'POST');
  Query.createBasket(customerId, email)
    .catch((err) => {
      Logger.Error(err);
      res.status(500).send(`Error: ${err}`);
      throw err;
    });
  res.status(201).send('Basket created');
};

const addToBasket = (req, res) => {
  const { id, productId, price, quantity } = req.body;
  Logger.Express('/block/api/add-to-basket/', 'POST');
  Query.addToBasket(id, productId, price, quantity)
    .catch((err) => {
      Logger.Error(err);
      res.status(500).send(`Error: ${err}`);
      throw err;
    });
  res.status(201).send(`Product added to basket with order id: ${id}`);
};

module.exports = {
  createUser,
  createBasket,
  addToBasket,
};

const Pool = require('./connectDb.js');
const Logger = require('../logger.js');

const removeBasketItem = async (id) => {
  Logger.Database(`Removing basket item ${id}`);
  await Pool.query(`
    DELETE FROM order_details
    WHERE id = '${id}'
    `)
    .catch((err) => {
      Logger.Error(err);
      throw err;
    });
  Logger.Info(`Product removed from basket with ID: ${id}`);
};

const deleteUser = async (id, orderId) => {
  Logger.Database(`Deleting user: ${id}`);
  await Pool.query(`
    DELETE FROM order_details
    WHERE order_id = '${orderId}';
    `)
    .catch((err) => {
      Logger.Error(err);
      throw err;
    });
  await Pool.query(`
    DELETE FROM orders
    WHERE customer_id = '${id}';
    `)
    .catch((err) => {
      Logger.Error(err);
      throw err;
    });
  await Pool.query(`
    DELETE FROM customers
    WHERE id = '${id}';
    `)
    .catch((err) => {
      Logger.Error(err);
      throw err;
    });
  Logger.Info(`User deleted with ID: ${id}`);
};

module.exports = {
  removeBasketItem,
  deleteUser,
};

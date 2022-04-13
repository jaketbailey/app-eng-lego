/**
 * @file deleteDb.js
 * @author UP2002753
 * @description Connections to the database. Including connect and disconnect functions.
 */

const db = require('./connectDb.js');
const Logger = require('../logger.js');

/**
 * @function removeBasketItem
 * @memberof Database
 * @description Removes an item from the basket.
 * @param {string} id - The ID of the user to delete.
 */
const removeBasketItem = async (id) => {
  Logger.Database(`Removing basket item ${id}`);
  await db.Pool.query(`
    DELETE FROM order_details
    WHERE id = '${id}'
    `)
    .catch((err) => {
      Logger.Error(err);
      throw err;
    });
  Logger.Database(`Product removed from basket with ID: ${id}`);
  return `Product removed from basket with ID: ${id}`;
};

/**
 * @function deleteUser
 * @memberof Database
 * @description Deletes a user and all of their relevant data from the database.
 * @param {string} id - The ID of the user to delete.
 * @param {string} orderId - The ID of the order to delete.
 */
const deleteUser = async (id, orderId) => {
  Logger.Database(`Deleting user: ${id}`);
  await db.Pool.query(`
    DELETE FROM order_details
    WHERE order_id = '${orderId}';
    
    DELETE FROM orders
    WHERE customer_id = '${id}';

    DELETE FROM customers
    WHERE id = '${id}';
    `)
    .catch((err) => {
      Logger.Error(err);
      throw err;
    });
  Logger.Database(`User deleted with ID: ${id}`);
  return `User deleted with ID: ${id}`;
};

module.exports = {
  removeBasketItem,
  deleteUser,
};

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
const deleteOrderDetails = (orderId) => {
  Logger.Database(`Deleting orders in order: ${orderId}`);
  return new Promise((resolve, reject) => {
    db.Pool.query(`
      DELETE FROM order_details
      WHERE order_id = '${orderId}'
      `)
      .then(() => {
        Logger.Database(`Order details deleted with order ID: ${orderId}`);
        resolve(`Order details deleted with order ID: ${orderId}`);
      })
      .catch((err) => {
        Logger.Error(err);
        reject(err);
      });
  });
};

const deleteOrder = (id) => {
  Logger.Database(`Deleting user: ${id}`);
  return new Promise((resolve, reject) => {
    db.Pool.query(`
      DELETE FROM orders
      WHERE customer_id = '${id}'
    `)
      .then(() => {
        Logger.Database(`Order deleted with ID: ${id}`);
        resolve(`Order deleted with ID: ${id}`);
      })
      .catch((err) => {
        Logger.Error(err);
        reject(err);
      });
    // Logger.Database(`Order deleted with customer ID: ${id}`);
    // return `Order deleted with customer ID: ${id}`;
  });
};

const deleteUser = (id) => {
  Logger.Database(`Deleting user: ${id}`);
  return new Promise((resolve, reject) => {
    db.Pool.query(`
      DELETE FROM customers
      WHERE id = '${id}'
    `)
      .then(() => {
        Logger.Database(`User deleted with ID: ${id}`);
        resolve(`User deleted with ID: ${id}`);
      })
      .catch((err) => {
        Logger.Error(err);
        reject(err);
      });
  });
};

module.exports = {
  removeBasketItem,
  deleteOrderDetails,
  deleteOrder,
  deleteUser,
};

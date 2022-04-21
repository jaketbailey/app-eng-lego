/**
 * @file updateQueries.js
 * @author UP2002753
 * @description Contains all the UPDATE queries for the database.
 */

const Logger = require('../logger.js');
const db = require('./connectDb.js');

/**
 * @function updateUser
 * @memberof Database
 * @description Updates the user with new address and phone details.
 * @param {string} id - The ID of the user to update.
 * @param {string} address1 - Address line 1 to update.
 * @param {string} address2 - Address line 2 to update.
 * @param {string} city - City to update.
 * @param {string} country - Country to update.
 * @param {string} county - County to update.
 * @param {string} postcode - Postcode to update.
 * @param {string} phone - Phone number to update.
 */
const updateUser = async (id, address1, address2, city, country, county, postcode, phone) => {
  Logger.Database(`Updating address and phone of user with ID: ${id}`);
  await db.Pool.query(`UPDATE customers SET
    phone = '${phone}',
    address_line_1 = '${address1}',
    address_line_2 = '${address2}',
    city = '${city}',
    county = '${county}',
    postcode = '${postcode}',
    country = '${country}'
    WHERE id = '${id}'`);
  Logger.Database(`User updated with ID: ${id}`);
};

/**
 * @function updateStock
 * @memberof Database
 * @description Updates the store's stock levels
 * @param {number} id - The ID of the product to update.
 * @param {string} quantity - Amount to remove from stock.
 */
const updateStock = async (id, quantity) => {
  Logger.Express('/block/api/update-stock/', 'PUT');
  Logger.Database(`Removing ${quantity} to stock of product with ID: ${id}`);
  await db.Pool.query(`
    UPDATE products SET
      stock = stock - ${quantity}
    WHERE id = '${id}'`);
  Logger.Database(`Stock updated for product id: ${id}`);
};

/**
 * @function updateStock
 * @memberof Database
 * @description Updates the store's stock levels
 * @param {number} id - The ID of the product to update.
 * @param {string} quantity - Amount to add from stock.
 */
const addToStock = async (productId, quantity) => {
  Logger.Database(`Adding ${quantity} to stock of product with ID: ${productId}`);
  await db.Pool.query(`
    UPDATE products SET
      stock = stock + ${quantity}
    WHERE id = '${productId}'`);
  Logger.Database(`Stock updated for product id: ${productId}`);
};

/**
 * @function addTotalCost
 * @memberof Database
 * @description Updates the new total cost of an order.
 * @param {number} id - The ID of the order to update.
 * @param {string} total - New total basket amount.
 */
const addTotalCost = async (id, total) => {
  Logger.Database(`Adding total cost of order with ID: ${id}`);
  await db.Pool.query(`
    UPDATE orders SET
      total_cost = ${total}
    WHERE id = '${id}'`);
  Logger.Database(`Order total cost updated for order id: ${id}`);
};

/**
 * @function addShippingAddress
 * @memberof Database
 * @description Updates the shipping address of an order
 * @param {number} id - The ID of the order to update.
 * @param {string} address1 - Address line 1 to update.
 * @param {string} address2 - Address line 2 to update.
 * @param {string} city - City to update.
 * @param {string} county - County to update.
 * @param {string} postcode - Postcode to update.
 * @param {string} country - Country to update.
 */
const addShippingAddress = async (id, address1, address2, city, county, postcode, country) => {
  Logger.Database(`Adding shipping address to order with ID: ${id}`);
  await db.Pool.query(`
    UPDATE orders SET
      order_address = '${address1}, ${address2}, ${city}, ${county}, ${postcode}, ${country}'
    WHERE id = '${id}'`);
  Logger.Database(`Shipping address updated for order id: ${id}`);
};

/**
 * @function updateOrder
 * @memberof Database
 * @description Updates the status of an order.
 * @param {number} id - The ID of the order to update.
 * @param {string} status - New order status.
 */
const updateOrder = async (id, status) => {
  Logger.Database(`Updating order with ID: ${id} to status: ${status}`);
  await db.Pool.query(`
    UPDATE orders SET
      order_status = '${status}'
    WHERE id = '${id}'`);
  Logger.Database(`Order status updated to ${status} for order; ${id}`);
};

/**
 * @function updateOrderDetail
 * @memberof Database
 * @description Updates the status of an order.
 * @param {number} id - The ID of the order to update.
 * @param {number} productId - The ID of the product in which to update.
 *  * @param {number} price - The new total price of the item.
 * @param {string} quantity - New quantity of the item.
 */
const updateOrderDetail = (id, productId, price, quantity) => {
  Logger.Database(`Updating order detail with ID: ${id}`);
  db.Pool.query(`
    UPDATE order_details SET
      quantity = '${quantity}',
      price = '${price}'
    WHERE product_id = '${productId}' AND order_id = ${id}`);
  Logger.Database(`Order updated with orderId: ${id}, ProductId: ${productId}`);
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

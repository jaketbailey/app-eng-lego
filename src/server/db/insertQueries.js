/**
 * @file insertQueries.js
 * @author UP2002753
 * @description Contains all the INSERT queries for the database.
 */

const Logger = require('../logger.js');
const db = require('./connectDb.js');

/**
 * @function createUser
 * @memberof Database
 * @description Inserts a new user's details into the database.
 * @param {string} sub - The ID of the user to create.
 * @param {string} name - The name of the user to create.
 * @param {string} email - The email of the user to create.
 */
const createUser = async (sub, name, email) => {
  const names = name.split(' ');
  Logger.Database(`Creating user: ${sub}`);
  await db.Pool.query(`INSERT INTO customers (
      id, email, first_name, last_name, phone, address_line_1, address_line_2, city, county, postcode, country
    ) VALUES (
      '${sub}', '${email}', '${names[0]}', '${names[1]}', null, null, null, null, null, null, null
    ) ON CONFLICT (id) DO NOTHING`)
    .then(() => {
    })
    .catch((err) => {
      Logger.Error(err);
      throw err;
    });
  Logger.Database(`User added with ID: ${sub}`);
};

/**
 * @function createBasket
 * @memberof Database
 * @description Inserts a new user's basket/order into the database.
 * @param {string} customerId - The ID of the user to create to order for.
 * @param {string} email - The email to insert into the order.
 */
const createBasket = (customerId, email) => {
  const dateOb = new Date(Date.now());
  const date = dateOb.getDate();
  const month = dateOb.getMonth() + 1;
  const year = dateOb.getFullYear();
  const today = `${year}-${month}-${date}`;
  Logger.Database(`Creating basket for user: ${customerId}`);
  db.Pool.query(`
    INSERT INTO orders (
      total_cost, order_address, order_email, order_date, order_status, customer_id
    ) VALUES (
      0.00, null, '${email}', '${today}', 'pending', '${customerId}'
    )`)
    .catch((err) => {
      Logger.Error(err);
      throw err;
    });
  Logger.Database(`Basket added for user with ID: ${customerId}`);
};

/**
 * @function addToBasket
 * @memberof Database
 * @description Inserts a product into an order/basket in the database.
 * @param {string} id - The ID of the order to add the product to.
 * @param {string} productId - The ID of the product to add to the order.
 * @param {string} price - The price of the product to add to the order.
 * @param {string} quantity - The quantity of the product to add to the order.
 */
const addToBasket = (id, productId, price, quantity) => {
  Logger.Database(`Adding ${quantity} of product (${productId}) to basket (${id})`);
  db.Pool.query(`
    INSERT INTO order_details (
      price, quantity, order_id, product_id
    ) VALUES (
      '${price}', ${quantity}, '${id}', '${productId}'
    )`)
    .catch((err) => {
      Logger.Error(err);
      throw err;
    });
  Logger.Database(`Product added to basket with order id: ${id}`);
};

module.exports = {
  createUser,
  createBasket,
  addToBasket,
};

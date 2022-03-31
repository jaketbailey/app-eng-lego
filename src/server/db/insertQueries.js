const Logger = require('../logger.js');
const db = require('./connectDb.js');

const createUser = async (sub, name, email) => {
  const names = name.split(' ');
  Logger.Database(`Creating user: ${sub}`);
  await db.Pool.query(`INSERT INTO customers (
      id, email, first_name, last_name, phone, address_line_1, address_line_2, city, county, postcode, country
    ) VALUES (
      '${sub}', '${email}', '${names[0]}', '${names[1]}', null, null, null, null, null, null, null
    ) ON CONFLICT (id) DO NOTHING`)
    .catch((err) => {
      Logger.Error(err);
      throw err;
    });
  Logger.Info(`User added with ID: ${sub}`);
};

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
  Logger.Info(`Basket added for user with ID: ${customerId}`);
};

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
  Logger.Info(`Product added to basket with order id: ${id}`);
};

module.exports = {
  createUser,
  createBasket,
  addToBasket,
};

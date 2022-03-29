import * as Logger from '../logger.js';
import Pool from './connectDb.js';

export const createUser = (req, res) => {
  const { sub, name, email } = req.body;
  const names = name.split(' ');
  Logger.Express('/block/api/create-user/', 'POST');
  Logger.Database(`Creating user: ${sub}`);
  Pool.query(`INSERT INTO customers (
      id, email, first_name, last_name, phone, address_line_1, address_line_2, city, county, postcode, country
    ) VALUES (
      '${sub}', '${email}', '${names[0]}', '${names[1]}', null, null, null, null, null, null, null
    ) ON CONFLICT (id) DO NOTHING`, (err) => {
    if (err) {
      Logger.Error(err);
      throw err;
    }
    Logger.Info(`User added with ID: ${sub}`);
    res.status(201).send(`User added with ID: ${sub}`);
  });
};

export const createBasket = (req, res) => {
  const { customerId, email } = req.body;
  const dateOb = new Date(Date.now());
  const date = dateOb.getDate();
  const month = dateOb.getMonth() + 1;
  const year = dateOb.getFullYear();
  const today = `${year}-${month}-${date}`;
  Logger.Express('/block/api/create-basket/', 'POST');
  Logger.Database(`Creating basket for user: ${customerId}`);
  Pool.query(`
    INSERT INTO orders (
      total_cost, order_address, order_email, order_date, order_status, customer_id
    ) VALUES (
      0.00, null, '${email}', '${today}', 'pending', '${customerId}'
    )`, (err) => {
    if (err) {
      Logger.Error(err);
      throw err;
    }
    Logger.Info(`Basket added for user with ID: ${customerId}`);
    res.status(201).send('Basket created');
  });
};

export const addToBasket = (req, res) => {
  const { id, productId, price, quantity } = req.body;
  Logger.Express('/block/api/add-to-basket/', 'POST');
  Logger.Database(`Adding ${quantity} of product (${productId}) to basket (${id})`);
  Pool.query(`
    INSERT INTO order_details (
      price, quantity, order_id, product_id
    ) VALUES (
      '${price}', ${quantity}, '${id}', '${productId}'
    )`, (err) => {
    if (err) {
      Logger.Error(err);
      throw err;
    }
    Logger.Info(`Product added to basket with order id: ${id}`);
    res.status(201).send(`Product added to basket with order id: ${id}`);
  });
};

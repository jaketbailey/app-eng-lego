import * as Logger from '../logger.js';
import Pool from './connectDb.js';

export const updateUser = (req, res) => {
  const { id, address1, address2, city, country, county, postcode, phone } = req.body;
  Logger.Express('/block/api/update-user/', 'PUT');
  Logger.Database(`Updating address and phone of user with ID: ${id}`);
  Pool.query(`UPDATE customers SET
    phone = '${phone}',
    address_line_1 = '${address1}',
    address_line_2 = '${address2}',
    city = '${city}',
    county = '${county}',
    postcode = '${postcode}',
    country = '${country}'
    WHERE id = '${id}'`, (err) => {
    if (err) {
      Logger.Error(err);
      throw err;
    }
    Logger.Info(`User updated with ID: ${id}`);
    res.status(200).send(`User updated with ID: ${id}`);
  });
};

export const updateStock = (req, res) => {
  const { id, quantity } = req.body;
  Logger.Express('/block/api/update-stock/', 'PUT');
  Logger.Database(`Removing ${quantity} to stock of product with ID: ${id}`);
  Pool.query(`
    UPDATE products SET
      stock = stock - ${quantity}
    WHERE id = '${id}'`, (err) => {
    if (err) {
      Logger.Error(err);
      throw err;
    }
    Logger.Info(`Stock updated for product id: ${id}`);
    res.status(200).send(`Stock updated for product id: ${id}`);
  });
};

export const addToStock = (req, res) => {
  const { productId, quantity } = req.body;
  Logger.Express('/block/api/add-to-stock/', 'PUT');
  Logger.Database(`Adding ${quantity} to stock of product with ID: ${productId}`);
  Pool.query(`
    UPDATE products SET
      stock = stock + ${quantity}
    WHERE id = '${productId}'`, (err) => {
    if (err) {
      Logger.Error(err);
      throw err;
    }
    Logger.Info(`Stock updated for product id: ${productId}`);
    res.status(200).send(`Stock updated for product id: ${productId}`);
  });
};

export const addTotalCost = (req, res) => {
  const { id, total } = req.body;
  Logger.Express('/block/api/add-total-cost/', 'PUT');
  Logger.Database(`Adding total cost of order with ID: ${id}`);
  Pool.query(`
    UPDATE orders SET
      total_cost = ${total}
    WHERE id = '${id}'`, (err) => {
    if (err) {
      Logger.Error(err);
      throw err;
    }
    Logger.Info(`Order total cost updated for order id: ${id}`);
    res.status(200).send(`Order total cost updated for order id: ${id}`);
  });
};

export const addShippingAddress = (req, res) => {
  const { id, address1, address2, city, county, postcode, country } = req.body;
  Logger.Express('/block/api/add-shipping-address/', 'PUT');
  Logger.Database(`Adding shipping address to order with ID: ${id}`);
  Pool.query(`
    UPDATE orders SET
      order_address = '${address1}, ${address2}, ${city}, ${county}, ${postcode}, ${country}'
    WHERE id = '${id}'`, (err) => {
    if (err) {
      Logger.Error(err);
      throw err;
    }
    Logger.Info(`Shipping address updated for order id: ${id}`);
    res.status(200).send(`Shipping address updated with ID: ${id}`);
  });
};

export const updateOrder = (req, res) => {
  const { id, status } = req.body;
  Logger.Express('/block/api/update-order/', 'PUT');
  Logger.Database(`Updating order with ID: ${id} to status: ${status}`);
  Pool.query(`
    UPDATE orders SET
      order_status = '${status}'
    WHERE id = '${id}'`, (err) => {
    if (err) {
      Logger.Error(err);
      throw err;
    }
    Logger.Info(`Order status updated to ${status} for order; ${id}`);
    res.status(200).send(`Order status updated to ${status} for order; ${id}`);
  });
};

export const updateOrderDetail = (req, res) => {
  const { id, productId, price, quantity } = req.body;
  Logger.Express('/block/api/update-order-detail/', 'PUT');
  Logger.Database(`Updating order detail with ID: ${id}`);
  Pool.query(`
    UPDATE order_details SET
      quantity = '${quantity}',
      price = '${price}'
    WHERE product_id = '${productId}' AND order_id = ${id}`, (err) => {
    if (err) {
      Logger.Error(err);
      throw err;
    }
    Logger.Info(`Order updated with orderId: ${id}, ProductId: ${productId}`);
    res.status(200).send(`Order updated with orderId: ${id}, ProductId: ${productId}`);
  });
};

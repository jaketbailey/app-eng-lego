import Pool from './connectDb.js';
import * as Logger from '../logger.js';

export const removeBasketItem = (req, res) => {
  const { id } = req.body;
  Logger.Express('/block/api/remove-basket-item/', 'PUT');
  Logger.Database(`Removing basket item ${id}`);
  Pool.query(`
    DELETE FROM order_details
    WHERE id = '${id}'
    `, (err) => {
    if (err) {
      Logger.Error(err);
      throw err;
    }
    Logger.Info(`Product removed from basket with ID: ${id}`);
    res.status(200).send(`Product removed from basket with ID: ${id}`);
  });
};

export const deleteUser = (req, res) => {
  const { id, orderId } = req.body;
  Logger.Express('/block/api/delete-user/', 'PUT');
  Logger.Database(`Deleting user: ${id}`);
  Pool.query(`
    DELETE FROM order_details
    WHERE order_id = '${orderId}';
    
    DELETE FROM orders
    WHERE customer_id = '${id}';
    
    DELETE FROM customers
    WHERE id = '${id}';
    `, (err) => {
    if (err) {
      Logger.Error(err);
      throw err;
    }
    Logger.Info(`User deleted with ID: ${id}`);
    res.status(200).send(`User deleted with ID: ${id}`);
  });
};

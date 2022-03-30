const Logger = require('../logger.js');
const Pool = require('./connectDb.js');

const updateUser = async (id, address1, address2, city, country, county, postcode, phone) => {
  Logger.Database(`Updating address and phone of user with ID: ${id}`);
  await Pool.query(`UPDATE customers SET
    phone = '${phone}',
    address_line_1 = '${address1}',
    address_line_2 = '${address2}',
    city = '${city}',
    county = '${county}',
    postcode = '${postcode}',
    country = '${country}'
    WHERE id = '${id}'`)
    .catch((err) => {
      Logger.Error(err);
      throw err;
    });
  Logger.Info(`User updated with ID: ${id}`);
};

const updateStock = async (id, quantity) => {
  Logger.Express('/block/api/update-stock/', 'PUT');
  Logger.Database(`Removing ${quantity} to stock of product with ID: ${id}`);
  await Pool.query(`
    UPDATE products SET
      stock = stock - ${quantity}
    WHERE id = '${id}'`)
    .catch((err) => {
      Logger.Error(err);
      throw err;
    });
  Logger.Info(`Stock updated for product id: ${id}`);
};

const addToStock = async (productId, quantity) => {
  Logger.Database(`Adding ${quantity} to stock of product with ID: ${productId}`);
  await Pool.query(`
    UPDATE products SET
      stock = stock + ${quantity}
    WHERE id = '${productId}'`)
    .catch((err) => {
      Logger.Error(err);
      throw err;
    });
  Logger.Info(`Stock updated for product id: ${productId}`);
};

const addTotalCost = async (id, total) => {
  Logger.Database(`Adding total cost of order with ID: ${id}`);
  await Pool.query(`
    UPDATE orders SET
      total_cost = ${total}
    WHERE id = '${id}'`)
    .catch((err) => {
      Logger.Error(err);
      throw err;
    });
  Logger.Info(`Order total cost updated for order id: ${id}`);
};

const addShippingAddress = async (id, address1, address2, city, county, postcode, country) => {
  Logger.Database(`Adding shipping address to order with ID: ${id}`);
  await Pool.query(`
    UPDATE orders SET
      order_address = '${address1}, ${address2}, ${city}, ${county}, ${postcode}, ${country}'
    WHERE id = '${id}'`)
    .catch((err) => {
      Logger.Error(err);
      throw err;
    });
  Logger.Info(`Shipping address updated for order id: ${id}`);
};

const updateOrder = async (id, status) => {
  Logger.Database(`Updating order with ID: ${id} to status: ${status}`);
  await Pool.query(`
    UPDATE orders SET
      order_status = '${status}'
    WHERE id = '${id}'`)
    .catch((err) => {
      Logger.Error(err);
      throw err;
    });
  Logger.Info(`Order status updated to ${status} for order; ${id}`);
};

const updateOrderDetail = (id, productId, price, quantity) => {
  Logger.Database(`Updating order detail with ID: ${id}`);
  Pool.query(`
    UPDATE order_details SET
      quantity = '${quantity}',
      price = '${price}'
    WHERE product_id = '${productId}' AND order_id = ${id}`)
    .catch((err) => {
      Logger.Error(err);
      throw err;
    });
  Logger.Info(`Order updated with orderId: ${id}, ProductId: ${productId}`);
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

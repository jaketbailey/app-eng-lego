const pg = require('./connectDb');

const removeBasketItem = (req, res) => {
  const { id } = req.body;
  console.log(req.body);
  pg.Pool.query(`
    DELETE FROM order_details
    WHERE id = '${id}'
    `, (err) => {
    if (err) {
      throw err;
    }
    res.status(200).send(`Product removed from basket with ID: ${id}`);
  });
};

const deleteUser = (req, res) => {
  const { id, orderId } = req.body;
  console.log(req.body);
  pg.Pool.query(`
    DELETE FROM order_details
    WHERE order_id = '${orderId}';
    
    DELETE FROM orders
    WHERE customer_id = '${id}';
    
    DELETE FROM customers
    WHERE id = '${id}';
    `, (err) => {
    if (err) {
      throw err;
    }
    res.status(200).send(`User deleted with ID: ${id}`);
  });
};

module.exports = {
  removeBasketItem: removeBasketItem,
  deleteUser: deleteUser,
};

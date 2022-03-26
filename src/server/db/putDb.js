import Pool from './connectDb.js';

export const updateUser = (req, res) => {
  const { id, address1, address2, city, country, county, postcode, phone } = req.body;
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
      throw err;
    }
    res.status(200).send(`User updated with ID: ${id}`);
  });
};

export const updateStock = (req, res) => {
  const { id, quantity } = req.body;
  console.log(id);
  console.log(quantity);
  Pool.query(`
    UPDATE products SET
      stock = stock - ${quantity}
    WHERE id = '${id}'`, (err) => {
    if (err) {
      throw err;
    }
    res.status(200).send(`Product updated with ID: ${id}`);
  });
};

export const addToStock = (req, res) => {
  const { productId, quantity } = req.body;
  console.log(req.body);
  console.log('test');
  Pool.query(`
    UPDATE products SET
      stock = stock + ${quantity}
    WHERE id = '${productId}'`, (err) => {
    if (err) {
      throw err;
    }
    res.status(200).send(`Product updated with ID: ${productId}`);
  });
};

export const addTotalCost = (req, res) => {
  const { id, total } = req.body;
  console.log(req.body);
  Pool.query(`
    UPDATE orders SET
      total_cost = ${total}
    WHERE id = '${id}'`, (err) => {
    if (err) {
      throw err;
    }
    res.status(200).send(`Total cost updated with ID: ${id}`);
  });
};

export const addShippingAddress = (req, res) => {
  const { id, address1, address2, city, county, postcode, country } = req.body;
  console.log(req.body);
  Pool.query(`
    UPDATE orders SET
      order_address = '${address1}, ${address2}, ${city}, ${county}, ${postcode}, ${country}'
    WHERE id = '${id}'`, (err) => {
    if (err) {
      throw err;
    }
    res.status(200).send(`Shipping address updated with ID: ${id}`);
  });
};

export const updateOrder = (req, res) => {
  const { id, status } = req.body;
  console.log(req.body);
  Pool.query(`
    UPDATE orders SET
      order_status = '${status}'
    WHERE id = '${id}'`, (err) => {
    if (err) {
      throw err;
    }
    res.status(200).send(`Order updated with ID: ${id}`);
  });
};

export const updateOrderDetail = (req, res) => {
  const { id, productId, price, quantity } = req.body;
  console.log(req.body);
  console.log('why put here');
  Pool.query(`
    UPDATE order_details SET
      quantity = '${quantity}',
      price = '${price}'
    WHERE product_id = '${productId}' AND order_id = ${id}`, (err) => {
    if (err) {
      throw err;
    }
    res.status(200).send(`Order updated with orderId: ${id}, ProductId: ${productId}`);
  });
};

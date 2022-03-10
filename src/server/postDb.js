import Pool from './connectDb.js';

export const createUser = (req, res) => {
  const { sub, name, email } = req.body;
  console.log(req.body);
  const names = name.split(' ');
  console.log(names);
  Pool.query(`INSERT INTO customers (
      id, email, first_name, last_name, phone, address_line_1, address_line_2, city, county, postcode, country
    ) VALUES (
      '${sub}', '${email}', '${names[0]}', '${names[1]}', null, null, null, null, null, null, null
    ) ON CONFLICT (id) DO NOTHING`, (err) => {
    if (err) {
      throw err;
    }
    res.status(201).send(`User added with ID: ${sub}`);
  });
};

export const createBasket = (req, res) => {
  const { id, customerId, email } = req.body;
  console.log(req.body);
  const dateOb = new Date(Date.now());
  const date = dateOb.getDate();
  const month = dateOb.getMonth() + 1;
  const year = dateOb.getFullYear();
  const today = `${year}-${month}-${date}`;
  console.log(today);
  Pool.query(`
    INSERT INTO orders (
      id, total_cost, order_address, order_email, order_date, order_status, customer_id
    ) VALUES (
      '${id}', 0.00, null, '${email}', '${today}', 'pending', '${customerId}'
    )`, (err) => {
    if (err) {
      throw err;
    }
    res.status(201).send(`Basket created with ID: ${id}`);
  });
};

export const addToBasket = (req, res) => {
  const random = Math.floor(Math.random() * (10000000 - 100 + 1)) + 1;
  const { id, productId, price, quantity } = req.body;
  console.log(productId);
  console.log('this teste');
  Pool.query(`
    INSERT INTO order_details (
      id, price, quantity, order_id, product_id
    ) VALUES (
      '${random}', '${price}', ${quantity}, '${id}', '${productId}'
    )`, (err) => {
    if (err) {
      throw err;
    }
    res.status(201).send(`Product added to basket with ID: ${id}`);
  });
};

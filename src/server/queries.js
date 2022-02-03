const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'block_shop',
  password: 'Outdoor23',
  port: 5432,
});

const getAllProducts = (req, res) => {
  pool.query('SELECT * FROM products ORDER BY price DESC', (err, results) => {
    if (err) {
      throw err;
    }
    console.log(results);
    res.status(200).json(results.rows);
  });
};

const getProductById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!isNaN(id)) {
    pool.query('SELECT * FROM products WHERE id = $1', [id], (err, results) => {
      if (err) {
        throw err;
      }
      res.status(200).json(results.rows);
    });
  }
};

const getProductByFilter = (req, res) => {
  const filter = req.params.filter;
  console.log(filter);
  pool.query(`
  SELECT * 
  FROM products 
    JOIN product_colours ON product_colours.product_id = products.id 
    JOIN colours ON  product_colours.colour_id = colours.id 

  WHERE colours.colour_name = '${filter}' OR products.category LIKE '%${filter}%';
  `, (err, results) => {
    if (err) {
      throw err;
    }
    console.log(results);
    res.status(200).json(results.rows);
  });
};

const createUser = (req, res) => {
  const { sub, name, email } = req.body;
  console.log(req.body);
  const names = name.split(' ');
  console.log(names);
  pool.query(`INSERT INTO customers (
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

const updateUser = (req, res) => {
  const { id, address1, address2, city, country, county, postcode, phone } = req.body;
  pool.query(`UPDATE customers SET
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

const getUser = (req, res) => {
  const id = req.params.id;
  console.log(req.params);
  pool.query(`
    SELECT
      phone,
      address_line_1,
      address_line_2,
      city,
      county,
      postcode,
      country
    FROM 
      customers 
    WHERE id = '${id}'`, (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
};

const getPreviousOrder = (req, res) => {
  console.log(req.params);
  pool.query(`
    SELECT
      id
    FROM
      orders
    ORDER BY order_date DESC
    LIMIT 1
    `, (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
};

const checkExists = (req, res) => {
  const id = req.params.id;
  pool.query(`
    SELECT * FROM orders WHERE customer_id = '${id}' AND order_status = 'pending'
    `, (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
};

const createBasket = (req, res) => {
  const { id, customerId, email } = req.body;
  console.log(req.body);
  const dateOb = new Date(Date.now());
  const date = dateOb.getDate();
  const month = dateOb.getMonth() + 1;
  const year = dateOb.getFullYear();
  const today = `${year}-${month}-${date}`;
  console.log(today);
  pool.query(`
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

const addToBasket = (req, res) => {
  const random = Math.floor(Math.random() * (10000000 - 100 + 1)) + 1;
  const { id, productId, price } = req.body;
  console.log(productId);
  pool.query(`
    INSERT INTO order_details (
      id, price, quantity, order_id, product_id
    ) VALUES (
      '${random}', '${price}', 1, '${id}', '${productId}'
    )`, (err) => {
    if (err) {
      throw err;
    }
    res.status(201).send(`Product added to basket with ID: ${id}`);
  });
};

const updateStock = (req, res) => {
  const { id, quantity } = req.body;
  console.log(id);
  console.log(quantity);
  pool.query(`
    UPDATE products SET
      stock = stock - ${quantity}
    WHERE id = '${id}'`, (err) => {
    if (err) {
      throw err;
    }
    res.status(200).send(`Product updated with ID: ${id}`);
  });
};

const getBasketItems = (req, res) => {
  const id = req.params.id;
  console.log(req.params);
  pool.query(`
    SELECT
      *
    FROM
      order_details
    WHERE order_id = '${id}'
    `, (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
};

const removeBasketItem = (req, res) => {
  const { id } = req.body;
  console.log(req.body);
  pool.query(`
    DELETE FROM order_details
    WHERE id = '${id}'
    `, (err) => {
    if (err) {
      throw err;
    }
    res.status(200).send(`Product removed from basket with ID: ${id}`);
  });
};

const addToStock = (req, res) => {
  const { productId, quantity } = req.body;
  console.log(req.body);
  console.log('test');
  pool.query(`
    UPDATE products SET
      stock = stock + ${quantity}
    WHERE id = '${productId}'`, (err) => {
    if (err) {
      throw err;
    }
    res.status(200).send(`Product updated with ID: ${productId}`);
  });
};

const getStock = (req, res) => {
  const id = req.params.id;
  console.log(req.params);
  pool.query(`
    SELECT
      stock
    FROM
      products
    WHERE id = '${id}'
    `, (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
};

module.exports = {
  getAllProducts: getAllProducts,
  getProductById: getProductById,
  getProductByFilter: getProductByFilter,
  createUser: createUser,
  updateUser: updateUser,
  getUser: getUser,
  getPreviousOrder: getPreviousOrder,
  checkExists: checkExists,
  createBasket: createBasket,
  addToBasket: addToBasket,
  updateStock: updateStock,
  getBasketItems: getBasketItems,
  removeBasketItem: removeBasketItem,
  addToStock: addToStock,
  getStock: getStock,
};

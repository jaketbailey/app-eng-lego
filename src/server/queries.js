const { Pool } = require('pg');
const fs = require('fs');
const dbConfig = JSON.parse(fs.readFileSync('./db/config.json', 'utf8'));
console.log(dbConfig);
const pool = new Pool({
  user: dbConfig.user,
  host: dbConfig.host,
  database: 'block_shop',
  password: 'Outdoor23',
  port: dbConfig.port,
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
    ORDER BY id DESC
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
  const { id, productId, price, quantity } = req.body;
  console.log(productId);
  pool.query(`
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

const addTotalCost = (req, res) => {
  const { id, total } = req.body;
  console.log(req.body);
  pool.query(`
    UPDATE orders SET
      total_cost = ${total}
    WHERE id = '${id}'`, (err) => {
    if (err) {
      throw err;
    }
    res.status(200).send(`Total cost updated with ID: ${id}`);
  });
};

const getTotalCost = (req, res) => {
  const id = req.params.id;
  console.log(req.params);
  pool.query(`
    SELECT
      total_cost
    FROM
      orders
    WHERE id = '${id}'
    `, (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
};

const addShippingAddress = (req, res) => {
  const { id, address1, address2, city, county, postcode, country } = req.body;
  console.log(req.body);
  pool.query(`
    UPDATE orders SET
      order_address = '${address1}, ${address2}, ${city}, ${county}, ${postcode}, ${country}'
    WHERE id = '${id}'`, (err) => {
    if (err) {
      throw err;
    }
    res.status(200).send(`Shipping address updated with ID: ${id}`);
  });
};

const getUserName = (req, res) => {
  const id = req.params.id;
  console.log(req.params);
  pool.query(`
    SELECT
      first_name,
      last_name,
      email,
      phone
    FROM
      customers
    WHERE id = '${id}'
    `, (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
};

const updateOrder = (req, res) => {
  const { id, status } = req.body;
  console.log(req.body);
  pool.query(`
    UPDATE orders SET
      order_status = '${status}'
    WHERE id = '${id}'`, (err) => {
    if (err) {
      throw err;
    }
    res.status(200).send(`Order updated with ID: ${id}`);
  });
};

const getProductByFilter = (req, res) => {
  const { filter } = req.params;
  const newFilter = filter.split('_');
  const types = ['brick', 'plate', '1x2', '1x8', '2x2', '2x4', '4x8'];
  let check = false;
  let type;
  for (let i = 0; i < types.length; i++) {
    if (newFilter.indexOf(types[i]) > -1) {
      if (newFilter.length === 1) {
        check = false;
      } else {
        check = true;
        type = newFilter.at(-1);
        newFilter.pop();
        break;
      }
    } else {
      check = false;
    }
  }
  const finalResults = [];
  if (check === true) {
    for (let i = 0; i < newFilter.length; i++) {
      pool.query(`
        SELECT
          *
        FROM
          products
          JOIN product_colours ON product_colours.product_id = products.id 
          JOIN colours ON  product_colours.colour_id = colours.colour_id 
        WHERE 
          colours.colour_name = '${newFilter[i]}'
        AND 
          category LIKE '%${type}%'
        `, (err, results) => {
        if (err) {
          throw err;
        }
        for (let j = 0; j < results.rows.length; j++) {
          finalResults.push(results.rows[j]);
        }
        if (i === newFilter.length - 1) {
          res.status(200).json(finalResults);
        }
      });
    }
  } else {
    for (let i = 0; i < newFilter.length; i++) {
      console.log('heman');
      pool.query(`
      SELECT 
        id,
        product_name,
        price,
        product_desc,
        image_ref,
        category,
        stock 
      FROM products 
        JOIN product_colours ON product_colours.product_id = products.id 
        JOIN colours ON  product_colours.colour_id = colours.colour_id 
    
      WHERE colours.colour_name = '${newFilter[i]}' OR products.category LIKE '%${newFilter[i]}%';
      `, (err, results) => {
        if (err) {
          throw err;
        }
        for (let j = 0; j < results.rows.length; j++) {
          finalResults.push(results.rows[j]);
        }
        if (i === newFilter.length - 1) {
          res.status(200).json(finalResults);
        }
      });
    }
    console.log('end fo loop');
  }
};

const getBasketId = (req, res) => {
  const id = req.params.id;
  pool.query(`
  SELECT id
  FROM orders
  WHERE customer_id = '${id}'
  `, (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
};

const deleteUser = (req, res) => {
  const { id, orderId } = req.body;
  console.log(req.body);
  pool.query(`
    DELETE FROM customers
    WHERE id = '${id}';
    
    DELETE FROM orders
    WHERE customer_id = '${id}';

    DELETE FROM order_details
    WHERE order_id = '${orderId}';
    `, (err) => {
    if (err) {
      throw err;
    }
    res.status(200).send(`User deleted with ID: ${id}`);
  });
};

module.exports = {
  getAllProducts: getAllProducts,
  getProductById: getProductById,
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
  addTotalCost: addTotalCost,
  getTotalCost: getTotalCost,
  addShippingAddress: addShippingAddress,
  getUserName: getUserName,
  updateOrder: updateOrder,
  getProductByFilter: getProductByFilter,
  getBasketId: getBasketId,
  deleteUser: deleteUser,
};

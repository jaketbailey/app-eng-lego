const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'block_shop',
  password: 'Outdoor23',
  port: 5432,
});

const getAllProducts = (req, res) => {
  pool.query('SELECT * FROM products', (err, results) => {
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

module.exports = {
  getAllProducts: getAllProducts,
  getProductById: getProductById,
  getProductByFilter: getProductByFilter,
  createUser: createUser,
  updateUser: updateUser,
  getUser: getUser,
};

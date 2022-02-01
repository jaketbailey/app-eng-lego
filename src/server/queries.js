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
  const colour = req.params.filter;
  console.log(colour);
  pool.query(`
  SELECT * 
  FROM products 
    JOIN product_colours ON product_colours.product_id = products.id 
    JOIN colours ON  product_colours.colour_id = colours.id 

  WHERE colours.colour_name = '${colour}';
  `, (err, results) => {
    if (err) {
      throw err;
    }
    console.log(results);
    res.status(200).json(results.rows);
  });
};

module.exports = {
  getAllProducts: getAllProducts,
  getProductById: getProductById,
  getProductByFilter: getProductByFilter,
};

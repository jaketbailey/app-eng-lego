const Pool = require('./connectDb.js');
const Logger = require('../logger.js');

const getAllProducts = (req, res) => {
  Logger.Express('/block/api/shop/all', 'GET');
  Logger.Database('Getting all products');
  Pool.query('SELECT * FROM products ORDER BY price DESC', (err, results) => {
    if (err) {
      Logger.Error(err);
      throw err;
    }
    res.status(200).json(results.rows);
  });
};

const getProductById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  Logger.Express(`/block/api/shop/item/${id}`, 'GET');
  Logger.Database(`Getting product with ID: ${id}`);
  if (!isNaN(id)) {
    Pool.query('SELECT * FROM products WHERE id = $1', [id], (err, results) => {
      if (err) {
        Logger.Error(err);
        throw err;
      }
      res.status(200).json(results.rows);
    });
  }
};

const getUser = (req, res) => {
  const id = req.params.id;
  Logger.Express(`/block/api/get-user/${id}`, 'GET');
  Logger.Database(`Getting user with ID: ${id}`);
  Pool.query(`
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
      Logger.Error(err);
      throw err;
    }
    res.status(200).json(results.rows);
    return results.rows;
  });
};

const checkExists = (req, res) => {
  const id = req.params.id;
  Logger.Express(`/block/api/check-exists/${id}`, 'GET');
  Logger.Database(`Checking if order with customer ID: ${id} exists`);
  Pool.query(`
    SELECT * FROM orders WHERE customer_id = '${id}' AND order_status = 'pending'
    `, (err, results) => {
    if (err) {
      Logger.Error(err);
      throw err;
    }
    res.status(200).json(results.rows);
  });
};

const getBasketItems = (req, res) => {
  const id = req.params.id;
  Logger.Express(`/block/api/get-basket-items/${id}`, 'GET');
  Logger.Database(`Getting basket items for user with ID: ${id}`);
  Pool.query(`
    SELECT
      *
    FROM
      order_details
    WHERE order_id = '${id}'
    `, (err, results) => {
    if (err) {
      Logger.Error(err);
      throw err;
    }
    res.status(200).json(results.rows);
  });
};

const getStock = (req, res) => {
  const id = req.params.id;
  Logger.Express(`/block/api/get-stock/${id}`, 'GET');
  Logger.Database(`Getting stock for product with ID: ${id}`);
  Pool.query(`
    SELECT
      stock
    FROM
      products
    WHERE id = '${id}'
    `, (err, results) => {
    if (err) {
      Logger.Error(err);
      throw err;
    }
    res.status(200).json(results.rows);
  });
};

const getTotalCost = (req, res) => {
  const id = req.params.id;
  Logger.Express(`/block/api/get-total-cost/${id}`, 'GET');
  Logger.Database(`Getting total cost for order with ID: ${id}`);
  Pool.query(`
    SELECT
      total_cost
    FROM
      orders
    WHERE id = '${id}'
    `, (err, results) => {
    if (err) {
      Logger.Error(err);
      throw err;
    }
    res.status(200).json(results.rows);
  });
};

const getUserName = (req, res) => {
  const id = req.params.id;
  Logger.Express(`/block/api/get-user-name/${id}`, 'GET');
  Logger.Database(`Getting user name for order with ID: ${id}`);
  Pool.query(`
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
      Logger.Error(err);
      throw err;
    }
    res.status(200).json(results.rows);
  });
};

const getBasketId = (req, res) => {
  const id = req.params.id;
  Logger.Express(`/block/api/get-basket/${id}`, 'GET');
  Logger.Database(`Getting basket ID for customer with ID: ${id}`);
  Pool.query(`
  SELECT id
  FROM orders
  WHERE customer_id = '${id}'
  `, (err, results) => {
    if (err) {
      Logger.Error(err);
      throw err;
    }
    res.status(200).json(results.rows);
  });
};


const getProductByFilter = (req, res) => {
  const { filter } = req.params;
  Logger.Express(`/block/api/type-filters/${filter}`, 'GET');
  Logger.Database(`Getting products with filter: ${filter}`);
  const newFilter = filter.split('_');
  const types = ['brick', 'plate', '1x2', '1x8', '2x2', '2x4', '4x8'];
  let check = false;
  let type;
  Logger.Info('Creating temporary filter array');
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
      Pool.query(`
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
          Logger.Info('Sending colour filter results');
          res.status(200).json(finalResults);
        }
      });
    }
  } else {
    for (let i = 0; i < newFilter.length; i++) {
      Pool.query(`
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
          Logger.Error(err);
          throw err;
        }
        for (let j = 0; j < results.rows.length; j++) {
          finalResults.push(results.rows[j]);
        }
        if (i === newFilter.length - 1) {
          Logger.Info('Returning filter results');
          res.status(200).json(finalResults);
        }
      });
    }
  }
};

const checkOrderDetail = (req, res) => {
  const id = req.params.id;
  Logger.Express(`/block/api/check-order-detail/${id}`, 'GET');
  Logger.Database(`Checking if quantity for a product with ID: ${id} exists`);
  const productId = id.split('-')[0];
  const orderId = id.split('-')[1];
  Pool.query(`
    SELECT
      quantity
    FROM
      order_details
    WHERE product_id = '${productId}' AND order_id = '${orderId}'
    `, (err, results) => {
    if (err) {
      Logger.Error(err);
      throw err;
    }
    Logger.Info('Returning product quantity results');
    res.status(200).json(results.rows);
  });
};

const searchProduct = (req, res) => {
  let search = req.params.search;
  Logger.Express(`/block/api/search-product/${search}`, 'GET');
  if (search.includes('_')) {
    search = search.replace('_', ' ');
  }
  Logger.Database(`Searching for product similarities to: ${search}`);
  Pool.query(`
    SELECT
      *
    FROM
      products
      JOIN product_colours ON product_colours.product_id = products.id 
      JOIN colours ON  product_colours.colour_id = colours.colour_id 
    WHERE 
      UPPER(product_name) LIKE UPPER('%${search}%')
      OR
      UPPER(product_desc) LIKE UPPER('%${search}%')
      OR
      UPPER(category) LIKE UPPER('%${search}%')
      OR
      UPPER(image_ref) LIKE UPPER('%${search}%')
      OR
      UPPER(colours.colour_name) LIKE UPPER('%${search}%')
    `, (err, results) => {
    if (err) {
      Logger.Error(err);
      throw err;
    }
    Logger.Info('Returning search results');
    res.status(200).json(results.rows);
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  getUser,
  checkExists,
  getBasketItems,
  getStock,
  getTotalCost,
  getUserName,
  getBasketId,
  getProductByFilter,
  checkOrderDetail,
  searchProduct,
};

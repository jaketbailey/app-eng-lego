import Pool from './connectDb.js';

export const getAllProducts = (req, res) => {
  Pool.query('SELECT * FROM products ORDER BY price DESC', (err, results) => {
    if (err) {
      throw err;
    }
    console.log(results);
    res.status(200).json(results.rows);
  });
};

export const getProductById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!isNaN(id)) {
    Pool.query('SELECT * FROM products WHERE id = $1', [id], (err, results) => {
      if (err) {
        throw err;
      }
      res.status(200).json(results.rows);
    });
  }
};

export const getUser = (req, res) => {
  const id = req.params.id;
  console.log(req.params);
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
      throw err;
    }
    res.status(200).json(results.rows);
  });
};

export const getPreviousOrder = (req, res) => {
  console.log(req.params);
  Pool.query(`
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

export const checkExists = (req, res) => {
  const id = req.params.id;
  Pool.query(`
    SELECT * FROM orders WHERE customer_id = '${id}' AND order_status = 'pending'
    `, (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
};

export const getBasketItems = (req, res) => {
  const id = req.params.id;
  console.log(req.params);
  Pool.query(`
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

export const getStock = (req, res) => {
  const id = req.params.id;
  console.log(req.params);
  Pool.query(`
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

export const getTotalCost = (req, res) => {
  const id = req.params.id;
  console.log(req.params);
  Pool.query(`
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

export const getUserName = (req, res) => {
  const id = req.params.id;
  console.log(req.params);
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
      throw err;
    }
    res.status(200).json(results.rows);
  });
};

export const getBasketId = (req, res) => {
  const id = req.params.id;
  Pool.query(`
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


export const getProductByFilter = (req, res) => {
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
          res.status(200).json(finalResults);
        }
      });
    }
  } else {
    for (let i = 0; i < newFilter.length; i++) {
      console.log('heman');
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

export const checkOrderDetail = (req, res) => {
  const id = req.params.id;
  const productId = id.split('-')[0];
  const orderId = id.split('-')[1];
  console.log(req.params);
  console.log(`check details ${productId} ${orderId}`);
  Pool.query(`
    SELECT
      quantity
    FROM
      order_details
    WHERE product_id = '${productId}' AND order_id = '${orderId}'
    `, (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
};

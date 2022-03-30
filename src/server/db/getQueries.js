const Pool = require('./connectDb.js');
const Logger = require('../logger.js');

const getAllProducts = async () => {
  Logger.Database('Getting all products');
  const data = [];
  await Pool.query('SELECT * FROM products ORDER BY price DESC')
    .then((results) => {
      for (const item of results.rows) {
        data.push(item);
      }
    })
    .catch((err) => {
      Logger.Error(err);
      throw err;
    });
  return data;
};

const getProductById = async (id) => {
  id = parseInt(id, 10);
  Logger.Database(`Getting product with ID: ${id}`);
  const data = [];
  if (!isNaN(id)) {
    await Pool.query('SELECT * FROM products WHERE id = $1', [id])
      .then((results) => {
        for (const item of results.rows) {
          data.push(item);
        }
      })
      .catch((err) => {
        Logger.Error(err);
        throw err;
      });
    return data;
  }
};

const getUser = async (id) => {
  Logger.Database(`Getting user with ID: ${id}`);
  const data = [];
  await Pool.query(`
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
    WHERE id = '${id}'`)
    .then((results) => {
      for (const item of results.rows) {
        data.push(item);
      }
    })
    .catch((err) => {
      Logger.Error(err);
      throw err;
    });
  return data;
};

const checkExists = async (id) => {
  Logger.Database(`Checking if order with customer ID: ${id} exists`);
  const data = [];
  await Pool.query(`
    SELECT * FROM orders WHERE customer_id = '${id}' AND order_status = 'pending'
    `)
    .then((results) => {
      for (const item of results.rows) {
        data.push(item);
      }
    })
    .catch((err) => {
      Logger.Error(err);
      throw err;
    });
  return data;
};

const getBasketItems = async (id) => {
  Logger.Database(`Getting basket items for user with ID: ${id}`);
  const data = [];
  await Pool.query(`
    SELECT
      *
    FROM
      order_details
    WHERE order_id = '${id}'
    `)
    .then((results) => {
      for (const item of results.rows) {
        data.push(item);
      }
    })
    .catch((err) => {
      Logger.Error(err);
      throw err;
    });
  return data;
};

const getStock = async (id) => {
  Logger.Database(`Getting stock for product with ID: ${id}`);
  const data = [];
  await Pool.query(`
    SELECT
      stock
    FROM
      products
    WHERE id = '${id}'
    `)
    .then((results) => {
      for (const item of results.rows) {
        data.push(item);
      }
    })
    .catch((err) => {
      Logger.Error(err);
      throw err;
    });
  return data;
};

const getTotalCost = async (id) => {
  Logger.Database(`Getting total cost for order with ID: ${id}`);
  const data = [];
  await Pool.query(`
    SELECT
      total_cost
    FROM
      orders
    WHERE id = '${id}'
    `)
    .then((results) => {
      for (const item of results.rows) {
        data.push(item);
      }
    })
    .catch((err) => {
      Logger.Error(err);
      throw err;
    });
  return data;
};

const getUserName = async (id) => {
  Logger.Database(`Getting user name for order with ID: ${id}`);
  const data = [];
  await Pool.query(`
    SELECT
      first_name,
      last_name,
      email,
      phone
    FROM
      customers
    WHERE id = '${id}'
    `)
    .then((results) => {
      for (const item of results.rows) {
        data.push(item);
      }
    })
    .catch((err) => {
      Logger.Error(err);
      throw err;
    });
  return data;
};

const getBasketId = async (id) => {
  Logger.Database(`Getting basket ID for customer with ID: ${id}`);
  const data = [];
  await Pool.query(`
    SELECT id
    FROM orders
    WHERE customer_id = '${id}'
  `)
    .then((results) => {
      for (const item of results.rows) {
        data.push(item);
      }
    })
    .catch((err) => {
      Logger.Error(err);
      throw err;
    });
  return data;
};


const getProductByFilter = async (filter) => {
  Logger.Database(`Getting products with filter: ${filter}`);
  let data;
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
      data = await Pool.query(`
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
        `)
        .then((results) => {
          for (let j = 0; j < results.rows.length; j++) {
            finalResults.push(results.rows[j]);
          }
          if (i === newFilter.length - 1) {
            Logger.Info('Sending colour filter results');
            return finalResults;
          }
        })
        .catch((err) => {
          Logger.Error(err);
          throw err;
        });
    }
  } else {
    for (let i = 0; i < newFilter.length; i++) {
      data = await Pool.query(`
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
      `)
        .then((results) => {
          for (let j = 0; j < results.rows.length; j++) {
            finalResults.push(results.rows[j]);
          }
          if (i === newFilter.length - 1) {
            Logger.Info('Returning filter results');
            return finalResults;
          }
        })
        .catch((err) => {
          Logger.Error(err);
          throw err;
        });
    }
  }
  return data;
};

const checkOrderDetail = async (id) => {
  Logger.Database(`Checking if quantity for a product with ID: ${id} exists`);
  const data = [];
  const productId = id.split('-')[0];
  const orderId = id.split('-')[1];
  await Pool.query(`
    SELECT
      quantity
    FROM
      order_details
    WHERE product_id = '${productId}' AND order_id = '${orderId}'
    `)
    .then((results) => {
      for (const item of results.rows) {
        data.push(item);
      }
    })
    .catch((err) => {
      Logger.Error(err);
      throw err;
    });
  return data;
};

const searchProduct = (search) => {
  if (search.includes('_')) {
    search = search.replace('_', ' ');
  }
  Logger.Database(`Searching for product similarities to: ${search}`);
  const data = [];
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
    `)
    .then((results) => {
      for (const item of results.rows) {
        data.push(item);
      }
    })
    .catch((err) => {
      Logger.Error(err);
      throw err;
    });
  return data;
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

/**
 * @file getQueries.js
 * @author UP2002753
 * @description Contains all the SELECT queries for the database.
 */

const db = require('./connectDb.js');
const Logger = require('../logger.js');

/**
 * @function getAllProducts
 * @memberof Database
 * @description Gets all products from the database.
 * @returns {Promise<Array>} - Returns an array of all the products in the database.
 */
const getAllProducts = async () => {
  Logger.Database('Getting all products');
  const data = [];
  await db.Pool.query('SELECT * FROM products ORDER BY price DESC')
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

/**
 * @function getProductById
 * @memberof Database
 * @description Gets a product from the database.
 * @param {number} id - The ID of the product to be retrieved.
 * @returns {Promise<Array>} - Returns an array of the products requested in the database.
 */
const getProductById = async (id) => {
  id = parseInt(id, 10);
  Logger.Database(`Getting product with ID: ${id}`);
  const data = [];
  if (!isNaN(id)) {
    await db.Pool.query('SELECT * FROM products WHERE id = $1', [id])
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

/**
 * @function getUser
 * @memberof Database
 * @description Gets user address and phone number detail.
 * @param {string} id - The ID of the user to be retrieved.
 * @returns {Promise<Array>} - Returns an array of the products requested in the database.
 */
const getUser = async (id) => {
  Logger.Database(`Getting user with ID: ${id}`);
  const data = [];
  await db.Pool.query(`
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

/**
 * @function checkExists
 * @memberof Database
 * @description Checks whether a database exists for a user which is pending i.e. current order.
 * @param {number} id - The ID of the customer who's order is to be retrieved.
 * @returns {Promise<Array>} - Returns an array of the products requested in the database.
 */
const checkExists = async (id) => {
  Logger.Database(`Checking if order with customer ID: ${id} exists`);
  const data = [];
  await db.Pool.query(`
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

/**
 * @function getBasketItems
 * @memberof Database
 * @description Getting all items within a certain basket/order.
 * @param {number} id - The ID of the order/basket to retrieve the items within.
 * @returns {Promise<Array>} - Returns an array of the products requested in the database.
 */
const getBasketItems = async (id) => {
  Logger.Database(`Getting basket items for user with ID: ${id}`);
  const data = [];
  await db.Pool.query(`
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

/**
 * @function getProductById
 * @memberof Database
 * @description Gets a product from the database.
 * @param {number} id - The ID of the product to be retrieved.
 * @returns {Promise<Array>} - Returns an array of the products requested in the database.
 */
const getStock = async (id) => {
  Logger.Database(`Getting stock for product with ID: ${id}`);
  const data = [];
  await db.Pool.query(`
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

/**
 * @function getTotalCost
 * @memberof Database
 * @description Gets the total cost of a specific order.
 * @param {number} id - The ID of the order to be retrieved.
 * @returns {Promise<Array>} - Returns an array of the products requested in the database.
 */
const getTotalCost = async (id) => {
  Logger.Database(`Getting total cost for order with ID: ${id}`);
  const data = [];
  await db.Pool.query(`
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

/**
 * @function getUserName
 * @memberof Database
 * @description Gets the user's name, email and phone details from the database.
 * @param {number} id - The ID of the user to be retrieved.
 * @returns {Promise<Array>} - Returns an array of the products requested in the database.
 */
const getUserName = async (id) => {
  Logger.Database(`Getting user name for order with ID: ${id}`);
  const data = [];
  await db.Pool.query(`
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

/**
 * @function getBasketId
 * @memberof Database
 * @description Gets the id of a basket for a certain user/customer.
 * @param {number} id - The ID of the customer who's order is to be retrieved.
 * @returns {Promise<Array>} - Returns an array of the products requested in the database.
 */
const getBasketId = async (id) => {
  Logger.Database(`Getting basket ID for customer with ID: ${id}`);
  const data = [];
  await db.Pool.query(`
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

/**
 * @function getProductByFilter
 * @memberof Database
 * @description Gets all products from the database based on the filter criteria.
 * @param {string} filter - The filter parameters for the query.
 * @returns {Promise<Array>} - Returns an array of the products requested in the database.
 */
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
      /** Query for multiple colours selected */
      data = await db.Pool.query(`
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
            Logger.Database('Sending colour filter results');
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
      /** Query for colour or category */
      data = await db.Pool.query(`
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
            Logger.Database('Returning filter results');
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

/**
 * @function checkOrderDetail
 * @memberof Database
 * @description Checks whether an item already exists in the basket (to increase quantity or add new item).
 * @param {number} id - The ID of the product to be retrieved from the order.
 * @returns {Promise<Array>} - Returns an array of the products requested in the database.
 */
const checkOrderDetail = async (id) => {
  Logger.Database(`Checking if quantity for a product with ID: ${id} exists`);
  const data = [];
  const productId = id.split('-')[0];
  const orderId = id.split('-')[1];
  await db.Pool.query(`
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

/**
 * @function searchProduct
 * @memberof Database
 * @description Gets products in the database based on the search criteria.
 * @param {string} search - The search paramters for the query.
 * @returns {Promise<Array>} - Returns an array of the products requested in the database.
 */
const searchProduct = async (search) => {
  if (search.includes('_')) {
    search = search.replace('_', ' ');
  }
  Logger.Database(`Searching for product similarities to: ${search}`);
  const data = [];
  await db.Pool.query(`
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

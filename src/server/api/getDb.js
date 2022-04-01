/**
 * @file getDb.js
 * @author UP2002753
 * @description Get Api Endpoints
 */

const Logger = require('../logger.js');
const Query = require('../db/getQueries.js');

/**
 * @function getAllProducts
 * @description API endpoint to get all products.
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @memberof Api
 */
const getAllProducts = (req, res) => {
  Logger.Express('/block/api/shop/all', 'GET');
  Query.getAllProducts()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      Logger.Error(err);
      throw err;
    });
};

/**
 * @function getProductById
 * @description API endpoint to get a product by its id.
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @memberof Api
 */
const getProductById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  Logger.Express(`/block/api/shop/item/${id}`, 'GET');
  Query.getProductById(id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      Logger.Error(err);
      throw err;
    });
};

/**
 * @function getUser
 * @description API endpoint to get a user's details.
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @memberof Api
 */
const getUser = (req, res) => {
  const id = req.params.id;
  Logger.Express(`/block/api/get-user/${id}`, 'GET');
  Query.getUser(id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      Logger.Error(err);
      throw err;
    });
};

/**
 * @function checkExists
 * @description API endpoint to check an order exists.
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @memberof Api
 */
const checkExists = (req, res) => {
  const id = req.params.id;
  Logger.Express(`/block/api/check-exists/${id}`, 'GET');
  Query.checkExists(id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      Logger.Error(err);
      throw err;
    });
};

/**
 * @function getBasketItems
 * @description API endpoint to get all items in a basket.
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @memberof Api
 */
const getBasketItems = (req, res) => {
  const id = req.params.id;
  Logger.Express(`/block/api/get-basket-items/${id}`, 'GET');
  Logger.Database(`Getting basket items for user with ID: ${id}`);
  Query.getBasketItems(id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      Logger.Error(err);
      throw err;
    });
};

/**
 * @function getStock
 * @description API endpoint to get the stock of a product.
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @memberof Api
 */
const getStock = (req, res) => {
  const id = req.params.id;
  Logger.Express(`/block/api/get-stock/${id}`, 'GET');
  Query.getStock(id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      Logger.Error(err);
      throw err;
    });
};

/**
 * @function getTotalCost
 * @description API endpoint to get the total order cost.
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @memberof Api
 */
const getTotalCost = (req, res) => {
  const id = req.params.id;
  Logger.Express(`/block/api/get-total-cost/${id}`, 'GET');
  Query.getTotalCost(id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      Logger.Error(err);
      throw err;
    });
};

/**
 * @function getUserName
 * @description API endpoint to get the name details of a user.
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @memberof Api
 */
const getUserName = (req, res) => {
  const id = req.params.id;
  Logger.Express(`/block/api/get-user-name/${id}`, 'GET');
  Query.getUserName(id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      Logger.Error(err);
      throw err;
    })
    .catch(err => {
      Logger.Error(err);
      throw err;
    });
};

/**
 * @function getBasketId
 * @description API endpoint to get the Id for a specific basket.
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @memberof Api
 */
const getBasketId = (req, res) => {
  const id = req.params.id;
  Logger.Express(`/block/api/get-basket/${id}`, 'GET');
  Query.getBasketId(id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      Logger.Error(err);
      throw err;
    });
};

/**
 * @function getProductByFilter
 * @description API endpoint to get a product based on the filter.
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @memberof Api
 */
const getProductByFilter = (req, res) => {
  const { filter } = req.params;
  Logger.Express(`/block/api/type-filters/${filter}`, 'GET');
  Query.getProductByFilter(filter)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      Logger.Error(err);
      throw err;
    });
};

/**
 * @function checkOrderDetail
 * @description API endpoint to check an order detail exists.
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @memberof Api
 */
const checkOrderDetail = (req, res) => {
  const id = req.params.id;
  Logger.Express(`/block/api/check-order-detail/${id}`, 'GET');
  Query.checkOrderDetail(id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      Logger.Error(err);
      throw err;
    });
};

/**
 * @function searchProduct
 * @description API endpoint to get products based on a search.
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @memberof Api
 */
const searchProduct = (req, res) => {
  const search = req.params.search;
  Logger.Express(`/block/api/search-product/${search}`, 'GET');
  Query.searchProduct(search)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      Logger.Error(err);
      throw err;
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

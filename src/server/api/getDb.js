const Logger = require('../logger.js');
const Query = require('../db/getQueries.js');

const getAllProducts = (req, res) => {
  Logger.Express('/block/api/shop/all', 'GET');
  const results = Query.getAllProducts();
  results.then(data => {
    res.status(200).json(data);
  });
};

const getProductById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  Logger.Express(`/block/api/shop/item/${id}`, 'GET');
  const results = Query.getProductById(id);
  results.then(data => {
    res.status(200).json(data);
  });
};

const getUser = (req, res) => {
  const id = req.params.id;
  Logger.Express(`/block/api/get-user/${id}`, 'GET');
  const results = Query.getUser(id);
  results.then(data => {
    res.status(200).json(data);
  });
};

const checkExists = (req, res) => {
  const id = req.params.id;
  Logger.Express(`/block/api/check-exists/${id}`, 'GET');
  const results = Query.checkExists(id);
  results.then(data => {
    res.status(200).json(data);
  });
};

const getBasketItems = (req, res) => {
  const id = req.params.id;
  Logger.Express(`/block/api/get-basket-items/${id}`, 'GET');
  Logger.Database(`Getting basket items for user with ID: ${id}`);
  const results = Query.getBasketItems(id);
  results.then(data => {
    res.status(200).json(data);
  });
};

const getStock = (req, res) => {
  const id = req.params.id;
  Logger.Express(`/block/api/get-stock/${id}`, 'GET');
  const results = Query.getStock(id);
  results.then(data => {
    res.status(200).json(data);
  });
};

const getTotalCost = (req, res) => {
  const id = req.params.id;
  Logger.Express(`/block/api/get-total-cost/${id}`, 'GET');
  const results = Query.getTotalCost(id);
  results.then(data => {
    res.status(200).json(data);
  });
};

const getUserName = (req, res) => {
  const id = req.params.id;
  Logger.Express(`/block/api/get-user-name/${id}`, 'GET');
  const results = Query.getUserName(id);
  results.then(data => {
    res.status(200).json(data);
  });
};

const getBasketId = (req, res) => {
  const id = req.params.id;
  Logger.Express(`/block/api/get-basket/${id}`, 'GET');
  const results = Query.getBasketId(id);
  results.then(data => {
    res.status(200).json(data);
  });
};


const getProductByFilter = (req, res) => {
  const { filter } = req.params;
  Logger.Express(`/block/api/type-filters/${filter}`, 'GET');
  const results = Query.getProductByFilter(filter);
  results.then(data => {
    res.status(200).json(data);
  });
};

const checkOrderDetail = (req, res) => {
  const id = req.params.id;
  Logger.Express(`/block/api/check-order-detail/${id}`, 'GET');
  const results = Query.checkOrderDetail(id);
  results.then(data => {
    res.status(200).json(data);
  });
};

const searchProduct = (req, res) => {
  const search = req.params.search;
  Logger.Express(`/block/api/search-product/${search}`, 'GET');
  const results = Query.searchProduct(search);
  results.then(data => {
    res.status(200).json(data);
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

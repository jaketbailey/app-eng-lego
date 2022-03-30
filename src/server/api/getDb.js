const Logger = require('../logger.js');
const Query = require('../db/getQueries.js');

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

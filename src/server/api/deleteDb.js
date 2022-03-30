const Logger = require('../logger.js');
const Query = require('../db/deleteQueries.js');

const removeBasketItem = (req, res) => {
  const { id } = req.body;
  Logger.Express('/block/api/remove-basket-item/', 'PUT');
  const deleteQuery = Query.removeBasketItem(id);
  deleteQuery.catch(err => {
    Logger.Error(err);
    res.status.send(`Error: ${err}`);
    throw err;
  });
  res.status(200).send(`Product removed from basket with ID: ${id}`);
  // });
};

const deleteUser = (req, res) => {
  const { id, orderId } = req.body;
  Logger.Express('/block/api/delete-user/', 'PUT');
  const deleteQuery = Query.deleteUser(id, orderId);
  deleteQuery.catch(err => {
    Logger.Error(err);
    res.status.send(`Error: ${err}`);
    throw err;
  });
  res.status(200).send(`User deleted with ID: ${id}`);
};

module.exports = {
  removeBasketItem,
  deleteUser,
};

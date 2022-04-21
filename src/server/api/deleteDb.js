/**
 * @file deleteDb.js
 * @author UP2002753
 * @description Delete Api Endpoints
 */

const Logger = require('../logger.js');
const Query = require('../db/deleteQueries.js');

/**
 * @function removeBasketItem
 * @description API endpoint to remove an item from the basket.
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @memberof Api
 */
const removeBasketItem = (req, res) => {
  const { id } = req.body;
  Logger.Express('/block/api/remove-basket-item/', 'DELETE');
  const deleteQuery = Query.removeBasketItem(id);
  deleteQuery.catch(err => {
    Logger.Error(err);
    res.status.send(`Error: ${err}`);
    throw err;
  });
  res.status(204).send(`Product removed from basket with ID: ${id}`);
};

/**
 * @function deleteUser
 * @description API endpoint to delete a user.
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @memberof Api
 */
const deleteUser = async (req, res) => {
  const { id, orderId } = req.body;
  Logger.Express('/block/api/delete-user/', 'DELETE');
  const newId = [];
  newId.push(orderId);
  for (const item of newId) {
    console.log(item);
    await Query.deleteOrder(item.id);
  }
  await Query.deleteUser(id);
  res.status(204).send(`User deleted with ID: ${id}`);
};

module.exports = {
  removeBasketItem,
  deleteUser,
};

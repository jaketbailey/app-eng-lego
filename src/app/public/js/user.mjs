/**
 * @file user.mjs
 * @author UP2002753
 * @description User-related api calls.
 * @namespace User
 */

import createBasket from './basket.mjs';
import errorCheck from './error.mjs';
import resCheck from './responseCheck.mjs';

/**
 * @function createUser
 * @param {object} user
 * @description Creates a user in the database.
 * @memberof User
 */
export async function createUser(user) {
  try {
    await fetch('/block/api/create-user/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(user),
    })
      .then(response => console.log(resCheck(response)));
    await createBasket(user);
  } catch (err) {
    errorCheck(err);
  }
}

/**
 * @function updateUser
 * @param {object} address
 * @description Sends new address to be updated in the database.
 * @memberof User
 */
export async function updateUser(address) {
  try {
    await fetch('/block/api/update-user/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(address),
    })
      .then(response => console.log(resCheck(response)));
  } catch (err) {
    errorCheck(err);
  }
}

/**
 * @function getUser
 * @param {string} id
 * @description Requests relevant user data from the database.
 * @memberof User
 */
export async function getUser(id) {
  try {
    const response = await fetch(`/block/api/get-user/${id}`);
    const result = await response.json();
    return result[0];
  } catch (err) {
    errorCheck(err);
  }
}

/**
 * @function getBasketId
 * @param {string} id
 * @description Requests the id of a basket with customerid (id).
 * @memberof User
 */
export async function getBasketId(id) {
  try {
    const response = await fetch(`/block/api/get-basket/${id}`);
    const result = await response.json();
    return result[0];
  } catch (err) {
    errorCheck(err);
  }
}

/**
 * @function deleteUser
 * @param {string} id
 * @param {number} orderId
 * @description Sends a request to the api to delete all user data and order data for a user.
 * @memberof User
 */
export async function deleteUser(id, orderId) {
  console.log('Delete');
  if (id.split('-')[0] === 'unregistered') {
    try {
      await fetch('/block/api/delete-user', {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id, orderId: orderId }),
      })
        .then(response => console.log(resCheck(response)));
    } catch (err) {
      errorCheck(err);
    }
  }
}

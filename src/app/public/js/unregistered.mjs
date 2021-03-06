/**
 * @file unregistered.mjs
 * @author UP2002753
 * @description Unregistered user generation
 * @namespace Unregistered
 */

import { createUser, getUser } from './user.mjs';
import createBasket from './basket.mjs';

/**
 * Charlist used to generate a random string
 * @memberof Unregistered
 */
const charList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const charLength = charList.length;

/**
 * @function generateRandomString
 * @param {number} length - Length of the random string to be generated
 * @returns {string} - Returns the random string
 * @memberof Unregistered
 */
function generateRandomString(length) {
  let id = '';
  for (let i = 0; i < length; i++) {
    id += charList.charAt(Math.floor(Math.random() * charLength));
  }
  return id;
}

/**
 * @function generateUnregistered
 * @description Generates a random unregistered user if user isn't logged in already.
 * @memberof Unregistered
 */
export default async function generateUnregistered() {
  const check = localStorage.getItem('customerId');
  console.log(check);
  if (check === null || check.split('-')[0] !== 'unregistered') {
    const unregisteredId = `unregistered-${generateRandomString(20)}`;
    localStorage.setItem('customerId', unregisteredId);
    const unregistered = {
      sub: unregisteredId,
      name: 'Unregistered Unregistered',
      email: 'Unregistered',
    };
    await createUser(unregistered);
    await createBasket(unregistered);
  } if (check.split('-')[0] === 'unregistered') {
    const unregistered = await getUser(check);
    if (!unregistered) {
      const unregisteredDetails = {
        sub: check,
        name: 'Unregistered Unregistered',
        email: 'Unregistered',
      };
      await createUser(unregisteredDetails);
      await createBasket(unregisteredDetails);
    }
  }
}

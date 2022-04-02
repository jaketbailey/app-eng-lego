/**
 * @file error.mjs
 * @author UP2002753
 * @description Api calls to log errors on the server
 * @namespace Error
 */

/**
 * @function errorCheck
 * @memberof Error
 * @param {object} error
 * @description Sends error to the server
 */
export default async function (error) {
  const data = {
    message: error.message,
    stack: error.stack,
  };
  await fetch('/block/api/error/', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  });
  throw error;
}

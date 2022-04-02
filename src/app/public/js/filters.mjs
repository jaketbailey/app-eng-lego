/**
 * @file filters.mjs
 * @author UP2002753
 * @description Api calls for filters and searches
 * @namespace filter
 */

import errorCheck from './error.mjs';

/**
 * @function filter
 * @memberof filter
 * @param {string} filter
 * @returns {array} - Contains all products based on filter
 */
export async function filter(filter) {
  try {
    const response = await fetch(`/block/api/type-filters/${filter.join('_')}/`);
    const result = await response.json();
    return result;
  } catch (err) {
    errorCheck(err);
  }
}

/**
 * @function search
 * @memberof filter
 * @param {string} search
 * @returns {array} - Contains all products based on search
 */
export async function search(search) {
  try {
    const response = await fetch(`/block/api/search-product/${search}`);
    const result = await response.json();
    return result;
  } catch (err) {
    errorCheck(err);
  }
}

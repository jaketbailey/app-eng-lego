/**
 * @file card.mjs
 * @author UP2002753
 * @description The functions create and add the 'cards' to load products on a page
 * @namespace Card
 */

import { getData, appendElem } from './store.mjs';
import checkForAdd from './add.mjs';
import { filter, search } from './filters.mjs';

/**
 * @function createCard
 * @memberof Card
 * @param {number} - Contains the product id
 * @param {string} - Contains the product name
 * @param {string} - Contains the product description
 * @param {string} - Contains the product image reference
 * @param {number} - Contains the product price
 * @param {number} - Contains the product stock
 * @description Creates a new 'card element' for each product and appends it to the page
 */
export const createCard = (id, name, desc, img, price, stock) => {
  const page = document.getElementById('page');
  const outerDiv = document.createElement('div');
  outerDiv.classList.add('outerCard');
  page.appendChild(outerDiv);
  const card = document.createElement('div');
  card.className = 'card';
  card.id = `card-${id}`;
  const a = document.createElement('a');
  a.href = `/shop/item/?id=${id}`;
  card.appendChild(a);
  appendElem(a, 'img', null, 'store', null, `/public/images/store/${img}.jpg`, null);
  const innerDiv = appendElem(a, 'div', null, 'card-body', null, null, null);
  appendElem(innerDiv, 'p', null, null, name, null, null);
  appendElem(card, 'button', `add-${id}`, 'add_btn', 'Add to Basket', null, null);
  appendElem(innerDiv, 'p', null, null, `£${price}`, null, null);
  appendElem(innerDiv, 'p', null, 'stock', `Stock: ${stock}`, null, null);
  page.lastChild.appendChild(card);
  return card;
};

/**
 * @function addCard
 * @memberof Card
 * @param {object} - URL Search Parameters
 * @description Calls the createCard function to create a new card for each product
 * based on search and filter parameters (or no parameters at all)
 */
const addCard = (params) => {
  let cards;
  const filterObj = [];
  if (params.get('search') === null) {
    for (const pair of params.entries()) {
      filterObj.push(pair[1]);
    }
    if (filterObj.length === 0) {
      cards = getData('/shop/all');
    } else {
      cards = filter(filterObj);
    }
  } else {
    const searchParam = params.get('search');
    searchParam.replace(/\s/g, '_');
    cards = search(searchParam);
  }
  cards.then((res) => {
    for (let i = 0; i < res.length; i++) {
      createCard(res[i].id, res[i].product_name, res[i].product_desc, res[i].image_ref, res[i].price, res[i].stock);
    }
    checkForAdd('store');
  });
};

/**
 * @function load
 * @memberof Card
 * @description Calls the addCard function to create a new card for each product
 * when the page loads.
 */
const load = () => {
  const params = new URLSearchParams(window.location.search);
  addCard(params);
};

window.addEventListener('load', load);

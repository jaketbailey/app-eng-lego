/**
 * @file store.mjs
 * @author UP2002753
 * @description Basic store functions
 * @namespace Store
 */
import errorCheck from './error.mjs';

/**
 * @function getData
 * @memberof Store
 * @description Get main store data from the database
 * @description Used for all products and filters
 * @param {string} - Contains filter data/no filter
 * @returns {array} - Contains all products based on filter or all products
*/
export async function getData(input) {
  let actualInput = input.split('/');
  const page = actualInput[2];
  const finalOutput = [];
  let res;
  try {
    if (page === 'all') {
      actualInput = actualInput[2];
      res = await fetch(`/block/api/shop/${page}`);
      const data = await res.json();
      for (let i = 0; i < data.length; i++) {
        finalOutput.push(data[i]);
      }
    } else {
      actualInput = actualInput[3];
      actualInput = actualInput.split(',');
      for (let i = 0; i < actualInput.length; i++) {
        res = await fetch(`/block/api/shop/${page}/${actualInput[i]}`);
        const data = await res.json();
        for (let i = 0; i < data.length; i++) {
          finalOutput.push(data[i]);
        }
      }
    }
    return finalOutput;
  } catch (err) {
    errorCheck(err);
  }
}

/**
 * @function appendElem
 * @memberof Store
 * @description Append an element to the DOM
 * @description This function is used to append an multiple types of elements to the DOM.
 * @param {string} parent
 * @param {string} type
 * @param {string} id
 * @param {string} className
 * @param {string} text
 * @param {string} src
 * @param {string} value
 * @returns {element} - Returns the element to be appended to the DOM
 */
export function appendElem(parent, type, id, className, text, src, value) {
  const elem = document.createElement(type);
  if (id !== null) elem.id = id;
  if (className !== null) elem.classList.add(className);
  if (text !== null) elem.textContent = `${text}`;
  if (type === 'img') {
    elem.src = src;
    elem.alt = value;
  }
  if (type === 'a') elem.href = src;
  if (value !== null) elem.value = `${value}`;
  parent.appendChild(elem);
  return elem;
}

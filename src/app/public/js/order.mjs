/**
 * @file order.mjs
 * @author UP2002753
 * @description Order functions for the checkout page (completed)
 * @namespace Order
 */

import { getBasket } from './basket.mjs';
import { appendElem } from './store.mjs';
import { callServer } from './authentication.mjs';
import errorCheck from './error.mjs';
import resCheck from './responseCheck.mjs';

/**
 * @function loadFinalCheckout
 * @memberof Order
 * @description Load the final checkout page
 */
async function loadFinalCheckout() {
  let customerId = localStorage.getItem('customerId');
  if (customerId === null) {
    const userDetails = callServer();
    customerId = userDetails.sub;
  }
  await getOrder(customerId);
}

/**
 * @function getOrder
 * @memberof Order
 * @description Requests the order data from the database
 */
async function getOrder(customerId) {
  const basket = await getBasket();
  const shippingAddress = basket[0].order_address.split(', ');
  const total = basket[0].total_cost;
  try {
    const customerData = await fetch(`/block/api/get-user-name/${customerId}`);
    const customer = await customerData.json();
    updateOrder(basket[0].id);
    addToPage(customer, shippingAddress, total);
  } catch (err) {
    errorCheck(err);
  }
}

/**
 * @function addToPage
 * @memberof Order
 * @description Adds the needed order and customer data to the DOM
 * @param {string} customerData - Contains the customer name
 * @param {string} shippingAddress - Contains the shipping address
 * @param {string} total - Contains the total cost
 */
function addToPage(customerData, shippingAddress, total) {
  const title = document.getElementById('title');
  const totalCost = document.createElement('p');
  totalCost.className = 'p_main';
  totalCost.style = 'margin-bottom:10px;';
  totalCost.textContent = `Total Cost: £${total}`;
  title.appendChild(totalCost);
  const main = document.getElementById('main');
  const userDetails = appendElem(main, 'div', null, null, null, null, null);
  userDetails.className = 'user_details';
  appendElem(userDetails, 'p', null, 'p_main', 'Customer Details:', null, null);
  appendElem(userDetails, 'p', null, null, `${customerData[0].first_name} ${customerData[0].last_name}`, null, null);
  appendElem(userDetails, 'p', null, null, customerData[0].email, null, null);
  appendElem(userDetails, 'p', null, null, customerData[0].phone, null, null);
  main.appendChild(userDetails);
  const secondary = document.getElementById('secondary');
  const order = document.createElement('div');
  appendElem(order, 'p', null, 'order', 'Order Details:', null, null);
  for (const item of shippingAddress) {
    appendElem(order, 'p', null, null, item, null, null);
  }
  secondary.appendChild(order);
}

/**
 * @function updateOrder
 * @memberof Order
 * @description Sends a request to the api to update the order status in the database
 * @param {string} id - Contains the order ID
 */
async function updateOrder(id) {
  const data = {
    id: id,
    status: 'Completed',
  };
  try {
    await fetch('/block/api/update-order/', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      method: 'PUT',
    })
      .then(response => console.log(resCheck(response)));
  } catch (err) {
    errorCheck(err);
  }
}

window.addEventListener('load', loadFinalCheckout);

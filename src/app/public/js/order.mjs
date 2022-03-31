import { getBasket } from './checkout.mjs';
import { appendElem } from './store.mjs';
import { callServer } from './authentication.mjs';
import errorCheck from './error.mjs';

async function loadFinalCheckout() {
  let customerId = localStorage.getItem('customerId');
  if (customerId !== null) {
    const userDetails = callServer();
    customerId = userDetails.sub;
  }
  await getOrder(customerId);
}

async function getOrder(customerId) {
  const basket = await getBasket();
  const shippingAddress = basket[0].order_address.split(', ');
  const total = basket[0].total_cost;
  try {
    const customerData = await fetch(`/get-user-name/${customerId}`);
    const customer = await customerData.json();
    updateOrder(basket[0].id);
    addToPage(customer, shippingAddress, total);
  } catch (err) {
    errorCheck(err);
  }
}

function addToPage(customerData, shippingAddress, total) {
  const title = document.getElementById('title');
  const totalCost = document.createElement('p');
  totalCost.className = 'p_main';
  totalCost.style = 'margin-bottom:10px;';
  totalCost.textContent = `Total Cost: £${total}`;
  title.appendChild(totalCost);
  const main = document.getElementById('main');
  const userDetails = appendElem(main, 'div', null, null, null, null, null);
  // const userDetails = document.createElement('div');
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
    });
  } catch (err) {
    errorCheck(err);
  }
}

window.addEventListener('load', loadFinalCheckout);

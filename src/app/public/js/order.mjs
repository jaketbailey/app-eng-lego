import { getBasket } from './checkout.mjs';

async function loadFinalCheckout() {
  const customerId = localStorage.getItem('customerId');
  console.log(customerId);
  await getOrder(customerId);
}

async function getOrder(customerId) {
  const basket = await getBasket();
  console.log(basket);
  const shippingAddress = basket[0].order_address.split(', ');
  const total = basket[0].total_cost;
  const customerData = await fetch(`/get-user-name/${customerId}`);
  const customer = await customerData.json();
  console.log(customer);
  console.log(shippingAddress);
  console.log(total);
  addToPage(customer, shippingAddress, total);
  updateOrder(basket[0].id);
}

function addToPage(customerData, shippingAddress, total) {
  const title = document.getElementById('title');
  const totalCost = document.createElement('p');
  totalCost.className = 'p_main';
  totalCost.style = 'margin-bottom:10px;';
  totalCost.innerHTML = `Total Cost: £${total}`;
  title.appendChild(totalCost);
  const main = document.getElementById('main');
  const userDetails = document.createElement('div');
  userDetails.className = 'user_details';
  userDetails.innerHTML = `
    <p class="p_main" style="margin-bottom: 10px;">Customer Details:</p>
    <p>${customerData[0].first_name} ${customerData[0].last_name}</p>
    <p>${customerData[0].email}</p>
    <p>${customerData[0].phone}</p>
    `;
  main.appendChild(userDetails);
  const secondary = document.getElementById('secondary');
  const order = document.createElement('div');
  order.className = 'order';
  order.innerHTML = `
    <p class="p_main" style="margin-bottom: 10px;">Order Details:</p>
    <p>${shippingAddress[0]}</p>
    <p>${shippingAddress[1]}</p>
    <p>${shippingAddress[2]}</p>
    <p>${shippingAddress[3]}</p>
    <p>${shippingAddress[4]}</p>
    <p style="margin-bottom: 10px;">${shippingAddress[5]}</p>
    `;
  secondary.appendChild(order);
}

async function updateOrder(id) {
  const data = {
    id: id,
    status: 'Completed',
  };
  const response = await fetch('/update-order/', {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    method: 'PUT',
  });
  const result = await response.json();
  console.log(result);
}

window.addEventListener('load', loadFinalCheckout);

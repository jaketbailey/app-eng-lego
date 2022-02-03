import { getUser } from './user.mjs';

async function getBasket() {
  const customerId = localStorage.getItem('customerId');
  const response = await fetch(`/check-exists/${customerId}`);
  const result = await response.json();
  return result;
}

async function getBasketItems(basket) {
  const basketId = basket[0].id;
  const response = await fetch(`/get-basket-items/${basketId}`);
  const result = await response.json();
  return result;
}

async function getProductById(id) {
  const response = await fetch(`/shop/item/${id}`);
  const result = await response.json();
  return result;
}

function addCheckoutItem(product) {
  const page = document.querySelector('.checkout-card');
  const basketItem = document.createElement('div');
  basketItem.innerHTML = `
    <div>  
      <img class="checkout" src="/public/images/store/${product[0].image_ref}.jpg" alt="${product[0].product_name}" width=100px">
    </div>
    <div>
      <p>${product[0].product_name}</p>
      <p>£${product[0].price}</p>
    </div>
    <hr>
    `;
  page.appendChild(basketItem);
}

async function getUserAddress() {
  const user = await getUser(localStorage.customerId);
  console.log(user);
  const addressBox = document.getElementById('address_box');
  const address = document.createElement('div');
  address.innerHTML = `
    <p class="p_basket" style="text-align: center;">Stored Shipping Address:</p>
    <p>${user.address_line_1}</p>
    <p>${user.address_line_2}</p>
    <p>${user.city}</p>
    <p>${user.county}</p>
    <p>${user.postcode}</p>
    <p>${user.country}</p>
    <hr>
    `;
  addressBox.appendChild(address);
}

async function basketLoad() {
  const basket = await getBasket();
  const basketItems = await getBasketItems(basket);
  let totalCost = 0;
  for (let i = 0; i < basketItems.length; i++) {
    const product = await getProductById(basketItems[i].product_id);
    console.log(product);
    addCheckoutItem(product);
    totalCost = ((totalCost * 1000) + (product[0].price * 1000)) / 1000;
  }
  const page = document.querySelector('.checkout-card');
  const total = document.createElement('div');
  total.innerHTML = `
    <div>
    <br>
      Total: £${totalCost}
    </div>
    <button class="button" id="checkout" style="padding: 10px; margin-top: 20px;">Checkout</button>
    `;
  page.appendChild(total);
  getUserAddress();
  console.log(basket);
  console.log(basketItems);
}

window.addEventListener('load', basketLoad);

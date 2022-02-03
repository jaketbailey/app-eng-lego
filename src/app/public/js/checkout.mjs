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

function addCheckoutItem(product, id) {
  const page = document.querySelector('.checkout-card');
  const basketItem = document.createElement('div');
  basketItem.innerHTML = `
    <div>  
      <img class="checkout" src="/public/images/store/${product[0].image_ref}.jpg" alt="${product[0].product_name}" width=100px">
    </div>
    <div>
      <p>${product[0].product_name}</p>
      <p>£${product[0].price}</p>
      <button class="button_remove" id="${id}" style="padding: 10px; margin-top: 20px;">Remove</button>
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

async function removeOrderDetail(id, productId, totalCost) {
  const response = await fetch('/remove-basket-item/', {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: id }),
    method: 'DELETE',
  });
  const e = document.getElementById(id);
  console.log(productId);
  const price = getProductById(productId);
  console.log(price);
  let total;
  price.then(async (res) => {
    console.log(res);
    console.log(totalCost);
    total = ((totalCost * 1000) - (res[0].price * 1000)) / 1000;
    console.log(total);
    const cost = document.getElementById('totalCost');
    const elem = document.createElement('p');
    const main = document.getElementById('price_box');
    elem.innerHTML = `
      <p class="p_basket" id="totalCost" style="text-align: center;">
        Total: £${total}
      </p>`;
    main.removeChild(cost);
    main.appendChild(elem);
    // const parent = cost.parentNode;
    // console.log('test');
    // console.log(cost);
    // cost.innerHTML = `£${total}`;
    // parent.replaceChild(newCost, cost);
    e.parentElement.parentElement.remove();
    const result = await response.json();
    console.log(result);
  });
}

async function updateStock(e, id, quantity, totalCost) {
  const data = {
    productId: id,
    quantity: quantity,
  };
  console.log(data);
  const response = await fetch('/add-to-stock/', {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    method: 'PUT',
  });
  console.log(id);
  await removeOrderDetail(e, id, totalCost);
  const result = await response.json();
  console.log(result);
}

async function basketLoad() {
  const basket = await getBasket();
  const basketItems = await getBasketItems(basket);
  let totalCost = 0;
  for (let i = 0; i < basketItems.length; i++) {
    const product = await getProductById(basketItems[i].product_id);
    console.log(product);
    addCheckoutItem(product, basketItems[i].id);
    totalCost = ((totalCost * 1000) + (product[0].price * 1000)) / 1000;
  }
  const page = document.querySelector('.checkout-card');
  const total = document.createElement('div');
  total.innerHTML = `
    <div id=price_box>
    <br>
    <p class="p_basket" id="totalCost" style="text-align: center;">
      Total: £${totalCost}
    </p>
    </div>
    <button class="button" id="checkout" style="padding: 10px; margin-top: 20px;">Checkout</button>
    `;
  page.appendChild(total);
  getUserAddress();
  const remove = document.querySelectorAll('.button_remove');
  let quantity = 0;
  let productId;
  let item;
  for (let i = 0; i < remove.length; i++) {
    remove[i].addEventListener('click', async () => {
      for (let j = 0; j < basketItems.length; j++) {
        if (basketItems[j].id === parseInt(remove[i].id)) {
          item = remove[i].id;
          console.log(item);
          console.log('hello');
          quantity = basketItems[j].quantity;
          productId = basketItems[j].product_id;
        }
      }
      await updateStock(item, productId, quantity, totalCost);
    });
    console.log(item);
  }
  console.log(item);
  console.log(basket);
  console.log(basketItems);
}

window.addEventListener('load', basketLoad);

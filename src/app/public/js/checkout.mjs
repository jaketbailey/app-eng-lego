import { getUser } from './user.mjs';
import { appendElem } from './store.mjs';

export async function getBasket() {
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

async function addTotalCost(id, total) {
  const data = {
    id: id,
    total: total,
  };
  const response = await fetch('/add-total-cost/', {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    method: 'PUT',
  });
  const result = await response.json();
  console.log(result);
}

function addCheckoutItem(product, id, quantity) {
  const page = document.querySelector('.checkout-card');
  const basketItem = document.createElement('div');
  basketItem.innerHTML = `
    <div>  
      <img class="checkout" src="/public/images/store/${product[0].image_ref}.jpg" alt="${product[0].product_name}" width=100px">
    </div>
    <div>
      <p>${product[0].product_name}</p>
      <p>Quantity: ${quantity}</p>
      <p>£${product[0].price}</p>
    </p>
      <button class="button_remove" id="${id}" style="padding: 10px; margin-top: 20px;">Remove</button>
    </div>
    <hr>
    `;
  page.appendChild(basketItem);
}

async function getUserAddress() {
  const id = localStorage.getItem('customerId');
  const user = await getUser(id);
  const addressBox = document.getElementById('address_box');
  if (id === null || (user.address_line_1 !== null && id.split('-')[0] !== 'unregistered')) {
    console.log(user);
    const address = document.createElement('div');
    const addressData = [user.address_line_1, user.address_line_2, user.city, user.county, user.postcode, user.country];
    for (const item of addressData) {
      if (item !== 'null') appendElem(address, 'p', null, null, item, null, null);
    }
    addressBox.appendChild(address);
  } else {
    const text = document.getElementById('shipping_text');
    console.log(text);
    text.textContent = 'Enter the shipping address below:';
    addressBox.remove();
  }
  addressBox.appendChild(document.createElement('hr'));
}

async function removeOrderDetail(id, productId, basket) {
  const response = await fetch('/remove-basket-item/', {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: id }),
    method: 'DELETE',
  });
  await getTotalCost(id, productId, basket);
  const result = await response.json();
  console.log(result);
}

async function getTotalCost(id, productId, basket) {
  console.log(basket);
  const response2 = await fetch(`/get-total-cost/${basket}`);
  const result = await response2.json();
  console.log(result);
  const totalCost = result[0].total_cost;
  updatePageCost(id, productId, totalCost, basket);
}

function updatePageCost(id, productId, totalCost, basket) {
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
    elem.className = 'p_basket';
    elem.id = 'totalCost';
    elem.style = 'text-align: center;';
    const main = document.getElementById('price_box');
    elem.innerHTML = `Total: £${total}`;
    main.removeChild(cost);
    main.appendChild(elem);
    console.log(main);
    e.parentElement.parentElement.remove();
    await addTotalCost(basket, total);
  });
}

async function updateStock(e, id, quantity, basket) {
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
  await removeOrderDetail(e, id, basket);
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
    addCheckoutItem(product, basketItems[i].id, basketItems[i].quantity);
    totalCost = ((totalCost * 1000) + ((product[0].price * 1000) * basketItems[i].quantity)) / 1000;
  }
  const page = document.querySelector('.checkout-card');
  const total = document.createElement('div');
  const priceBox = appendElem(total, 'div', 'price_box', null, null, null, null);
  priceBox.appendChild(document.createElement('br'));
  appendElem(priceBox, 'p', 'totalCost', 'p_basket_2', `Total: £${totalCost}`, null, null);
  total.appendChild(document.createElement('br'));
  appendElem(total, 'button', 'checkout', 'button', 'Checkout', '/basket/checkout/');
  page.appendChild(total);
  addTotalCost(basket[0].id, totalCost);
  getUserAddress();
  const remove = document.querySelectorAll('.button_remove');
  let quantity = 0;
  let productId;
  let item;
  let basketId;
  for (let i = 0; i < remove.length; i++) {
    remove[i].addEventListener('click', async () => {
      for (let j = 0; j < basketItems.length; j++) {
        if (basketItems[j].id === parseInt(remove[i].id)) {
          item = remove[i].id;
          console.log(item);
          quantity = basketItems[j].quantity;
          productId = basketItems[j].product_id;
          basketId = basket[0].id;
        }
      }
      await updateStock(item, productId, quantity, basketId);
    });
    console.log(item);
  }
  console.log('hellotest');
  await shippingAddress();
}

async function shippingAddress() {
  const basket = await getBasket();
  console.log(basket);
  const user = await getUser(localStorage.getItem('customerId'));
  console.log(user);
  let shippingAddress = {
    id: basket[0].id,
    address1: user.address_line_1,
    address2: user.address_line_2,
    city: user.city,
    county: user.county,
    postcode: user.postcode,
    country: user.country,
  };
  const checkout = document.getElementById('checkout');
  console.log(checkout);
  checkout.addEventListener('click', () => {
    if (shippingAddress.address1 === null) {
      alert('Please enter your shipping address');
    } else {
      window.location.href = '/basket/checkout/';
    }
  });
  storeShippingAddress(shippingAddress);
  const addressBtn = document.getElementById('address_btn');
  addressBtn.addEventListener('click', () => {
    const addressElem = document.getElementsByClassName('shipping');
    for (let i = 0; i < addressElem.length; i++) {
      if (addressElem[i].value === '' && i !== 1) {
        alert('Please fill in all fields');
        return;
      } else {
        let tempLine2;
        if (addressElem[1].value === '') {
          tempLine2 = null;
        } else {
          tempLine2 = addressElem[1].value;
        }
        shippingAddress = {
          id: basket[0].id,
          address1: addressElem[0].value,
          address2: tempLine2,
          city: addressElem[2].value,
          county: addressElem[4].value,
          postcode: addressElem[5].value,
          country: addressElem[3].value,
        };
      }
    }
    console.log(shippingAddress);
    addressBtn.textContent = 'Shipping Address Updated';
    addressBtn.className = 'button_success';
    addressBtn.setAttribute('disabled', 'true');
    storeShippingAddress(shippingAddress);
  });
}

async function storeShippingAddress(shippingAddress) {
  const response = await fetch('/add-shipping-address/', {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(shippingAddress),
    method: 'PUT',
  });
  const result = await response.json();
  console.log(result);
}

window.addEventListener('load', basketLoad);

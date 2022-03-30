import { getUser } from './user.mjs';
import { appendElem } from './store.mjs';
import { callServer } from './authentication.mjs';
import errorCheck from './error.mjs';

export async function getBasket() {
  const userDetails = callServer();
  let customerId = localStorage.getItem('customerId');
  if (customerId === null) {
    customerId = userDetails.sub;
    localStorage.removeItem('customerId');
  }
  try {
    const response = await fetch(`/block/api/check-exists/${customerId}`);
    const result = await response.json();
    return result;
  } catch (err) {
    errorCheck(err);
  }
}

async function getBasketItems(basket) {
  const basketId = basket[0].id;
  try {
    const response = await fetch(`/block/api/get-basket-items/${basketId}`);
    const result = await response.json();
    return result;
  } catch (err) {
    errorCheck(err);
  }
}

async function getProductById(id) {
  try {
    const response = await fetch(`/block/api/shop/item/${id}`);
    const result = await response.json();
    return result;
  } catch (err) {
    errorCheck(err);
  }
}

async function addTotalCost(id, total) {
  const data = {
    id: id,
    total: total,
  };
  try {
    await fetch('/block/api/add-total-cost/', {
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

function addCheckoutItem(product, id, quantity) {
  const page = document.querySelector('.checkout-card');
  const basketItem = document.createElement('div');
  const innerDiv1 = appendElem(basketItem, 'div', null, null, null, null, null);
  appendElem(innerDiv1, 'img', null, 'checkout', null, `/public/images/store/${product[0].image_ref}.jpg`, product[0].product_name);
  const innerDiv2 = appendElem(basketItem, 'div', null, null, null, null, null);
  appendElem(innerDiv2, 'p', null, null, `${product[0].product_name}`, null, null);
  appendElem(innerDiv2, 'p', null, null, `Quantity: ${quantity}`, null, null);
  appendElem(innerDiv2, 'p', null, null, `£${parseFloat(product[0].price) * parseFloat(quantity)}`, null, null);
  const quantityParagraph = appendElem(innerDiv2, 'p', null, 'q-remove', 'Remove:', null, null);
  const quantityInput = document.createElement('input');
  quantityInput.setAttribute('type', 'number');
  quantityInput.setAttribute('min', '1');
  quantityInput.setAttribute('max', '10');
  quantityInput.setAttribute('value', '1');
  quantityInput.setAttribute('id', `quantity-${id}`);
  quantityInput.setAttribute('class', 'quantity-remove');
  quantityParagraph.appendChild(quantityInput);
  appendElem(innerDiv2, 'button', id, 'button_remove', 'Remove', null, null);
  basketItem.appendChild(document.createElement('hr'));
  page.appendChild(basketItem);
}

async function getUserAddress() {
  const userDetails = callServer();
  let id = localStorage.getItem('customerId');
  if (id === null) {
    id = userDetails.sub;
    localStorage.removeItem('customerId');
  }
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

async function removeOrderDetail(id, productId, basket, quantity) {
  try {
    await fetch('/block/api/remove-basket-item/', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
      method: 'DELETE',
    });
    await getTotalCost(id, productId, basket, quantity, true);
  } catch (err) {
    errorCheck(err);
  }
}

async function getTotalCost(id, productId, basket, quantity, remove) {
  console.log(basket);
  try {
    const response = await fetch(`/block/api/get-total-cost/${basket}`);
    const result = await response.json();
    console.log(result);
    const totalCost = result[0].total_cost;
    updatePageCost(id, productId, totalCost, basket, quantity, remove);
  } catch (err) {
    errorCheck(err);
  }
}

function updatePageCost(id, productId, totalCost, basket, quantity, remove) {
  const quantitySelect = document.getElementById(`quantity-${id}`);
  const e = document.getElementById(id);
  console.log(productId);
  const price = getProductById(productId);
  console.log(price);
  let total;
  let itemCost;
  price.then(async (res) => {
    console.log(res);
    console.log(totalCost);
    itemCost = (res[0].price * 1000) * parseFloat(quantity) / 1000;
    total = ((totalCost * 1000) - ((res[0].price * 1000) * parseFloat(quantitySelect.value))) / 1000;
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
    if (remove) {
      e.parentElement.parentElement.remove();
    } else {
      e.parentElement.parentElement.childNodes[1].childNodes[1].textContent = `Quantity: ${quantity}`;
      e.parentElement.parentElement.childNodes[1].childNodes[2].textContent = `£${itemCost}`;
      const button = document.getElementById(id);
      console.log(button);
      button.className = 'button_remove_success';
      button.innerHTML = `Removed x${quantitySelect.value}`;
      setTimeout(function () {
        button.className = 'button_remove';
        button.innerHTML = 'Remove';
      }, 1000);
    }
    await addTotalCost(basket, total);
  });
}

async function updateStock(e, id, quantity, basket, removeQuantity, price) {
  const newQuantity = parseFloat(quantity) - parseFloat(removeQuantity);
  const newPrice = (parseFloat(price) / parseFloat(quantity)) * parseFloat(newQuantity);
  const data = {
    productId: id,
    quantity: removeQuantity,
  };
  console.log(data);
  if (newQuantity === 0) {
    await removeOrderDetail(e, id, basket, newQuantity);
    addToStock(data, id);
  } else if (newQuantity < 0) {
    alert('You cannot remove more than you have in the basket');
  } else {
    await updateOrderDetail(e, id, basket, newQuantity, newPrice);
    addToStock(data, id);
  }
}

async function addToStock(data) {
  try {
    await fetch('/block/api/add-to-stock/', {
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

async function basketLoad() {
  const basket = await getBasket();
  const basketItems = await getBasketItems(basket);
  let totalCost = 0;
  for (let i = 0; i < basketItems.length; i++) {
    const product = await getProductById(basketItems[i].product_id);
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
  let productId, item, basketId, price, removeQuantity;
  for (let i = 0; i < remove.length; i++) {
    remove[i].addEventListener('click', async () => {
      const basketItemsNew = await getBasketItems(basket);
      for (let j = 0; j < basketItemsNew.length; j++) {
        if (basketItemsNew[j].id === parseInt(remove[i].id)) {
          item = remove[i].id;
          removeQuantity = document.getElementById(`quantity-${item}`).value;
          price = basketItemsNew[j].price;
          quantity = basketItemsNew[j].quantity;
          productId = basketItemsNew[j].product_id;
          basketId = basket[0].id;
        }
      }
      await updateStock(item, productId, quantity, basketId, removeQuantity, price);
    });
  }
  await shippingAddress();
}

async function shippingAddress() {
  const basket = await getBasket();
  console.log(basket);
  const userDetails = callServer();
  let userId = localStorage.getItem('customerId');
  if (userId === null) {
    userId = userDetails.sub;
  }
  const user = await getUser(userId);
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
    addressBtn.textContent = 'Shipping Address Updated';
    addressBtn.className = 'button_success';
    addressBtn.setAttribute('disabled', 'true');
    storeShippingAddress(shippingAddress);
  });
}

async function storeShippingAddress(shippingAddress) {
  try {
    await fetch('/block/api/add-shipping-address/', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(shippingAddress),
      method: 'PUT',
    });
  } catch (err) {
    errorCheck(err);
  }
}

async function updateOrderDetail(e, productId, orderId, newQuantity, newPrice) {
  const data = {
    id: orderId,
    productId: productId,
    price: newPrice,
    quantity: newQuantity,
  };
  try {
    await fetch('/block/api/update-order-detail/', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      method: 'PUT',
    });
    await getTotalCost(e, productId, orderId, newQuantity, false);
  } catch (err) {
    errorCheck(err);
  }
}

window.addEventListener('load', basketLoad);

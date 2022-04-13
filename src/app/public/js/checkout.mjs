/**
 * @file checkout.mjs
 * @author UP2002753
 * @description Functions for the checkout/basket page
 * @namespace Checkout
 */

import { getUser } from './user.mjs';
import { appendElem } from './store.mjs';
import { callServer } from './authentication.mjs';
import { getBasket } from './basket.mjs';
import errorCheck from './error.mjs';
import resCheck from './responseCheck.mjs';

/**
 * @function getBasketItems
 * @memberof Checkout
 * @param {array} basket - Array of baskets from the specified user
 * @returns {array} - All items in the basket with requested basket id
 */
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

/**
 * @function getProductById
 * @memberof Checkout
 * @param {number} id - Product id
 * @returns {array} - Array of products with the specified id
 */
async function getProductById(id) {
  try {
    const response = await fetch(`/block/api/shop/item/${id}`);
    const result = await response.json();
    return result;
  } catch (err) {
    errorCheck(err);
  }
}

/**
 * @function addTotalCost
 * @memberof Checkout
 * @param {number} id - Product id
 * @param {number} total - New total cost of this product in the basket
 */
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
    })
      .then(response => console.log(resCheck(response)));
  } catch (err) {
    errorCheck(err);
  }
}

/**
 * @function addCheckoutItem
 * @memberof Checkout
 * @param {array} product - Array of products with the specified id
 * @param {number} id - Product id
 * @param {number} quantity - Quantity of the product
 */
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

/**
 * @function getUserAddress
 * @memberof Checkout
 * @description Requests the api for the user details (address and phone number)
 * @description and updates the page with the details
 */
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
    const address = document.createElement('div');
    const addressData = [user.address_line_1, user.address_line_2, user.city, user.county, user.postcode, user.country];
    for (const item of addressData) {
      if (item !== 'null') appendElem(address, 'p', null, null, item, null, null);
    }
    addressBox.appendChild(address);
  } else {
    const text = document.getElementById('shipping_text');
    text.textContent = 'Enter the shipping address below:';
    addressBox.remove();
  }
  addressBox.appendChild(document.createElement('hr'));
}

/**
 * @function removeOrderDetail
 * @memberof Checkout
 * @param {number} id - Product id
 * @param {number} productId - Product id
 * @param {number} basket - Basket id
 * @param {number} quantity - Quantity of the product
 * @description Deletes the item from the basket/order.
 */
async function removeOrderDetail(id, productId, basket, quantity) {
  try {
    await fetch('/block/api/remove-basket-item/', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
      method: 'DELETE',
    })
      .then(response => console.log(resCheck(response)));
    await getTotalCost(id, productId, basket, quantity, true);
  } catch (err) {
    errorCheck(err);
  }
}

/**
 * @function getTotalCost
 * @memberof Checkout
 * @param {number} id - Product id
 * @param {number} productId - Product id
 * @param {number} basket - Basket id
 * @param {number} quantity - Quantity of the product
 * @param {boolean} remove - If the item is being removed from the basket
 * @description Requests the api to retrieve the current total from the db.
 */
async function getTotalCost(id, productId, basket, quantity, remove) {
  try {
    const response = await fetch(`/block/api/get-total-cost/${basket}`);
    const result = await response.json();
    const totalCost = result[0].total_cost;
    updatePageCost(id, productId, totalCost, basket, quantity, remove);
  } catch (err) {
    errorCheck(err);
  }
}

/**
 * @function updatePageCost
 * @memberof Checkout
 * @param {number} id - Product id
 * @param {number} productId - Product id
 * @param {number} totalCost - Total cost of the basket
 * @param {number} basket - Basket id
 * @param {number} quantity - Quantity of the product
 * @param {boolean} remove - If the item is being removed from the basket
 * @description Updates the page with the new total cost.
 */
function updatePageCost(id, productId, totalCost, basket, quantity, remove) {
  const quantitySelect = document.getElementById(`quantity-${id}`);
  const e = document.getElementById(id);
  const price = getProductById(productId);
  let total;
  let itemCost;
  price.then(async (res) => {
    itemCost = (res[0].price * 1000) * parseFloat(quantity) / 1000;
    total = ((totalCost * 1000) - ((res[0].price * 1000) * parseFloat(quantitySelect.value))) / 1000;
    const cost = document.getElementById('totalCost');
    const elem = document.createElement('p');
    elem.className = 'p_basket';
    elem.id = 'totalCost';
    elem.style = 'text-align: center;';
    const main = document.getElementById('price_box');
    elem.innerHTML = `Total: £${total}`;
    main.removeChild(cost);
    main.appendChild(elem);
    if (remove) {
      e.parentElement.parentElement.remove();
    } else {
      e.parentElement.parentElement.childNodes[1].childNodes[1].textContent = `Quantity: ${quantity}`;
      e.parentElement.parentElement.childNodes[1].childNodes[2].textContent = `£${itemCost}`;
      const button = document.getElementById(id);
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

/**
 * @function updateStock
 * @memberof Checkout
 * @param {element} e - The element that was clicked
 * @param {number} id - Product id
 * @param {number} productId - Product id
 * @param {number} basket - Basket id
 * @param {number} removeQuantity - Quantity of the product to be removed from basket
 * @param {number} price - Price of the product
 * @description Updates the stock levels when items are removed from the basket.
 */
async function updateStock(e, id, quantity, basket, removeQuantity, price) {
  const newQuantity = parseFloat(quantity) - parseFloat(removeQuantity);
  const newPrice = (parseFloat(price) / parseFloat(quantity)) * parseFloat(newQuantity);
  const data = {
    productId: id,
    quantity: removeQuantity,
  };
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

/**
 * @function addToStock
 * @memberof Checkout
 * @param {object} data - Product id and quantity
 * @description Calls the api to update the db with new stock count.
 */
async function addToStock(data) {
  try {
    await fetch('/block/api/add-to-stock/', {
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

/**
 * @function basketLoad
 * @memberof Checkout
 * @description Function called when the page loads.
 * Calls the api to retrieve the basket and the products in the basket.
 * Appends the products to the DOM.
 */
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
  /**
   * Event listener for remove button click
   * @memberof Checkout
   */
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

/**
 * @function shippingAddress
 * @memberof Checkout
 * @description Checks the database for the user's shipping address.
 * If the user has not set an address, it will prompt them to set one in order to continue to checkout.
 * If the user has set an address, it will display it in the DOM.
 */
async function shippingAddress() {
  const basket = await getBasket();
  const userDetails = callServer();
  let userId = localStorage.getItem('customerId');
  if (userId === null) {
    userId = userDetails.sub;
  }
  const user = await getUser(userId);
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

/**
 * @function removeOrderDetail
 * @memberof Checkout
 * @param {object} shippingAddress - Shipping address object
 * @description Calls the api to update the shipping address of the order in the db.
 */
async function storeShippingAddress(shippingAddress) {
  try {
    await fetch('/block/api/add-shipping-address/', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(shippingAddress),
      method: 'PUT',
    })
      .then(response => console.log(resCheck(response)));
  } catch (err) {
    errorCheck(err);
  }
}

/**
 * @function updateOrderDetail
 * @memberof Checkout
 * @param {element} e - The element that was clicked
 * @param {number} productId - The product id
 * @param {number} orderId - The order id
 * @param {number} newQuantity - The new quantity of the product
 * @param {number} newprice - The new price of the product
 * @description Calls the api to update the quantity and price of the product in the db.
 */
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
    })
      .then(response => console.log(resCheck(response)));
    await getTotalCost(e, productId, orderId, newQuantity, false);
  } catch (err) {
    errorCheck(err);
  }
}

window.addEventListener('load', basketLoad);

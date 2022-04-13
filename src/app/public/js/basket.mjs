/**
 * @file basket.mjs
 * @author UP2002753
 * @description The functions to call the api for basket data
 * @namespace Basket
 */

import { callServer } from './authentication.mjs';
import errorCheck from './error.mjs';

/**
 * @function getBasket
 * @memberof Basket
 * @returns {array} - Contains all products in the basket
 * @description Gets the basket items from the server
 */
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

/**
 * @function checkExists
 * @memberof Basket
 * @returns {array} - Contains one item from the basket
 * @description Checks if the basket exists in the server
 */
async function checkExists(id) {
  try {
    const response = await fetch(`/block/api/check-exists/${id}`);
    const result = await response.json();
    return result;
  } catch (error) {
    errorCheck(error);
  }
}

/**
 * @function createBasket
 * @memberof Basket
 * @param {object} user - Contains the user details
 * @description Creates a new basket for the user
 */
export default async function createBasket(user) {
  const check = await checkExists(user.sub);
  if (check.length === 0) {
    const data = {
      customerId: user.sub,
      email: user.email,
    };
    try {
      await fetch('/block/api/create-basket/', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(data),
      });
    } catch (err) {
      errorCheck(err);
    }
  } else {
    console.info('Basket already exists');
  }
}

/**
 * @function addToBasket
 * @memberof Basket
 * @param {number} - ProductId
 * @param {element} - Div element, to be retrieve quantity
 * @description Calls the api to add the quantity to the basket/order
 */

async function updateOrderDetail(updateData, data) {
  await fetch('/block/api/update-order-detail/', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify(data),
  });
  updateData = {
    id: data.productId,
    quantity: quantity,
  }
}

export async function addToBasket(productId, page) {
  const userDetails = callServer();
  let customerId = localStorage.getItem('customerId');
  if (customerId === null) {
    customerId = userDetails.sub;
    localStorage.removeItem('customerId');
  }
  const order = await checkExists(customerId);
  const getProduct = await (await fetch(`/block/api/shop/item/${productId}`)).json();
  let quantity;
  if (page === 'store') {
    quantity = 1;
  } else {
    const pageQuantity = document.getElementById(`quantity-${productId}`);
    quantity = parseInt(pageQuantity.value, 10);
  }
  let data = {};
  try {
    data = {
      id: order[0].id,
      productId: productId,
      price: getProduct[0].price,
      quantity: quantity,
    };
  } catch (err) {
    errorCheck(err);
  }
  const checkStock = await getStock(productId, false);
  if (checkStock[0].stock > 0 && (checkStock[0].stock - quantity) >= 0) {
    const check = await fetch(`/block/api/check-order-detail/${productId}-${data.id}`);
    let orderDetail;
    try {
      orderDetail = await check.json();
    } catch (err) {
      errorCheck(err);
    }
    let updateData;
    if (orderDetail.length !== 0) {
      data.quantity = parseInt(data.quantity, 10) + parseInt(orderDetail[0].quantity, 10);
      data.price = (parseFloat(data.price) * parseFloat(data.quantity));
      await updateOrderDetail(updateData, data)
      try {
        await fetch('/block/api/update-order-detail/', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'PUT',
          body: JSON.stringify(data),
        });
        updateData = {
          id: data.productId,
          quantity: quantity,
        };
      } catch (err) {
        errorCheck(err);
      }
    } else {
      try {
        await fetch('/block/api/add-to-basket/', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(data),
        });
        updateData = {
          id: productId,
          quantity: quantity,
        };
      } catch (err) {
        errorCheck(err);
      }
    }
    try {
      await fetch('/block/api/update-stock/', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify(updateData),
      });
    } catch (err) {
      errorCheck(err);
    }
    try {
      await getStock(productId, true);
    } catch (err) {
      errorCheck(err);
    }
    const button = document.getElementById(`add-${productId}`);
    button.className = 'add_btn_success';
    button.innerHTML = `Added x${quantity}`;
    setTimeout(function () {
      button.className = 'add_btn';
      button.innerHTML = 'Add to Basket';
    }, 1000);
  } else {
    console.log('out of stock, cannot update');
    const button = document.getElementById(`add-${productId}`);
    button.className = 'add_btn_fail';
    button.innerHTML = 'Not Available';
    setTimeout(function () {
      button.className = 'add_btn';
      button.innerHTML = 'Add to Basket';
    }, 1000);
  }
}

/**
 * @function getStock
 * @memberof Basket
 * @param {number} - Product's id
 * @param {boolean} - If true, will update the stock
 * @description Updates the live stock count on the page
 */
async function getStock(productId, update) {
  try {
    const stock = await fetch(`/block/api/get-stock/${productId}`);
    const result = stock.json();
    result.then((data) => {
      if (update === true) {
        const card = document.getElementById(`card-${productId}`);
        const cardBody = card.querySelector('.card-body');
        cardBody.querySelector('.stock').innerHTML = `Stock: ${data[0].stock}`;
      }
    });
    return result;
  } catch (err) {
    errorCheck(err);
  }
}

/**
 * @function checkExists
 * @memberof Basket
 * @param {object} user - Contains the user details
 * @description Checks if the user has a basket already, if so uodates the basket
 */
export async function updateBasket(user) {
  try {
    await fetch(checkExists(user));
  } catch (err) {
    errorCheck(err);
  }
}

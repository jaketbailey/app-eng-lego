import { callServer } from './authentication.mjs';
import errorCheck from './error.mjs';

async function checkExists(id) {
  try {
    const response = await fetch(`/block/api/check-exists/${id}`);
    const result = await response.json();
    return result;
  } catch (error) {
    errorCheck(error);
  }
}

export default async function createBasket(user) {
  const check = await checkExists(user.sub);
  console.log(check);
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
  console.log(checkStock);
  console.log(productId);
  if (checkStock[0].stock > 0 && (checkStock[0].stock - quantity) >= 0) {
    const check = await fetch(`/block/api/check-order-detail/${productId}-${data.id}`);
    let orderDetail;
    try {
      orderDetail = await check.json();
    } catch (err) {
      errorCheck(err);
    }
    let updateData;
    console.log(orderDetail);
    if (orderDetail.length !== 0) {
      data.quantity = parseInt(data.quantity, 10) + parseInt(orderDetail[0].quantity, 10);
      data.price = (parseFloat(data.price) * parseFloat(data.quantity));
      console.log(`new quantity: ${data.quantity}`);
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

async function getStock(productId, update) {
  try {
    const stock = await fetch(`/block/api/get-stock/${productId}`);
    const result = stock.json();
    result.then((data) => {
      console.log(data[0].stock);
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

export async function updateBasket(user) {
  try {
    await fetch(checkExists(user));
  } catch (err) {
    errorCheck(err);
  }
}

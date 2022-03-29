import { callServer } from './authentication.mjs';

async function checkExists(id) {
  const response = await fetch(`/block/api/check-exists/${id}`);
  const result = await response.json();
  return result;
}

export default async function createBasket(user) {
  const check = await checkExists(user.sub);
  console.log(check);
  if (check.length === 0) {
    const data = {
      customerId: user.sub,
      email: user.email,
    };
    console.log(data);
    const response = await fetch('/block/api/create-basket/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);
  } else {
    console.log('basket already exists');
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
    quantity = document.getElementById(`quantity-${productId}`).value;
  }
  console.log(quantity);
  console.log(getProduct);
  console.log(order);
  let data = {};
  console.log(order[0].id);
  data = {
    id: order[0].id,
    productId: productId,
    price: getProduct[0].price,
    quantity: quantity,
  };
  const checkStock = await getStock(productId, false);
  console.log(checkStock);
  console.log(productId);
  if (checkStock[0].stock > 0 && (checkStock[0].stock - quantity) >= 0) {
    const check = await fetch(`/block/api/check-order-detail/${productId}-${data.id}`);
    const orderDetail = await check.json();
    let updateData;
    let response;
    console.log(orderDetail);
    if (orderDetail.length !== 0) {
      data.quantity = parseInt(data.quantity, 10) + parseInt(orderDetail[0].quantity, 10);
      data.price = (parseFloat(data.price) * parseFloat(data.quantity));
      console.log(`new quantity: ${data.quantity}`);
      response = await fetch('/block/api/update-order-detail/', {
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
    } else {
      response = await fetch('/block/api/add-to-basket/', {
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
      console.log(updateData);
    }
    const update = await fetch('/block/api/update-stock/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
    await getStock(productId, true);
    const button = document.getElementById(`add-${productId}`);
    console.log(button);
    button.className = 'add_btn_success';
    button.innerHTML = `Added x${quantity}`;
    setTimeout(function () {
      button.className = 'add_btn';
      button.innerHTML = 'Add to Basket';
    }, 1000);
    console.log(button);
    const result = await response.json();
    console.log(result);
    const result2 = await update.json();
    console.log(result2);
  } else {
    console.log('out of stock, cannot update');
    const button = document.getElementById(`add-${productId}`);
    console.log(button);
    button.className = 'add_btn_fail';
    button.innerHTML = 'Not Available';
    setTimeout(function () {
      button.className = 'add_btn';
      button.innerHTML = 'Add to Basket';
    }, 1000);
  }
}

async function getStock(productId, update) {
  const stock = await fetch(`/block/api/get-stock/${productId}`);
  const result = stock.json();
  result.then((data) => {
    console.log(data[0].stock);
    if (update === true) {
      const card = document.getElementById(`card-${productId}`);
      const cardBody = card.querySelector('.card-body');
      console.log(cardBody);
      console.log(card);
      cardBody.querySelector('.stock').innerHTML = `Stock: ${data[0].stock}`;
    }
  });
  return result;
}

export async function updateBasket(user, productId) {
  console.log(user);
  console.log(productId);
  const check = await fetch(checkExists(user));
  console.log(check);
}

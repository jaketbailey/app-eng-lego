async function findPrevious() {
  const response = await fetch('/get-previous-order/');
  const result = await response.json();
  return result;
}

async function checkExists(id) {
  const response = await fetch(`/check-exists/${id}`);
  const result = await response.json();
  return result;
}

export default async function createBasket(user) {
  const previousData = await findPrevious();
  const check = await checkExists(user.sub);
  console.log(check);
  let id = 0;
  console.log(previousData);
  if (previousData.length !== 0) {
    id = previousData[0].id + 1;
  }
  if (check.length === 0) {
    const data = {
      id: id,
      customerId: user.sub,
      email: user.email,
    };
    console.log('testhere');
    console.log(data);
    const response = await fetch('/create-basket/', {
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

export async function addToBasket(productId) {
  console.log('test');
  const customerId = localStorage.getItem('customerId');
  const order = await checkExists(customerId);
  const getProduct = await (await fetch(`/shop/item/${productId}`)).json();
  console.log(getProduct);
  console.log(order);
  let data = {};
  console.log(order[0].id);
  data = {
    id: order[0].id,
    productId: productId,
    price: getProduct[0].price,
  };
  const response = await fetch('/add-to-basket/', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  });
  const updateData = {
    id: productId,
    quantity: 1,
  };
  console.log(updateData);
  const update = await fetch('/update-stock/', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify(updateData),
  });
  await getStock(productId);
  const result = await response.json();
  console.log(result);
  const result2 = await update.json();
  console.log(result2);
}

async function getStock(productId) {
  const stock = await fetch(`/get-stock/${productId}`);
  const result = stock.json();
  result.then((data) => {
    console.log(data[0].stock);
    const card = document.getElementById(`card-${productId}`);
    const cardBody = card.querySelector('.card-body');
    console.log(cardBody);
    console.log(card);
    cardBody.querySelector('.stock').innerHTML = `Stock: ${data[0].stock}`;
  });
}

export async function updateBasket(user, productId) {
  console.log(user);
  console.log(productId);
  const check = await checkExists(user);
  console.log(check);
}

import createBasket from './basket.mjs';

export default async function createUser(user) {
  console.log(user.sub);
  const response = await fetch('/create-user/', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(user),
  });
  await createBasket(user);
  const result = await response.json();
  console.log(result);
}

export async function updateUser(address) {
  const response = await fetch('/update-user/', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify(address),
  });
  const result = await response.json();
  console.log(result);
}

export async function getUser(id) {
  const response = await fetch(`/get-user/${id}`);
  const result = await response.json();
  return result[0];
}

export async function getBasketId(id) {
  const response = await fetch(`/get-basket/${id}`);
  const result = await response.json();
  return result[0];
}

export async function deleteUser() {
  const id = localStorage.getItem('customerId');

  const orderDetails = await (await fetch(`/get-order-id/${id}`)).json();
  console.log(orderDetails);
  const orderId = orderDetails[0].id;

  const response = await fetch('/delete-user', {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: id, orderId: orderId }),
  });
  const result = await response.json();
  return result;
}

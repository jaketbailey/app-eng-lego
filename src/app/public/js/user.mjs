import createBasket from './basket.mjs';
import errorCheck from './error.mjs';

export async function createUser(user) {
  console.log(user.sub);
  const response = await fetch('/block/api/create-user/', {
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
  const response = await fetch('/block/api/update-user/', {
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
  const response = await fetch(`/block/api/get-user/${id}`);
  const result = await response.json();
  return result[0];
}

export async function getBasketId(id) {
  const response = await fetch(`/block/api/get-basket/${id}`);
  const result = await response.json();
  return result[0];
}

export async function deleteUser(id, orderId) {
  console.log('Delete');
  if (id.split('-')[0] === 'unregistered') {
    const response = await fetch('/block/api/delete-user', {
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
}

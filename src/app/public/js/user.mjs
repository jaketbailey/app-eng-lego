import createBasket from './basket.mjs';
import errorCheck from './error.mjs';

export async function createUser(user) {
  try {
    await fetch('/block/api/create-user/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(user),
    });
    await createBasket(user);
  } catch (err) {
    errorCheck(err);
  }
}

export async function updateUser(address) {
  try {
    await fetch('/block/api/update-user/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(address),
    });
  } catch (err) {
    errorCheck(err);
  }
}

export async function getUser(id) {
  try {
    const response = await fetch(`/block/api/get-user/${id}`);
    const result = await response.json();
    return result[0];
  } catch (err) {
    errorCheck(err);
  }
}

export async function getBasketId(id) {
  try {
    const response = await fetch(`/block/api/get-basket/${id}`);
    const result = await response.json();
    return result[0];
  } catch (err) {
    errorCheck(err);
  }
}

export async function deleteUser(id, orderId) {
  console.log('Delete');
  if (id.split('-')[0] === 'unregistered') {
    try {
      await fetch('/block/api/delete-user', {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id, orderId: orderId }),
      });
    } catch (err) {
      errorCheck(err);
    }
  }
}

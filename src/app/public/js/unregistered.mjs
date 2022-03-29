import { createUser } from './user.mjs';
import createBasket from './basket.mjs';
import { callServer } from './authentication.mjs';
import errorCheck from './error.mjs';

const charList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const charLength = charList.length;

function generateRandomString(length) {
  let id = '';
  for (let i = 0; i < length; i++) {
    id += charList.charAt(Math.floor(Math.random() * charLength));
  }
  return id;
}

export default async function generateUnregistered() {
  const userDetails = callServer();
  const check = localStorage.getItem('customerId');
  if (userDetails.sub === undefined || check.split('-')[0] !== 'unregistered') {
    const unregisteredId = `unregistered-${generateRandomString(20)}`;
    localStorage.setItem('customerId', unregisteredId);
    const unregistered = {
      sub: unregisteredId,
      name: 'Unregistered Unregistered',
      email: 'Unregistered',
    };
    await createUser(unregistered);
    await createBasket(unregistered);
  }
}

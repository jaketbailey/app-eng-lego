import { updateUser, getUser } from './user.mjs';

export default function loadAccountPage(user) {
  console.log(user);
  const main = document.getElementById('main');
  const box = document.getElementById('main_box');
  const image = document.createElement('img');
  image.src = user.picture;
  image.className = 'profile-pic';
  box.appendChild(image);
  const greeting = document.createElement('h2');
  greeting.textContent = `Welcome to your account, ${user.name}`;
  greeting.className = 'account_header';
  box.appendChild(greeting);
  const email = document.createElement('p');
  email.className = 'p_accounts';
  email.textContent = `Email: ${user.email}`;
  main.prepend(email);
  const address = document.createElement('p');
  address.className = 'p_accounts';
  console.log(user.sub);
  const userData = getUser(user.sub);
  userData.then((res) => {
    const check = res.address_line_1;
    console.log(`check: ${check}`);
    if (check !== null) {
      address.appendChild(document.createElement('hr'));
      address.appendChild(document.createTextNode('Address: '));
      address.appendChild(document.createElement('br'));
      for (const [key, value] of Object.entries(res)) {
        if (key !== 'phone' && value !== 'null') {
          address.appendChild(document.createTextNode(`${value}`));
          address.appendChild(document.createElement('br'));
        }
      }
      address.appendChild(document.createElement('hr'));
      address.appendChild(document.createTextNode('Phone: '));
      address.appendChild(document.createElement('br'));
      address.appendChild(document.createTextNode(`${res.phone}`));
    } else {
      address.appendChild(document.createElement('hr'));
      address.appendChild(document.createTextNode('No Address'));
      address.appendChild(document.createElement('hr'));
      address.appendChild(document.createTextNode('No Phone'));
    }
    main.appendChild(address);
    const button = document.getElementById('submit_address');
    button.addEventListener('click', () => {
      updateAddress(user);
    });
  });
}

function updateAddress(user) {
  const input = document.getElementsByClassName('update');
  const address = {
    id: user.sub,
    address1: input[0].value,
    address2: input[1].value,
    city: input[2].value,
    county: input[3].value,
    postcode: input[4].value,
    country: input[5].value,
    phone: input[6].value,
  };
  if (address.address2 === '') {
    address.address2 = null;
  }
  if (address.country === '') {
    address.country = null;
  }
  console.log(address);
  updateUser(address);
}

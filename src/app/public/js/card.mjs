import getData from './store.mjs';
// import { authCheck } from './authentication.mjs';

const createCard = (id, name, desc, img, price, stock) => {
  const card = document.createElement('div');
  card.className = 'card';
  card.id = `card-${id}`;
  card.innerHTML = `
  <img class="store" src="/public/images/store/${img}.jpg" alt="${name}" width="200">
  <div class="card-body">
    <p>${name}</p>
    <p>£${price}</p>
    <p id="stock">Stock: ${stock}</p>
  </div>
  <a id="${id}" href="/shop/add/?id=${id}" class="store_btn">Add to Cart</a>
  <a href="/shop/item/?id=${id}" class="store_btn">View Details</a>
  `;
  console.log(card);
  return card;
};

const addCard = (params) => {
  const page = document.getElementById('page');
  let cards;
  const filterObj = [];
  for (const pair of params.entries()) {
    filterObj.push(pair[1]);
  }
  console.log(filterObj);
  if (window.location.pathname === '/shop/add/') {
    getData(`/shop/add/${filterObj[0]}`);
  } else {
    console.log('test');
    if (filterObj.length === 0) {
      cards = getData('/shop/all');
    } else {
      cards = getData(`/shop/filter/${filterObj.join(',')}`);
    }
  }
  cards.then((res) => {
    console.log(res.length);
    for (let i = 0; i < res.length; i++) {
      page.appendChild(document.createElement('div'));
      page.lastChild.appendChild(createCard(res[i].id, res[i].product_name, res[i].product_desc, res[i].image_ref, res[i].price, res[i].stock));
    }
  });
};

const load = () => {
  const params = new URLSearchParams(window.location.search);
  console.log(params);
  addCard(params);
};

window.addEventListener('load', load);

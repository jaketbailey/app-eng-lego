import getData from './store.mjs';
import { addToBasket } from './basket.mjs';
import filter from './filters.mjs';
// import { authCheck } from './authentication.mjs';

const createCard = (id, name, desc, img, price, stock) => {
  const page = document.getElementById('page');
  page.appendChild(document.createElement('div'));
  const card = document.createElement('div');
  card.className = 'card';
  card.id = `card-${id}`;
  card.innerHTML = `
  <img class="store" src="/public/images/store/${img}.jpg" alt="${name}" width="200">
  <div class="card-body">
    <p>${name}</p>
    <p>£${price}</p>
    <p class="stock">Stock: ${stock}</p>
  </div>
  <button class="add_btn">Add to Basket</button>
  <a href="/shop/item/?id=${id}" class="store_btn">View Details</a>
  `;
  console.log(card);
  page.lastChild.appendChild(card);
  return card;
};

const addCard = (params) => {
  let cards;
  const filterObj = [];
  let check = false;
  const productTypes = ['brick', 'set', 'plate'];
  let actualType = '';
  const productSize = ['2x2', '2x4', '1x2', '1x8', '4x8'];
  for (const pair of params.entries()) {
    filterObj.push(pair[1]);
  }
  console.log(filterObj);
  console.log(filterObj.join(','));
  if (filterObj.length === 0) {
    cards = getData('/shop/all');
  } else {
    cards = filter(filterObj);
    console.log(cards);
    console.log('vgusdfgihkji')
    // cards = getData(`/shop/filter/${filterObj.join(',')}`);
  }
  cards.then((res) => {
    console.log(res.length);
    console.log(res);
    for (let i = 0; i < res.length; i++) {
      createCard(res[i].id, res[i].product_name, res[i].product_desc, res[i].image_ref, res[i].price, res[i].stock);
    }
    checkForAdd();
  });
};

export function checkForAdd() {
  const addBtn = document.querySelectorAll('.add_btn');
  console.log(addBtn);
  for (let i = 0; i < addBtn.length; i++) {
    addBtn[i].addEventListener('click', async () => {
      const id = addBtn[i].parentElement.id.split('-')[1];
      console.log(id);
      console.log(addBtn[i].parentElement);
      await addToBasket(id);
    });
  }
}

const load = () => {
  const params = new URLSearchParams(window.location.search);
  console.log(params);
  addCard(params);
};

window.addEventListener('load', load);

import { getData, appendElem } from './store.mjs';
import { addToBasket } from './basket.mjs';
import filter from './filters.mjs';

export const createCard = (id, name, desc, img, price, stock, storePage) => {
  const page = document.getElementById('page');
  const outerDiv = document.createElement('div');
  outerDiv.classList.add('outerCard');
  page.appendChild(outerDiv);
  const card = document.createElement('div');
  card.className = 'card';
  card.id = `card-${id}`;
  appendElem(card, 'img', null, 'store', null, `/public/images/store/${img}.jpg`, null);
  const innerDiv = appendElem(card, 'div', null, 'card-body', null, null, null);
  appendElem(innerDiv, 'p', null, null, name, null, null);
  if (storePage === 'item') {
    appendElem(innerDiv, 'p', null, null, desc, null, null);
  }
  appendElem(innerDiv, 'p', null, null, `£${price}`, null, null);
  const quantityParagraph = appendElem(innerDiv, 'p', null, null, 'Quantity:', null, null);
  const select = appendElem(quantityParagraph, 'select', `quantity-${id}`, 'quantity', null, null, null);
  for (let i = 1; i < 5; i++) {
    appendElem(select, 'option', null, null, i, null, i);
  }
  appendElem(innerDiv, 'p', null, 'stock', `Stock: ${stock}`, null, null);
  appendElem(card, 'button', `add-${id}`, 'add_btn', 'Add to Basket', null, null);
  if (storePage === 'store') {
    appendElem(card, 'a', null, 'store_btn', 'View Details', `/shop/item/?id=${id}`, null);
  }
  console.log(card);
  page.lastChild.appendChild(card);
  return card;
};

const addCard = (params) => {
  let cards;
  const filterObj = [];
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
  }
  cards.then((res) => {
    console.log(res.length);
    console.log(res);
    for (let i = 0; i < res.length; i++) {
      createCard(res[i].id, res[i].product_name, res[i].product_desc, res[i].image_ref, res[i].price, res[i].stock, 'store');
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

import { getData, appendElem } from './store.mjs';
import { checkForAdd } from './card.mjs';

const createPage = (id, name, desc, img, price, stock) => {
  const page = document.createElement('div');
  console.log(page);
  const card = appendElem(page, 'div', `card-${id}`, 'card', null, null, null);
  card.style = 'margin-left: auto; margin-right: auto; margin-top: 2em';
  const innerDiv = appendElem(card, 'div', null, 'card-body', null, null, null);
  const image = appendElem(innerDiv, 'img', null, 'store', null, `/public/images/store/${img}.jpg`, null);
  image.style = 'width:11em';
  const innerInnerDiv = appendElem(innerDiv, 'div', null, 'card-body', null, null, null);
  appendElem(innerInnerDiv, 'p', null, null, desc, null, null);
  appendElem(innerInnerDiv, 'p', null, null, `£${price}`, null, null);
  appendElem(innerInnerDiv, 'p', null, 'stock', `Stock: ${stock}`, null, null);
  appendElem(card, 'button', `add-${id}`, 'add_btn', 'Add to Basket', null, null);
  appendElem(page, 'h2', null, 'title_main', name, null, null);
  page.appendChild(card);
  return page;
};

const load = () => {
  const page = document.getElementById('page');
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  const id = params.id;
  const items = getData(`/shop/item/${id}`);
  items.then((res) => {
    for (let i = 0; i < res.length; i++) {
      page.appendChild(document.createElement('div'));
      page.lastChild.appendChild(createPage(res[i].id, res[i].product_name, res[i].product_desc, res[i].image_ref, res[i].price, res[i].stock));
    }
    checkForAdd();
  });
};

window.addEventListener('load', load);

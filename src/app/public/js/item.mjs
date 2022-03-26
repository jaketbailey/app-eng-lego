import { getData } from './store.mjs';
import { checkForAdd, createCard } from './card.mjs';

const load = () => {
  const page = document.getElementById('page');
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  const id = params.id;
  const items = getData(`/shop/item/${id}`);
  items.then((res) => {
    page.appendChild(document.createElement('div'));
    page.lastChild.appendChild(createCard(res[0].id, res[0].product_name, res[0].product_desc, res[0].image_ref, res[0].price, res[0].stock, 'item'));
    checkForAdd();
  });
};

window.addEventListener('load', load);

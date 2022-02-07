import getData from './store.mjs';
import { checkForAdd } from './card.mjs';

const createPage = (id, name, desc, img, price, stock) => {
  const page = document.createElement('div');
  page.className = 'page';
  page.innerHTML = `
  <div id="card-${id}">
    <div class="card-body">
      <h2 class="title_main">${name}</h2>
      <img class="store" src="/public/images/store/${img}.jpg" alt="${name}" width="200">
      <div class="page-body">
        <p>${desc}</p>
        <p>£${price}</p>
        <p class="stock">Stock: ${stock}</p>
      </div>
    </div>
    <button id="add-${id}" class="add_btn">Add to Basket</button>
  </div>
  `;
  console.log(page);
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

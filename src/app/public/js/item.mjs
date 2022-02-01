import getData from './gatherDB.mjs';

const createPage = (id, name, desc, img, price) => {
  const page = document.createElement('div');
  page.className = 'page';
  page.innerHTML = `
  <h2 class="title_main">${name}</h2>
  <img class="store" src="/public/images/store/${img}.jpg" alt="${name}" width="200">
  <div class="page-body">
    <p>${desc}</p>
    <p>£${price}</p>
  </div>
  <a href="/shop" class="store_btn">Add to Cart</button>
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
    for (let i = 0; i < res[0].length; i++) {
      page.appendChild(document.createElement('div'));
      page.lastChild.appendChild(createPage(res[0][i].id, res[0][i].product_name, res[0][i].product_desc, res[0][i].image_ref, res[0][i].price));
      console.log(res[0]);
    }
  });
};

window.addEventListener('load', load);

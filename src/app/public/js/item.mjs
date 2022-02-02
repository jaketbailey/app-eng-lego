import getData from './store.mjs';

const createPage = (id, name, desc, img, price, stock) => {
  const page = document.createElement('div');
  page.className = 'page';
  page.innerHTML = `
  <h2 class="title_main">${name}</h2>
  <img class="store" src="/public/images/store/${img}.jpg" alt="${name}" width="200">
  <div class="page-body">
    <p>${desc}</p>
    <p>£${price}</p>
    <p id="stock">Stock: ${stock}</p>
  </div>
  <a id=${id} href="/shop/add/?id=${id}" class="store_btn">Add to Cart</button>
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
  });
};

window.addEventListener('load', load);

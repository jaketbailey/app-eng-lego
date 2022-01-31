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
    res.forEach((item) => {
      page.appendChild(document.createElement('div'));
      page.lastChild.appendChild(createPage(item.id, item.product_name, item.product_desc, item.image_ref, item.price));
      console.log(item);
    });
  });
  console.log(items);
};

window.addEventListener('load', load);

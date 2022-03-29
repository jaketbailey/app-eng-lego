import { getData, appendElem } from './store.mjs';
import checkForAdd from './add.mjs';
import errorCheck from './error.mjs';

const load = () => {
  console.log('test');
  const page = document.getElementById('page');
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  const id = params.id;
  const items = getData(`/shop/item/${id}`);
  items.then((res) => {
    const product = res[0];
    page.appendChild(document.createElement('div'));
    const item = appendElem(page.lastChild, 'div', `card-${product.id}`, 'itemPage', null, null, null);
    appendElem(item, 'img', null, 'store', null, `/public/images/store/${product.image_ref}.jpg`, `item-${product.id}`);
    const innerDiv = appendElem(item, 'div', null, 'card-body', null, null, null);
    appendElem(innerDiv, 'p', null, null, product.product_name, null, null);
    appendElem(innerDiv, 'p', null, null, product.product_desc, null, null);
    appendElem(innerDiv, 'p', null, 'stock', `Stock: ${product.stock}`, null, null);
    const quantityParagraph = appendElem(innerDiv, 'p', null, null, 'Quantity:', null, null);
    const select = appendElem(quantityParagraph, 'select', `quantity-${product.id}`, 'quantity', null, null, null);
    for (let i = 1; i < 5; i++) {
      appendElem(select, 'option', null, null, i, null, i);
    }
    appendElem(item, 'button', `add-${product.id}`, 'add_btn', 'Add to Basket', null, null);
    const img = document.createElement('img');
    img.src = `/public/images/store/${product.image_ref}.jpg`;
    checkForAdd('item');
  });
};

window.addEventListener('load', load);

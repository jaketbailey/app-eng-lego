import { getData, appendElem } from './store.mjs';
import checkForAdd from './add.mjs';

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
    const image = appendElem(item, 'img', null, 'store', null, `/public/images/store/${product.image_ref}.jpg`, `item-${product.id}`);
    image.classList.add('item-image');
    const innerDiv = appendElem(item, 'div', null, 'card-body', null, null, null);
    innerDiv.classList.add('item-inner');
    appendElem(innerDiv, 'p', null, null, product.product_name, null, null);
    appendElem(innerDiv, 'p', null, null, product.product_desc, null, null);
    appendElem(innerDiv, 'p', null, 'stock', `Stock: ${product.stock}`, null, null);
    const quantityParagraph = appendElem(innerDiv, 'p', null, null, 'Quantity:', null, null);
    const quantityInput = document.createElement('input');
    quantityInput.setAttribute('type', 'number');
    quantityInput.setAttribute('min', '1');
    quantityInput.setAttribute('max', '10');
    quantityInput.setAttribute('value', '1');
    quantityInput.setAttribute('id', `quantity-${product.id}`);
    quantityInput.setAttribute('class', 'quantity');
    quantityParagraph.appendChild(quantityInput);
    appendElem(item, 'button', `add-${product.id}`, 'add_btn', 'Add to Basket', null, null);
    const img = document.createElement('img');
    img.src = `/public/images/store/${product.image_ref}.jpg`;
    checkForAdd('item');
  });
};

window.addEventListener('load', load);
// appendElem(parent, type, id, className, text, src, value)

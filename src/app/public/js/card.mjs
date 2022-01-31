import getData from './gatherDB.mjs';

const createCard = (id, name, desc, img, price, i) => {
  const card = document.createElement('div');
  card.className = 'card';
  card.id = `card-${id}`;
  card.innerHTML = `
  <img class="store" src="/public/images/store/${img}.jpg" alt="${name}" width="200">
  <div class="card-body">
    <p>${name}</p>
    <p>${desc}</p>
    <p>£${price}</p>
  </div>
  <a href="/shop" class="store_btn">Add to Cart</button>
  <a href="/shop/:${id}" class="store_btn">View Details</button>
  `;
  console.log(card);
  return card;
};

const load = () => {
  const page = document.getElementById('page');
  const cards = getData('/shop/all');
  cards.then((res) => {
    res.forEach((card, i) => {
      page.appendChild(document.createElement('div'));
      page.lastChild.appendChild(createCard(card.id, card.product_name, card.product_desc, card.image_ref, card.price, i));
      console.log(card);
    });
  });
  console.log(cards);
  // const text = 'Card Element';
  // for (let i = 0; i < 5; i++) {
  //   page.appendChild(document.createElement('div'));
  //   page.lastChild.appendChild(createCard(text, i));
  // }
};

const addData = () => {

}

window.addEventListener('load', load);

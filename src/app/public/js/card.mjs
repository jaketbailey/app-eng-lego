import getData from './gatherDB.mjs';

const createCard = (id, name, desc, img, price) => {
  const card = document.createElement('div');
  card.className = 'card';
  card.id = `card-${id}`;
  card.innerHTML = `
  <img class="store" src="/public/images/store/${img}.jpg" alt="${name}" width="200">
  <div class="card-body">
    <p>${name}</p>
    <p>£${price}</p>
  </div>
  <a href="/shop" class="store_btn">Add to Cart</button>
  <a href="/shop/item/?id=${id}" class="store_btn">View Details</button>
  `;
  console.log(card);
  return card;
};

const addCard = (params) => {
  const page = document.getElementById('page');
  let cards;
  const filterObj = [];
  for (const pair of params.entries()) {
    filterObj.push(pair[1]);
  }
  console.log(filterObj);
  if (filterObj.length === 0) {
    cards = getData('/shop/all');
  } else {
    cards = getData(`/shop/filter/${filterObj.join(',')}`);
  }
  cards.then((res) => {
    for (let i = 0; i < res[0].length; i++) {
      page.appendChild(document.createElement('div'));
      page.lastChild.appendChild(createCard(res[0][i].id, res[0][i].product_name, res[0][i].product_desc, res[0][i].image_ref, res[0][i].price));
      console.log(res[0]);
    }
    // res.forEach((card) => {
    //   page.appendChild(document.createElement('div'));
    //   page.lastChild.appendChild(createCard(card.id, card.product_name, card.product_desc, card.image_ref, card.price));
    //   console.log(card[0]);
    // });
  });
  console.log(cards);
};

const load = () => {
  const params = new URLSearchParams(window.location.search);
  console.log(params);
  addCard(params);
};

window.addEventListener('load', load);

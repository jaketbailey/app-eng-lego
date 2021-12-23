const createCard = (text, i) => {
  const card = document.createElement('div');
  card.className = 'card';
  card.id = `card-${i}`;
  card.textContent = text;
  return card;
};

const load = () => {
  const page = document.getElementById('page');
  const text = 'Card Element';
  for (let i = 0; i < 5; i++) {
    page.appendChild(document.createElement('div'));
    page.lastChild.appendChild(createCard(text, i));
  }
};

window.addEventListener('load', load);

const createCard = () => {
  const card = document.createElement('div');
  card.className = 'card';
  card.textContent = 'This is a test';
  return card;
};

const load = () => {
  const page = document.getElementById('page');
  for (let i = 0; i < 48; i++) {
    page.appendChild(document.createElement('div'));
    page.lastChild.appendChild(createCard());
  }
};

window.addEventListener('load', load);

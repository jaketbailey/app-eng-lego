import { addToBasket } from './basket.mjs';

export default function (page) {
  const addBtn = document.querySelectorAll('.add_btn');
  for (let i = 0; i < addBtn.length; i++) {
    addBtn[i].addEventListener('click', async () => {
      const id = addBtn[i].parentElement.id.split('-')[1];
      await addToBasket(id, page);
    });
  }
}

import { addToBasket } from './basket.mjs';

export default function (page) {
  const addBtn = document.querySelectorAll('.add_btn');
  console.log(addBtn);
  for (let i = 0; i < addBtn.length; i++) {
    addBtn[i].addEventListener('click', async () => {
      const id = addBtn[i].parentElement.id.split('-')[1];
      console.log(id);
      console.log(addBtn[i].parentElement);
      await addToBasket(id, page);
    });
  }
}

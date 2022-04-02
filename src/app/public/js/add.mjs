import { addToBasket } from './basket.mjs';

/**
 * @file add.mjs
 * @author UP2002753
 * @description Event listener for the add to basket button
 * @namespace Add
 */

/**
 * @function eventListener
 * @memberof Add
 * @param {element} page
 * @description Adds event listener to the add to basket button
 */
export default function (page) {
  const addBtn = document.querySelectorAll('.add_btn');
  for (let i = 0; i < addBtn.length; i++) {
    addBtn[i].addEventListener('click', async () => {
      const id = addBtn[i].parentElement.id.split('-')[1];
      await addToBasket(id, page);
    });
  }
}

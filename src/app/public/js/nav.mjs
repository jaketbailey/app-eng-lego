/**
 * @file nav.mjs
 * @author UP2002753
 * @description Basic js for the hamburger navbar menu
 * @namespace Nav
 */

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', mobileMenu);

/**
 * @function mobileMenu
 * @memberof Nav
 * @description Toggle the mobile menu
 */
function mobileMenu() {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
  if (hamburger.classList[1] === 'active') {
    document.addEventListener('scroll', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  }
}

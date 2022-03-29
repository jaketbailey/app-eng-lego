const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', mobileMenu);

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

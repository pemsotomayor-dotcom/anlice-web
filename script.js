const menu = document.querySelector('.menu');
const nav = document.querySelector('#main-nav');

function closeMenu() {
  nav?.classList.remove('is-open');
  menu?.setAttribute('aria-expanded', 'false');
  menu?.setAttribute('aria-label', 'Abrir menú');
}

menu?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  menu.setAttribute('aria-expanded', String(isOpen));
  menu.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
});

nav?.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menu.focus();
  }
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('header')) closeMenu();
});

window.matchMedia('(min-width: 1101px)').addEventListener('change', closeMenu);

document.getElementById('contactForm')?.addEventListener('submit', (event) => {
  event.preventDefault();
  document.getElementById('formMsg').textContent = 'Formulario listo. Conectaremos el envío antes de publicar.';
});

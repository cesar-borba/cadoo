const menuActivator = document.getElementById('menuActivator');
const sideMenu = document.getElementById('sideMenu');

menuActivator.addEventListener('click', (e) => {
  e.stopPropagation();
  sideMenu.classList.toggle('open');
});

document.addEventListener('click', (e) => {
  if (
    sideMenu.classList.contains('open') &&
    !sideMenu.contains(e.target) &&
    e.target !== menuActivator
  ) {
    sideMenu.classList.remove('open');
  }
});
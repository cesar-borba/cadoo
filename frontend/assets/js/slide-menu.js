const menuActivator = document.getElementById('menuActivator');
const sideMenu = document.getElementById('sideMenu');
const menuTela = document.querySelector('.menu-tela');

menuActivator.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
});

document.addEventListener('click', (e) => {
    if (
        sideMenu.classList.contains('open') &&
        !sideMenu.contains(e.target) &&
        e.target !== menuActivator
    ) {
        toggleMenu();
    }
});

function toggleMenu() {
    sideMenu.classList.toggle('open');
    
    // Adiciona ou remove a classe fixed do menu-tela
    if (sideMenu.classList.contains('open')) {
        menuTela.classList.add('menu-tela--fixed');
    } else {
        menuTela.classList.remove('menu-tela--fixed');
    }
}
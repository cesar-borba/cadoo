function toggleModoEscuro() {
    const root = document.documentElement;
    if (root.dataset.tema === 'escuro') {
        root.dataset.tema = '';
        localStorage.setItem('tema', '');
    } else {
        root.dataset.tema = 'escuro';
        localStorage.setItem('tema', 'escuro');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Verifica e aplica o tema salvo
    const temaAtual = localStorage.getItem('tema');
    if (temaAtual === 'escuro') {
        document.documentElement.dataset.tema = 'escuro';
    }

    // Setup do toggle button na página de config
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.checked = temaAtual === 'escuro';
        darkModeToggle.addEventListener('change', toggleModoEscuro);
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const temaAtual = localStorage.getItem('tema');
    if (temaAtual === 'escuro') {
        document.documentElement.dataset.tema = 'escuro';
    }
});
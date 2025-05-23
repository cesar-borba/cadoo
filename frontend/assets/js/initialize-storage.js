const loadJSON = async (filename) => {
    try {
        const response = await fetch(`../assets/data/${filename}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Erro ao carregar ${filename}:`, error);
        return null;
    }
};

const initializeStorage = async () => {
    if (!localStorage.getItem('employees')) {
        const membrosData = await loadJSON('membros.json');
        if (membrosData) {
            localStorage.setItem('employees', JSON.stringify(membrosData.employees));
            console.log('Dados de membros carregados!');
        }
    }

    if (!localStorage.getItem('groups')) {
        const gruposData = await loadJSON('grupos.json');
        if (gruposData) {
            localStorage.setItem('groups', JSON.stringify(gruposData.groups));
            console.log('Dados de grupos carregados!');
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    initializeStorage().catch(console.error);
});
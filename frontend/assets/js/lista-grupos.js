const container = document.getElementById("group-container");
const searchButton = document.getElementById("searchButton");

// Carrega grupos do localStorage
const getGroups = () => {
    return JSON.parse(localStorage.getItem('groups') || '[]');
};

const formatarData = (data) => {
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
};

// Função para renderizar os grupos
function renderizarGrupos(gruposFiltrados = getGroups()) {
    container.innerHTML = '';

    if (gruposFiltrados.length === 0) {
        container.innerHTML = '<p class="no-results">Nenhum grupo encontrado.</p>';
        return;
    }

    gruposFiltrados.forEach(grupo => {
        const card = document.createElement("div");
        card.className = "card";
        card.dataset.id = grupo.id;
        card.innerHTML = `
            <div class="card-header">
                <i class="fa-solid fa-users"></i>
                <h2>${grupo.titulo}</h2>
            </div>
            <div class="card-divider"></div>
            <div class="card-content">
                ${grupo.endereco ? `
                    <div class="card-info">
                        <i class="fa-solid fa-location-dot"></i>
                        <span>${grupo.endereco}</span>
                    </div>` : ''
                }
                <div class="card-info">
                    <i class="fa-solid fa-calendar-days"></i>
                    <span>${formatarData(grupo.data)}</span>
                </div>
                <div class="card-info">
                    <i class="fa-solid fa-user-group"></i>
                    <span>${grupo.membros} ${grupo.membros === 1 ? 'membro' : 'membros'}</span>
                </div>
            </div>
        `;
        
        card.addEventListener('click', (e) => {
            if (selectionState.isSelectionMode) {
                handleCardSelection(e, grupo.id);
            } else {
                window.location.href = `detalhes-grupo.html?id=${grupo.id}`;
            }
        });

        container.appendChild(card);
    });
}

const handleCardSelection = (event, groupId) => {
    const card = event.currentTarget;
    
    if (selectionState.selectedGroups.has(groupId)) {
        selectionState.selectedGroups.delete(groupId);
        card.classList.remove('selected');
    } else {
        selectionState.selectedGroups.add(groupId);
        card.classList.add('selected');
    }
    
    const groups = getGroups();
    selectionInfo.innerHTML = `<i class="fa-solid fa-users"></i> (${selectionState.selectedGroups.size}/${groups.length}) selecionados`;
};

searchButton.addEventListener('click', () => {
    const searchInput = document.getElementById("searchInput");
    const searchTerm = searchInput.value.toLowerCase();
    const grupos = getGroups();

    const gruposFiltrados = grupos.filter(grupo => 
        grupo.titulo.toLowerCase().includes(searchTerm)
    );

    renderizarGrupos(gruposFiltrados);
});

const includeButton = document.getElementById("includeButton");
const deleteButton = document.getElementById("deleteButton");
const selectionState = {
    selectedGroups: new Set(),
    isSelectionMode: false
};

const selectionInfo = document.getElementById('selectionInfo');

const toggleButtonState = (button, newClass, newText) => {
    // Remove todas as classes de estilo possíveis
    button.classList.remove('include-btn', 'cancel-btn', 'delete-btn', 'search-btn');
    // Adiciona apenas a nova classe
    button.classList.add(newClass);
    button.textContent = newText;
};

includeButton.addEventListener('click', () => {
    if (selectionState.isSelectionMode) {
        disableSelectionMode();
    } else {
        window.location.href = 'incluir-grupo.html';
    }
});

deleteButton.addEventListener('click', () => {
    if (!selectionState.isSelectionMode) {
        selectionState.isSelectionMode = true;
        toggleButtonState(includeButton, 'cancel-btn', 'Cancelar');
        selectionInfo.innerHTML = `<i class="fa-solid fa-users"></i> (0/${getGroups().length}) selecionados`;
        enableSelectionMode();
    } else {
        // Confirma exclusão
        if (selectionState.selectedGroups.size > 0) {
            const confirmed = confirm(`Deseja excluir ${selectionState.selectedGroups.size} grupos?`);
            if (confirmed) {
                deleteSelectedGroups();
            }
        }
        disableSelectionMode();
    }
});

const enableSelectionMode = () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.add('selectable');
    });
};

const disableSelectionMode = () => {
    selectionState.isSelectionMode = false;
    selectionState.selectedGroups.clear();
    
    toggleButtonState(includeButton, 'include-btn', 'Incluir');
    toggleButtonState(deleteButton, 'delete-btn', 'Excluir');
    
    selectionInfo.textContent = '';
    
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.remove('selectable', 'selected');
    });
};

const toggleCardSelection = (event) => {
    event.preventDefault(); // Prevent navigation to details
    const card = event.currentTarget;
    const groupTitle = card.querySelector('h2').textContent;
    const groups = getGroups();
    const group = groups.find(g => g.titulo === groupTitle);
    
    if (selectionState.selectedGroups.has(group.id)) {
        selectionState.selectedGroups.delete(group.id);
        card.classList.remove('selected');
    } else {
        selectionState.selectedGroups.add(group.id);
        card.classList.add('selected');
    }
    
    includeButton.innerHTML = `(${selectionState.selectedGroups.size}/${groups.length}) selecionados`;
};

const deleteSelectedGroups = () => {
    const groups = getGroups();
    // Filter out selected groups
    const updatedGroups = groups.filter(group => !selectionState.selectedGroups.has(group.id));
    
    // Update localStorage
    localStorage.setItem('groups', JSON.stringify(updatedGroups));
    
    // Render updated list
    renderizarGrupos(updatedGroups);
    disableSelectionMode();
};
const employees = JSON.parse(localStorage.getItem('employees')) || []

const searchButton = document.getElementById("searchButton");
const sortState = {
  current: {
    field: 'id',
    direction: 'asc'
  }
};

function createHeaderRow() {
  return `
    <div class="header-row">
      <div class="header-icon">
        <i class="fa-solid fa-list"></i>
      </div>
      <div class="header-id-name">
        <div class="header-column">
          <span data-sort="id" class="sortable ${sortState.current.field === 'id' ? `sort-indicator ${sortState.current.direction}` : ''}">
            ID
          </span>
        </div>
        <div class="header-column">
          <span data-sort="nome" class="sortable ${sortState.current.field === 'nome' ? `sort-indicator ${sortState.current.direction}` : ''}">
            NOME
          </span>
        </div>
      </div>
      <div class="header-column">
        <span data-sort="grupos" class="sortable ${sortState.current.field === 'grupos' ? `sort-indicator ${sortState.current.direction}` : ''}">
          Nº GRUPOS
        </span>
      </div>
    </div>
  `;
}

function sortEmployees(field, employeesToSort) {
  document.querySelectorAll('.sortable').forEach(el => {
    el.classList.remove('sort-indicator', 'asc', 'desc');
  });

  sortState.current.direction = sortState.current.field === field
    ? (sortState.current.direction === 'asc' ? 'desc' : 'asc')
    : 'asc';
  sortState.current.field = field;

  const sortedEmployees = [...employeesToSort].sort((a, b) => {
    const comparison = field === 'id' ? a.id - b.id
      : field === 'nome' ? a.nome.localeCompare(b.nome)
        : a.grupos - b.grupos;

    return sortState.current.direction === 'desc' ? -comparison : comparison;
  });

  return sortedEmployees;
}

function renderEmployees(employees) {
  const listContainer = document.getElementById("employeeList");
  listContainer.innerHTML = '';

  if (employees.length > 0) {
    listContainer.innerHTML = createHeaderRow();

    employees.forEach(emp => {
      const card = document.createElement("div");
      card.className = "employee-card";
      card.innerHTML = `
        <div class="employee-info">
          <div class="employee-avatar">
            <i class="fa-solid fa-person"></i>
          </div>
          <span class="employee-id">${emp.id}</span>
          <span class="employee-name">${emp.nome} ${emp.sobrenome}</span>
        </div>
        <div class="employee-field employee-groups">${0} grupo${emp.grupos !== 1 ? 's' : ''}</div>
      `;
      card.addEventListener('click', () => {
            if (!selectionState.isSelectionMode) {
                window.location.href = `detalhes-membro.html?id=${emp.id}`;
            }
        });
      listContainer.appendChild(card);
    });

    addSortListeners(employees);
  } else {
    listContainer.innerHTML = '<p class="no-results">Nenhum membro encontrado.</p>';
  }
}

function addSortListeners(employeesToSort) {
  document.querySelectorAll('.sortable[data-sort]').forEach(header => {
    header.addEventListener('click', () => {
      const sortedEmployees = sortEmployees(header.dataset.sort, employeesToSort);
      renderEmployees(sortedEmployees);
    });
  });
}

searchButton.addEventListener('click', () => {
  const searchInput = document.getElementById("searchInput");
  const searchTerm = searchInput.value.toLowerCase();

  sortState.current.field = 'id';
  sortState.current.direction = 'desc';

  const filteredEmployees = employees.filter(employee => {
    const fullName = `${employee.nome} ${employee.sobrenome}`.toLowerCase();
    return fullName.includes(searchTerm);
  });

  const sortedEmployees = sortEmployees('id', filteredEmployees);
  renderEmployees(sortedEmployees);
});

const includeButton = document.getElementById("includeButton");
const deleteButton = document.getElementById("deleteButton");
const selectionState = {
    selectedEmployees: new Set(),
    isSelectionMode: false
};

// Evento do botão Incluir
includeButton.addEventListener('click', () => {
    if (selectionState.isSelectionMode) {
        // Se estiver em modo de seleção, apenas cancela
        disableSelectionMode();
    } else {
        // Se não estiver em modo de seleção, navega para incluir
        window.location.href = 'incluir-membro.html';
    }
});

// Evento do botão Excluir
deleteButton.addEventListener('click', () => {
    if (!selectionState.isSelectionMode) {
        selectionState.isSelectionMode = true;
        toggleButtonState(includeButton, 'cancel-btn', 'Cancelar');
        const selectionInfo = document.getElementById('selectionInfo');
        selectionInfo.innerHTML = `<i class="fa-solid fa-user-group"></i> (0/${employees.length}) selecionados`;
        enableSelectionMode();
    } else {
        if (selectionState.selectedEmployees.size > 0) {
            const confirmed = confirm(`Deseja excluir ${selectionState.selectedEmployees.size} membros?`);
            if (confirmed) {
                deleteSelectedEmployees();
            }
        }
        disableSelectionMode();
    }
});

const enableSelectionMode = () => {
    const cards = document.querySelectorAll('.employee-card');
    cards.forEach(card => {
        card.classList.add('selectable');
        card.addEventListener('click', toggleCardSelection);
    });
};

const disableSelectionMode = () => {
    selectionState.isSelectionMode = false;
    selectionState.selectedEmployees.clear();
    
    toggleButtonState(includeButton, 'include-btn', 'Incluir');
    toggleButtonState(deleteButton, 'delete-btn', 'Excluir');
    
    const selectionInfo = document.getElementById('selectionInfo');
    if (selectionInfo) selectionInfo.textContent = '';
    
    const cards = document.querySelectorAll('.employee-card');
    cards.forEach(card => {
        card.classList.remove('selectable', 'selected');
    });
};

const toggleCardSelection = (event) => {
    const card = event.currentTarget;
    const employeeId = parseInt(card.querySelector('.employee-id').textContent);
    
    if (selectionState.selectedEmployees.has(employeeId)) {
        selectionState.selectedEmployees.delete(employeeId);
        card.classList.remove('selected');
    } else {
        selectionState.selectedEmployees.add(employeeId);
        card.classList.add('selected');
    }
    
    const selectionInfo = document.getElementById('selectionInfo');
    if (selectionInfo) {
        selectionInfo.innerHTML = `<i class="fa-solid fa-user-group"></i> (${selectionState.selectedEmployees.size}/${employees.length}) selecionados`;
    }
};

const deleteSelectedEmployees = () => {
    // Filtra os membros, removendo os selecionados
    const updatedEmployees = employees.filter(emp => !selectionState.selectedEmployees.has(emp.id));
    
    // Atualiza o array local
    employees.length = 0;
    employees.push(...updatedEmployees);
    
    // Atualiza o localStorage
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    
    // Renderiza a lista atualizada
    renderEmployees(employees);
    disableSelectionMode();
};

const toggleButtonState = (button, newClass, newText) => {
    // Remove todas as classes de estilo possíveis
    button.classList.remove('include-btn', 'cancel-btn', 'delete-btn', 'search-btn');
    // Adiciona apenas a nova classe
    button.classList.add(newClass);
    button.textContent = newText;
};
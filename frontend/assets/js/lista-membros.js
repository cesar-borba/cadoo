const employees = JSON.parse(localStorage.getItem('employees')) || []/* && [
  { id: 101, nome: "Amanda Castro", grupos: 0 },
  { id: 102, nome: "Ricardo Lima", grupos: 4 },
  { id: 1, nome: "César Borba", grupos: 5 },
  { id: 104, nome: "Marcos Pinto", grupos: 3 },
  { id: 105, nome: "Érika Mendes", grupos: 1 },
  { id: 106, nome: "Maria Silva Santos", grupos: 3 },
  { id: 107, nome: "João Silva", grupos: 2 },
  { id: 108, nome: "Pedro Otos", grupos: 1 },
  { id: 110, nome: "Lucas Oliveira", grupos: 5 },
  { id: 111, nome: "Mariana Costa", grupos: 2 },
  { id: 112, nome: "José Silva", grupos: 3 },
  { id: 113, nome: "Carla Sanliveira", grupos: 4 },
  { id: 109, nome: "Ana Santos", grupos: 4 },
  { id: 114, nome: "Rafael Pereira", grupos: 1 },
  { id: 115, nome: "Juliana Costa", grupos: 5 },
  { id: 116, nome: "Fernando Oliveira", grupos: 2 },
  { id: 117, nome: "Patricia Santos Silva", grupos: 3 },
  { id: 118, nome: "Bruno Lima", grupos: 4 },
  { id: 119, nome: "Camila Pereira", grupos: 1 },
  { id: 120, nome: "Daniel Costa Santos", grupos: 5 },
  { id: 121, nome: "Laura Silva", grupos: 2 },
  { id: 122, nome: "Rodrigo Santos", grupos: 3 },
  { id: 123, nome: "Isabella Oliveira", grupos: 4 },
  { id: 124, nome: "Thiago Lima", grupos: 1 },
  { id: 125, nome: "Beatriz Pereira Costa", grupos: 5 },
  { id: 126, nome: "Gabriel Santos", grupos: 2 },
  { id: 127, nome: "Carolina Lima Silva", grupos: 3 },
  { id: 128, nome: "Marcelo Oliveira", grupos: 4 },
  { id: 129, nome: "Fernanda Costa", grupos: 1 },
  { id: 130, nome: "André Silva Santos", grupos: 5 },
  { id: 131, nome: "Luciana Pereira", grupos: 2 },
  { id: 132, nome: "Paulo Lima", grupos: 3 },
  { id: 133, nome: "Amanda Santos", grupos: 4 },
  { id: 134, nome: "Ricardo Oliveira Costa", grupos: 1 },
  { id: 135, nome: "Débora Silva", grupos: 5 }
]*/;

// const employees = [];
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

  // Atualiza a direção da ordenação
  sortState.current.direction = sortState.current.field === field
    ? (sortState.current.direction === 'asc' ? 'desc' : 'asc')
    : 'asc';
  sortState.current.field = field;

  // Aplica a ordenação
  const sortedEmployees = [...employeesToSort].sort((a, b) => {
    const comparison = field === 'id' ? a.id - b.id
      : field === 'nome' ? a.nome.localeCompare(b.nome)
        : a.grupos - b.grupos;

    // Corrigindo a lógica: asc deve ser crescente (comparison normal)
    // desc deve ser decrescente (comparison invertido)
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
          <span class="employee-name">${emp.nome}</span>
        </div>
        <div class="employee-field employee-groups">${0} grupo${emp.grupos !== 1 ? 's' : ''}</div>
      `;
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

  const filteredEmployees = employees.filter(employee =>
    employee.nome.toLowerCase().includes(searchTerm)
  );

  const sortedEmployees = sortEmployees('id', filteredEmployees);
  renderEmployees(sortedEmployees);
});

// ...existing code...

const includeButton = document.getElementById("includeButton");
const deleteButton = document.getElementById("deleteButton");
const selectionState = {
    selectedEmployees: new Set(),
    isSelectionMode: false
};

// Evento do botão Incluir
includeButton.addEventListener('click', () => {
    window.location.href = 'incluir-membro.html';
});

// Evento do botão Excluir
deleteButton.addEventListener('click', () => {
    if (!selectionState.isSelectionMode) {
        // Inicia modo de seleção
        selectionState.isSelectionMode = true;
        includeButton.innerHTML = `(0/${employees.length}) selecionados`;
        deleteButton.textContent = "Confirmar Exclusão";
        enableSelectionMode();
    } else {
        // Confirma exclusão
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
    includeButton.textContent = "Incluir";
    deleteButton.textContent = "Excluir";
    
    const cards = document.querySelectorAll('.employee-card');
    cards.forEach(card => {
        card.classList.remove('selectable', 'selected');
        card.removeEventListener('click', toggleCardSelection);
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
    
    includeButton.innerHTML = `(${selectionState.selectedEmployees.size}/${employees.length}) selecionados`;
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
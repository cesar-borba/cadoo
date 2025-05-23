document.addEventListener('DOMContentLoaded', () => {
    // Elementos do formulário
    const form = document.getElementById('groupForm');
    const temDataCheckbox = document.getElementById('temData');
    const dataInput = document.getElementById('data');
    const temEnderecoCheckbox = document.getElementById('temEndereco');
    const enderecoSection = document.querySelector('h2.form-section-title:nth-of-type(2)').nextElementSibling;
    
    // Configuração inicial dos campos
    dataInput.disabled = true;
    enderecoSection.style.display = 'none';
    const enderecoInputs = enderecoSection.querySelectorAll('input, select');
    enderecoInputs.forEach(input => input.disabled = true);

    // Handler para o checkbox de data
    temDataCheckbox.addEventListener('change', () => {
        if (temDataCheckbox.checked) {
            dataInput.removeAttribute('disabled');
            dataInput.focus();
        } else {
            dataInput.setAttribute('disabled', '');
            dataInput.value = '';
        }
    });

    // Handler para o checkbox de endereço
    temEnderecoCheckbox.addEventListener('change', () => {
        const isChecked = temEnderecoCheckbox.checked;
        enderecoSection.style.display = isChecked ? 'block' : 'none';
        
        enderecoInputs.forEach(input => {
            if (isChecked) {
                input.removeAttribute('disabled');
            } else {
                input.setAttribute('disabled', '');
                input.value = '';
            }
        });

        if (isChecked) {
            enderecoSection.querySelector('input').focus();
        }
    });

    // Handler para submit do formulário
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validações específicas
        if (temDataCheckbox.checked && !dataInput.value) {
            alert('Por favor, preencha a data.');
            dataInput.focus();
            return;
        }

        if (temEnderecoCheckbox.checked) {
            const requiredFields = enderecoSection.querySelectorAll('[required]');
            for (const field of requiredFields) {
                if (!field.value) {
                    alert('Por favor, preencha todos os campos obrigatórios do endereço.');
                    field.focus();
                    return;
                }
            }
        }

        // Preparação dos dados
        const formData = {
            titulo: document.getElementById('titulo').value,
            temData: temDataCheckbox.checked,
            data: temDataCheckbox.checked ? dataInput.value : null,
            temEndereco: temEnderecoCheckbox.checked,
            endereco: temEnderecoCheckbox.checked ? {
                cep: document.getElementById('cep').value,
                rua: document.getElementById('rua').value,
                numero: document.getElementById('numero').value,
                complemento: document.getElementById('complemento').value,
                bairro: document.getElementById('bairro').value,
                cidade: document.getElementById('cidade').value,
                estado: document.getElementById('estado').value
            } : null,
            descricao: document.getElementById('descricao').value
        };

        // Aqui você pode adicionar o código para salvar os dados
        console.log('Dados do formulário:', formData);
    });
});

// ...existing code...

// Estado da seleção de membros
const memberSelectionState = {
    selectedMembers: new Set(),
    isSelectionMode: false
};

// Elementos da seção de membros
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const addMembersButton = document.getElementById('addMembersButton');
const membersList = document.getElementById('membersList');
const selectionInfo = document.getElementById('selectionInfo');

// Carregar membros
let members = [];
fetch('../assets/data/membros.json')
    .then(response => response.json())
    .then(data => {
        members = data.employees;
        renderMembers(members);
    });

// Renderizar membros
function renderMembers(membersToRender) {
    membersList.innerHTML = '';
    
    if (membersToRender.length === 0) {
        membersList.innerHTML = '<p class="no-results">Nenhum membro encontrado.</p>';
        return;
    }

    membersToRender.forEach(member => {
        const card = document.createElement('div');
        card.className = 'member-card';
        if (memberSelectionState.isSelectionMode) {
            card.classList.add('selectable');
        }
        if (memberSelectionState.selectedMembers.has(member.id)) {
            card.classList.add('selected');
        }

        card.innerHTML = `
            <div class="member-info">
                <div class="member-avatar">
                    <i class="fa-solid fa-user-group"></i>
                </div>
                <span class="member-id">${member.id}</span>
                <span class="member-name">${member.nome} ${member.sobrenome}</span>
            </div>
        `;

        card.addEventListener('click', () => toggleMemberSelection(member, card));
        membersList.appendChild(card);
    });
}

// Pesquisar membros
searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredMembers = members.filter(member => {
        const fullName = `${member.nome} ${member.sobrenome}`.toLowerCase();
        return fullName.includes(searchTerm);
    });
    renderMembers(filteredMembers);
});

// Toggle seleção de membro
function toggleMemberSelection(member, card) {
    if (!memberSelectionState.isSelectionMode) return;

    if (memberSelectionState.selectedMembers.has(member.id)) {
        memberSelectionState.selectedMembers.delete(member.id);
        card.classList.remove('selected');
    } else {
        memberSelectionState.selectedMembers.add(member.id);
        card.classList.add('selected');
    }

    updateSelectionInfo();
}

// Atualizar informação de seleção
function updateSelectionInfo() {
    if (memberSelectionState.isSelectionMode) {
        selectionInfo.innerHTML = `<i class="fa-solid fa-user-group"></i> (${memberSelectionState.selectedMembers.size}/${members.length}) selecionados`;
    } else {
        selectionInfo.textContent = '';
    }
}

// Handler do botão Adicionar
addMembersButton.addEventListener('click', () => {
    if (!memberSelectionState.isSelectionMode) {
        memberSelectionState.isSelectionMode = true;
        addMembersButton.textContent = 'Confirmar';
        addMembersButton.classList.remove('include-btn');
        addMembersButton.classList.add('save-btn');
        document.querySelectorAll('.member-card').forEach(card => card.classList.add('selectable'));
        updateSelectionInfo();
    } else {
        const selectedMembers = Array.from(memberSelectionState.selectedMembers);
        console.log('Membros selecionados:', selectedMembers);
        
        // Reset selection mode
        memberSelectionState.isSelectionMode = false;
        memberSelectionState.selectedMembers.clear();
        addMembersButton.textContent = 'Adicionar';
        addMembersButton.classList.remove('save-btn');
        addMembersButton.classList.add('include-btn');
        document.querySelectorAll('.member-card').forEach(card => card.classList.remove('selectable', 'selected'));
        updateSelectionInfo();
    }
});
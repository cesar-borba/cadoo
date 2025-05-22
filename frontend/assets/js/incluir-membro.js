const memberForm = document.getElementById('memberForm');

const getNextAvailableId = (employees) => {
    const existingIds = employees.map(emp => emp.id).sort((a, b) => a - b);
    let nextId = 1;
    for (const currentId of existingIds) {
        if (currentId > nextId) {
            return nextId;
        }
        nextId = currentId + 1;
    }
    return nextId;
};

memberForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Recupera os membros existentes
    const existingEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
    
    // Cria o novo membro com campos individuais
    const newMember = {
        id: getNextAvailableId(existingEmployees),
        nome: document.getElementById('nome').value,
        sobrenome: document.getElementById('sobrenome').value,
        cpf: document.getElementById('cpf').value,
        dataNascimento: document.getElementById('dataNascimento').value,
        sexo: document.getElementById('sexo').value,
        estadoCivil: document.getElementById('estadoCivil').value,
        nomeMae: document.getElementById('nomeMae').value,
        nomePai: document.getElementById('nomePai').value,
        temFilhos: document.getElementById('temFilhos').checked,
        cep: document.getElementById('cep').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value,
        bairro: document.getElementById('bairro').value,
        rua: document.getElementById('rua').value,
        numero: document.getElementById('numero').value,
        complemento: document.getElementById('complemento').value,
        telefone: document.getElementById('telefone').value,
        email: document.getElementById('email').value
    };
    
    // Adiciona o novo membro
    existingEmployees.push(newMember);
    
    // Salva no localStorage
    localStorage.setItem('employees', JSON.stringify(existingEmployees));
    
    alert('Membro incluído com sucesso!');
    window.location.href = 'lista-membros.html';
});
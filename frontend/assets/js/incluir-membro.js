const memberForm = document.getElementById('memberForm');

memberForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newMember = {
        id: Date.now(),
        nome: document.getElementById('nome').value,
        grupos: parseInt(document.getElementById('grupos').value)
    };
    
    // Recupera os membros existentes do localStorage ou inicia um array vazio
    const existingEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
    
    // Adiciona o novo membro
    existingEmployees.push(newMember);
    
    // Salva o array atualizado no localStorage
    localStorage.setItem('employees', JSON.stringify(existingEmployees));
    
    alert('Membro incluído com sucesso!');
    window.location.href = 'lista-membros.html';
});
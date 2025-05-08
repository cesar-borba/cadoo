document.addEventListener('DOMContentLoaded', () => {
    // Recupera os dados do grupo do localStorage
    const grupo = JSON.parse(localStorage.getItem('grupoSelecionado'));
    
    if (!grupo) {
        window.location.href = 'lista-grupos.html';
        return;
    }

    // Preenche os detalhes do grupo
    document.getElementById('grupo-titulo').textContent = grupo.titulo;
    document.getElementById('grupo-info').innerHTML = `
        ${grupo.endereco ? `<p><strong>Endereço:</strong> ${grupo.endereco}</p>` : ''}
        <p><strong>Membros:</strong> ${grupo.membros}</p>
        <p><strong>Data:</strong> ${grupo.data}</p>
        <p><strong>Cor:</strong> ${grupo.cor}</p>
    `;
});

function voltarPagina() {
    window.history.back();
}
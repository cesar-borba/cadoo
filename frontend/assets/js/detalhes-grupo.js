document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const grupoId = parseInt(params.get('id'));
    
    const groups = JSON.parse(localStorage.getItem('groups') || '[]');
    const grupo = groups.find(g => g.id === grupoId);

    const grupoTitulo = document.getElementById('grupo-titulo');
    const detalhesGrupo = document.getElementById('detalhes-grupo');

    if (grupo && grupoTitulo && detalhesGrupo) {
        grupoTitulo.textContent = grupo.titulo;
        
        detalhesGrupo.innerHTML = `
            <div class="info-item">
                <span class="info-label">Título:</span>
                <span class="info-value">${grupo.titulo}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Endereço:</span>
                <span class="info-value">${grupo.endereco || '-'}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Membros:</span>
                <span class="info-value">${grupo.membros}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Data:</span>
                <span class="info-value">${grupo.data}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Cor:</span>
                <span class="info-value" style="color: ${grupo.cor}">${grupo.cor}</span>
            </div>
        `;
    }
});

function voltarListaGrupos() {
    window.location.href = 'lista-grupos.html';
}
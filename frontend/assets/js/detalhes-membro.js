document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const membroId = parseInt(params.get('id'));
    
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    const membro = employees.find(emp => emp.id === membroId);

    if (membro) {
        document.getElementById('membro-titulo').textContent = `${membro.nome} ${membro.sobrenome}`;
        
        // Renderiza Dados Pessoais
        const dadosPessoais = document.getElementById('dados-pessoais');
        dadosPessoais.innerHTML = `
            <div class="info-item">
                <span class="info-label">Nome:</span>
                <span class="info-value">${membro.nome} ${membro.sobrenome}</span>
            </div>
            <div class="info-item">
                <span class="info-label">CPF:</span>
                <span class="info-value">${membro.cpf}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Data de Nascimento:</span>
                <span class="info-value">${new Date(membro.dataNascimento).toLocaleDateString()}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Sexo:</span>
                <span class="info-value">${membro.sexo === 'M' ? 'Masculino' : 'Feminino'}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Estado Civil:</span>
                <span class="info-value">${membro.estadoCivil}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Nome da Mãe:</span>
                <span class="info-value">${membro.nomeMae}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Nome do Pai:</span>
                <span class="info-value">${membro.nomePai}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Tem Filhos:</span>
                <span class="info-value">${membro.temFilhos ? 'Sim' : 'Não'}</span>
            </div>
        `;

        // Renderiza Endereço
        const endereco = document.getElementById('endereco');
        endereco.innerHTML = `
            <div class="info-item">
                <span class="info-label">CEP:</span>
                <span class="info-value">${membro.cep}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Cidade:</span>
                <span class="info-value">${membro.cidade}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Estado:</span>
                <span class="info-value">${membro.estado}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Bairro:</span>
                <span class="info-value">${membro.bairro}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Rua:</span>
                <span class="info-value">${membro.rua}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Número:</span>
                <span class="info-value">${membro.numero}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Complemento:</span>
                <span class="info-value">${membro.complemento || '-'}</span>
            </div>
        `;

        // Renderiza Contato
        const contato = document.getElementById('contato');
        contato.innerHTML = `
            <div class="info-item">
                <span class="info-label">Telefone:</span>
                <span class="info-value">${membro.telefone}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Email:</span>
                <span class="info-value">${membro.email}</span>
            </div>
        `;
    }
});

function voltarListaMembros() {
    window.location.href = 'lista-membros.html';
}
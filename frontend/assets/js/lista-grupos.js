const grupos = [
  { titulo: "Encontro Jovem", endereco: "Rua das Flores, 123", membros: 24, data: "2025-05-20", cor: "vermelho" },
  { titulo: "Grupo de Casais", endereco: "Av. Central, 45", membros: 18, data: "2025-05-21", cor: "azul claro" },
  { titulo: "Estudo Bíblico", endereco: "", membros: 12, data: "2025-05-22", cor: "amarelo" },
  { titulo: "Louvor & Adoração", endereco: "Rua da Paz, 89", membros: 30, data: "2025-05-23", cor: "roxo" },
  { titulo: "Grupo de Oração", endereco: "Capela Santa Luzia", membros: 15, data: "2025-05-24", cor: "verde" },
  { titulo: "Grupo de Jovens Adultos", endereco: "Salão Paroquial", membros: 21, data: "2025-05-25", cor: "laranja" },
  { titulo: "Grupo de Mulheres", endereco: "", membros: 20, data: "2025-05-26", cor: "rosa claro" },
  { titulo: "Ministério de Música", endereco: "Estúdio Musical", membros: 10, data: "2025-05-27", cor: "azul escuro" },
  { titulo: "Grupo de Homens", endereco: "Centro Comunitário", membros: 17, data: "2025-05-28", cor: "cinza" },
  { titulo: "Célula Alfa Teste string muito", endereco: "", membros: 8, data: "2025-05-29", cor: "verde limão" },
  { titulo: "Célula Beta", endereco: "Rua do Sol, 111", membros: 14, data: "2025-05-30", cor: "marrom" },
  { titulo: "Célula Gama", endereco: "Av. Brasil, 200", membros: 13, data: "2025-06-01", cor: "turquesa" },
  { titulo: "Encontro Teens", endereco: "", membros: 25, data: "2025-06-02", cor: "azul petróleo" },
  { titulo: "Grupo de Intercessão", endereco: "Sala de Oração", membros: 19, data: "2025-06-03", cor: "verde musgo" },
  { titulo: "Grupo Missionário", endereco: "Igreja Matriz", membros: 22, data: "2025-06-04", cor: "bege" },
  { titulo: "Célula Restaurar", endereco: "Rua do Amor, 77", membros: 13, data: "2025-06-05", cor: "turquesa" },
  { titulo: "Grupo de Discipulado", endereco: "Salão Social", membros: 16, data: "2025-06-06", cor: "azul marinho" },
  { titulo: "Encontro de Fé", endereco: "Igreja Nova Aliança", membros: 27, data: "2025-06-07", cor: "dourado" },
  { titulo: "Célula Vida Nova", endereco: "Rua Esperança, 88", membros: 14, data: "2025-06-08", cor: "lavanda" },
  { titulo: "Grupo de Louvor Noturno", endereco: "Capela Central", membros: 9, data: "2025-06-09", cor: "vinho" },
  { titulo: "Ministério Infantil", endereco: "Sala Kids", membros: 12, data: "2025-06-10", cor: "pêssego" },
  { titulo: "Jovens em Cristo", endereco: "Salão da Juventude", membros: 22, data: "2025-06-11", cor: "verde oliva" },
  { titulo: "Grupo Família de Deus", endereco: "Rua da Unidade, 101", membros: 18, data: "2025-06-12", cor: "pérola" },
  { titulo: "Célula Ágape", endereco: "", membros: 10, data: "2025-06-13", cor: "rosa claro" },
  { titulo: "Grupo Nova Vida", endereco: "Centro Esperança", membros: 15, data: "2025-06-14", cor: "verde limão" }
];

const container = document.getElementById("group-container");

const searchButton = document.getElementById("searchButton");

// Função para renderizar os grupos
function renderizarGrupos(gruposFiltrados = grupos) {
  container.innerHTML = '';

  gruposFiltrados.forEach(grupo => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
          <h2>${grupo.titulo}</h2>
          ${grupo.endereco ? `<p><span class="highlight">Endereço:</span> ${grupo.endereco}</p>` : ""}
          <p><span class="highlight">Membros:</span> ${grupo.membros}</p>
          <p><span class="highlight">Data:</span> ${grupo.data}</p>
      `;
      
      // Adiciona evento de clique no card
      card.addEventListener('click', () => {
          navegarParaDetalhes(grupo);
      });

      container.appendChild(card);
  });
}

function navegarParaDetalhes(grupo) {
  // Salva os dados do grupo no localStorage
  localStorage.setItem('grupoSelecionado', JSON.stringify(grupo));
  // Redireciona para a página de detalhes
  window.location.href = 'detalhes-grupo.html';
}

// Event listener para o botão de pesquisa
searchButton.addEventListener('click', () => {
    const searchInput = document.getElementById("searchInput");
    const searchTerm = searchInput.value.toLowerCase();

    // Filtra os grupos baseado no termo de pesquisa
    const gruposFiltrados = grupos.filter(grupo => 
        grupo.titulo.toLowerCase().includes(searchTerm)
    );

    // Renderiza os grupos filtrados
    renderizarGrupos(gruposFiltrados);
});
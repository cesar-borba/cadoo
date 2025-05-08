const grupos = [
    { titulo: "Encontro Jovem", endereco: "Rua das Flores, 123", membros: 24, data: "2025-05-20" },
    { titulo: "Grupo de Casais", endereco: "Av. Central, 45", membros: 18, data: "2025-05-21" },
    { titulo: "Estudo Bíblico", endereco: "", membros: 12, data: "2025-05-22" },
    { titulo: "Louvor & Adoração", endereco: "Rua da Paz, 89", membros: 30, data: "2025-05-23" },
    { titulo: "Grupo de Oração", endereco: "Capela Santa Luzia", membros: 15, data: "2025-05-24" },
    { titulo: "Grupo de Jovens Adultos", endereco: "Salão Paroquial", membros: 21, data: "2025-05-25" },
    { titulo: "Grupo de Mulheres", endereco: "", membros: 20, data: "2025-05-26" },
    { titulo: "Ministério de Música", endereco: "Estúdio Musical", membros: 10, data: "2025-05-27" },
    { titulo: "Grupo de Homens", endereco: "Centro Comunitário", membros: 17, data: "2025-05-28" },
    { titulo: "Célula Alfa Teste string muito", endereco: "", membros: 8, data: "2025-05-29" },
    { titulo: "Célula Beta", endereco: "Rua do Sol, 111", membros: 14, data: "2025-05-30" },
    { titulo: "Célula Gama", endereco: "Av. Brasil, 200", membros: 13, data: "2025-06-01" },
    { titulo: "Encontro Teens", endereco: "", membros: 25, data: "2025-06-02" },
    { titulo: "Grupo de Intercessão", endereco: "Sala de Oração", membros: 19, data: "2025-06-03" },
    { titulo: "Grupo Missionário", endereco: "Igreja Matriz", membros: 22, data: "2025-06-04" }
  ];

  const container = document.getElementById("group-container");

  grupos.forEach(grupo => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h2>${grupo.titulo}</h2>
      ${grupo.endereco ? `<p><span class="highlight">Endereço:</span> ${grupo.endereco}</p>` : ""}
      <p><span class="highlight">Membros:</span> ${grupo.membros}</p>
      <p><span class="highlight">Data:</span> ${grupo.data}</p>
    `;

    container.appendChild(card);
  });
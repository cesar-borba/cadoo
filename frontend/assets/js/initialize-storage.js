const initialData = {
    employees: [
        {
            id: 1,
            nome: "João",
            sobrenome: "Silva Pereira",
            cpf: "123.456.789-00",
            dataNascimento: "1990-01-01",
            sexo: "M",
            estadoCivil: "solteiro",
            nomeMae: "Maria Silva",
            nomePai: "José Silva",
            temFilhos: false,
            cep: "12345-678",
            cidade: "São Paulo",
            estado: "SP",
            bairro: "Centro",
            rua: "Rua Principal",
            numero: "123",
            complemento: "Apto 1",
            telefone: "(11) 98765-4321",
            email: "joao@email.com"
        },
        {
            id: 2,
            nome: "Maria",
            sobrenome: "Santos Costa",
            cpf: "987.654.321-00",
            dataNascimento: "1992-05-15",
            sexo: "F",
            estadoCivil: "casado",
            nomeMae: "Ana Santos",
            nomePai: "Pedro Costa",
            temFilhos: true,
            cep: "54321-876",
            cidade: "Rio de Janeiro",
            estado: "RJ",
            bairro: "Copacabana",
            rua: "Avenida Atlântica",
            numero: "456",
            complemento: "Bloco B",
            telefone: "(21) 98765-4321",
            email: "maria@email.com"
        },
        {
            id: 3,
            nome: "Pedro",
            sobrenome: "Oliveira Lima",
            cpf: "456.789.123-00",
            dataNascimento: "1988-12-10",
            sexo: "M",
            estadoCivil: "divorciado",
            nomeMae: "Lucia Oliveira",
            nomePai: "Carlos Lima",
            temFilhos: true,
            cep: "98765-432",
            cidade: "Belo Horizonte",
            estado: "MG",
            bairro: "Savassi",
            rua: "Rua da Serra",
            numero: "789",
            complemento: "",
            telefone: "(31) 98765-4321",
            email: "pedro@email.com"
        },
        {
            id: 4,
            nome: "Ana",
            sobrenome: "Ferreira Santos",
            cpf: "789.123.456-00",
            dataNascimento: "1995-08-20",
            sexo: "F",
            estadoCivil: "solteiro",
            nomeMae: "Rosa Ferreira",
            nomePai: "João Santos",
            temFilhos: false,
            cep: "34567-890",
            cidade: "Curitiba",
            estado: "PR",
            bairro: "Batel",
            rua: "Rua das Flores",
            numero: "321",
            complemento: "Sala 502",
            telefone: "(41) 98765-4321",
            email: "ana@email.com"
        },
        {
            id: 5,
            nome: "Lucas",
            sobrenome: "Ribeiro Costa",
            cpf: "321.654.987-00",
            dataNascimento: "1993-03-25",
            sexo: "M",
            estadoCivil: "casado",
            nomeMae: "Julia Ribeiro",
            nomePai: "Marcos Costa",
            temFilhos: true,
            cep: "65432-109",
            cidade: "Salvador",
            estado: "BA",
            bairro: "Barra",
            rua: "Avenida Oceânica",
            numero: "654",
            complemento: "Casa 2",
            telefone: "(71) 98765-4321",
            email: "lucas@email.com"
        }
    ]
};

// Função para inicializar dados
const initializeStorage = () => {
    // Verifica se já existem dados
    if (!localStorage.getItem('employees')) {
        localStorage.setItem('employees', JSON.stringify(initialData.employees));
        console.log('Dados iniciais carregados com sucesso!');
    }
};

// Executa a inicialização
document.addEventListener('DOMContentLoaded', initializeStorage);
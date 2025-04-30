document.getElementById("form-login").addEventListener("submit", (event) => {

    event.preventDefault();

    const emailInput = document.getElementById("email");
    const senhaInput = document.getElementById("senha");
    const mensagemErro = document.getElementById("mensagem-erro");
    const icone = document.getElementById("toggle-senha");

    const email = emailInput.value.trim();
    const senha = senhaInput.value;

    const emailCorreto = "cadoo@email.com";
    const senhaCorreta = "123";

    const correct = email === emailCorreto && senha === senhaCorreta;

    if (correct) {
        mensagemErro.style.display = "none";
        emailInput.classList.remove("erro-campo");
        senhaInput.classList.remove("erro-campo");
        location.href = "pages/principal.html";
    }

    else {
        mensagemErro.style.display = "block";
        emailInput.classList.add("erro-campo");
        senhaInput.classList.add("erro-campo");
        senhaInput.type = "password";
        icone.classList.remove("fa-eye");
        icone.classList.add("fa-eye-slash");
        document.getElementById("form-login").reset();
    }

})

document.getElementById("form-recover").addEventListener("submit", (event) => {

    event.preventDefault();

    const emailInput = document.getElementById("email-recover");
    const mensagemErro = document.getElementById("mensagem-erro-recover");

    const email = emailInput.value.trim();

    const emailCorreto = "cadoo@email.com";

    const correct = email === emailCorreto;

    if (document.getElementById("send-email").value === "Ok") {
        location.href = "index.html";
    }

    else if (correct) {
        mensagemErro.style.display = "none";
        emailInput.classList.remove("erro-campo");
        emailInput.style.display = "none";
        document.getElementById("voltar-recover").style.display="none";
        document.getElementById("send-email").value = "Ok";
        document.getElementById("descricao-recover").innerHTML = "Seu <strong>e-mail</strong> foi enviado! Confira sua caixa de entrada para trocar sua <strong>senha</strong>.";
    }

    else {
        mensagemErro.style.display = "block";
        emailInput.classList.add("erro-campo");
        document.getElementById("form-recover").reset();
    }

})

document.getElementById("form-register").addEventListener("submit", (event) => {

    event.preventDefault();

    const emailInput = document.getElementById("email-register");
    const novaSenhaInput = document.getElementById("nova-senha");
    const redigiteSenhaInput = document.getElementById("redigite-senha");
    const mensagemErro = document.getElementById("mensagem-erro-register");
    const iconeNovaSenha = document.getElementById("toggle-nova-senha");
    const iconeRedigiteSenha = document.getElementById("toggle-redigite-senha");
    
    const email = emailInput.value.trim();
    const novaSenha = novaSenhaInput.value;
    const redigiteSenha = redigiteSenhaInput.value;

    const listaDeEmails = ["cadoo@email.com"];

    const senhaIdentica = novaSenha === redigiteSenha;

    const emailDisponivel = !(listaDeEmails.includes(email));
    
    if (document.getElementById("send-register").value === "Ok") {
        location.href = "index.html";
    }

    else if (senhaIdentica && emailDisponivel) {
        document.getElementById("descricao-register").innerHTML = "Parabéns, você foi <strong>cadastrado</strong>! Clique abaixo para <strong>entrar</strong>.";
        document.getElementById("nome-register").style.display = "none";
        mensagemErro.style.display = "none";
        emailInput.style.display = "none";
        document.getElementById("wrapper-nova-senha").style.display = "none";
        document.getElementById("wrapper-redigite-senha").style.display = "none";
        document.getElementById("voltar-register").style.display="none";
        document.getElementById("send-register").value = "Ok";
    }

    else if (senhaIdentica) {
        mensagemErro.innerHTML = "O endereço de e-mail não está disponível.";
        mensagemErro.style.display = "block";
        novaSenhaInput.classList.remove("erro-campo");
        redigiteSenhaInput.classList.remove("erro-campo");

        emailInput.classList.add("erro-campo");

        novaSenhaInput.type = "password";
        iconeNovaSenha.classList.remove("fa-eye");
        iconeNovaSenha.classList.add("fa-eye-slash");
        redigiteSenhaInput.type = "password";
        iconeRedigiteSenha.classList.remove("fa-eye");
        iconeRedigiteSenha.classList.add("fa-eye-slash");
    }

    else if (emailDisponivel) {
        mensagemErro.innerHTML = "As senhas devem ser idênticas.";
        mensagemErro.style.display = "block";

        emailInput.classList.remove("erro-campo");

        novaSenhaInput.classList.add("erro-campo");
        redigiteSenhaInput.classList.add("erro-campo");

        novaSenhaInput.type = "password";
        iconeNovaSenha.classList.remove("fa-eye");
        iconeNovaSenha.classList.add("fa-eye-slash");
        redigiteSenhaInput.type = "password";
        iconeRedigiteSenha.classList.remove("fa-eye");
        iconeRedigiteSenha.classList.add("fa-eye-slash");
    }

    else {
        mensagemErro.innerHTML = "As senhas devem ser idênticas e o endereço de e-mail não está disponível."
        mensagemErro.style.display = "block";

        emailInput.classList.add("erro-campo");
        novaSenhaInput.classList.add("erro-campo");
        redigiteSenhaInput.classList.add("erro-campo");
        
        novaSenhaInput.type = "password";
        iconeNovaSenha.classList.remove("fa-eye");
        iconeNovaSenha.classList.add("fa-eye-slash");
        redigiteSenhaInput.type = "password";
        iconeRedigiteSenha.classList.remove("fa-eye");
        iconeRedigiteSenha.classList.add("fa-eye-slash");

        document.getElementById("form-register").reset();
    }

})

const icone = document.getElementById("toggle-senha");

icone.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleIcon();
    }
});

icone.addEventListener("click", toggleIcon);

function toggleIcon() {
    const senhaInput = document.getElementById("senha");
    const icone = document.getElementById("toggle-senha");

    if (senhaInput.type === "password") {
        senhaInput.type = "text";
        icone.classList.remove("fa-eye-slash");
        icone.classList.add("fa-eye");
      } else {
        senhaInput.type = "password";
        icone.classList.remove("fa-eye");
        icone.classList.add("fa-eye-slash");
      }
}

const iconeNovaSenha = document.getElementById("toggle-nova-senha");

iconeNovaSenha.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleIconNovaSenha();
    }
});

iconeNovaSenha.addEventListener("click", toggleIconNovaSenha);

function toggleIconNovaSenha() {
    const senhaInput = document.getElementById("nova-senha");
    const icone = document.getElementById("toggle-nova-senha");

    if (senhaInput.type === "password") {
        senhaInput.type = "text";
        icone.classList.remove("fa-eye-slash");
        icone.classList.add("fa-eye");
      } else {
        senhaInput.type = "password";
        icone.classList.remove("fa-eye");
        icone.classList.add("fa-eye-slash");
      }
}

const iconeRedigiteSenha = document.getElementById("toggle-redigite-senha");

iconeRedigiteSenha.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleIconRedigiteSenha();
    }
});

iconeRedigiteSenha.addEventListener("click", toggleIconRedigiteSenha);

function toggleIconRedigiteSenha() {
    const senhaInput = document.getElementById("redigite-senha");
    const icone = document.getElementById("toggle-redigite-senha");

    if (senhaInput.type === "password") {
        senhaInput.type = "text";
        icone.classList.remove("fa-eye-slash");
        icone.classList.add("fa-eye");
      } else {
        senhaInput.type = "password";
        icone.classList.remove("fa-eye");
        icone.classList.add("fa-eye-slash");
      }
}

function mostrarFormulario(id) {

    document.querySelectorAll('form').forEach(f => f.style.display = 'none');
    document.getElementById(id).style.display = 'flex';
    resetLogin();
    resetRecover();
    resetRegister();
  }

function resetLogin() {

    document.getElementById("form-login").reset();
    document.getElementById("email").classList.remove("erro-campo");
    document.getElementById("senha").classList.remove("erro-campo");
    document.getElementById("mensagem-erro").style.display = "none";

    document.getElementById("senha").type = "password";
    icone.classList.remove("fa-eye");
    icone.classList.add("fa-eye-slash");
}

function resetRecover() {

    document.getElementById("form-recover").reset();
    document.getElementById("email-recover").classList.remove("erro-campo");
    document.getElementById("mensagem-erro-recover").style.display = "none";
}

function resetRegister() {

    document.getElementById("mensagem-erro-register").style.display = "none";

    document.getElementById("email-register").classList.remove("erro-campo");
    document.getElementById("nova-senha").classList.remove("erro-campo");
    document.getElementById("redigite-senha").classList.remove("erro-campo");
    
    document.getElementById("form-register").reset();
    document.getElementById("nova-senha").type = "password";
    document.getElementById("redigite-senha").type = "password";
    iconeNovaSenha.classList.remove("fa-eye");
    iconeNovaSenha.classList.add("fa-eye-slash");
    iconeRedigiteSenha.classList.remove("fa-eye");
    iconeRedigiteSenha.classList.add("fa-eye-slash");
}
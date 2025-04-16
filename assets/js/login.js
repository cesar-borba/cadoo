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

    if (email === emailCorreto && senha === senhaCorreta) {
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
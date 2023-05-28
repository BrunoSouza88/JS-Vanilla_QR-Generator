const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const telefoneRegex = /^\+\d{2}\(\d{2}\)\d{9}$/;
const cpfRegex = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;

const onInputChange = (inputId) => {
  const emailInput = document.getElementById("input-email");
  const telefoneInput = document.getElementById("input-telefone");
  const cpfInput = document.getElementById("input-cpf");
  const emailWarning = document.getElementById("email-warning");
  const telefoneWarning = document.getElementById("telefone-warning");
  const cpfWarning = document.getElementById("cpf-warning");

  if (inputId === "input-email") {
    telefoneInput.disabled = emailInput.value.length > 0;
    cpfInput.disabled = emailInput.value.length > 0;
    emailWarning.style.display = emailInput.value.length === 0 || emailRegex.test(emailInput.value) ? "none" : "block";
  } else if (inputId === "input-telefone") {
    emailInput.disabled = telefoneInput.value.length > 0;
    cpfInput.disabled = telefoneInput.value.length > 0;
    telefoneWarning.style.display = telefoneInput.value.length === 0 || telefoneRegex.test(telefoneInput.value) ? "none" : "block";
  } else if (inputId === "input-cpf") {
    emailInput.disabled = cpfInput.value.length > 0;
    telefoneInput.disabled = cpfInput.value.length > 0;
    cpfWarning.style.display = cpfInput.value.length === 0 || cpfRegex.test(cpfInput.value) ? "none" : "block";
  }

  generateQRCode();
};

const formatCPF = (cpf) => {
  return cpf.replace(cpfRegex, "$1.$2.$3-$4");
};
const cpfInput = document.getElementById("input-cpf");

cpfInput.addEventListener("input", function () {
  if (this.value.length > 11) {
    this.value = this.value.slice(0, 11);
  }
});


const formatTelefone = (telefone) => {
  const cleaned = telefone.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{2})(\d{2})(\d{5})(\d{4})$/);
  if (match) {
    const formattedTelefone = `+${match[1]}(${match[2]})${match[3]}-${match[4]}`;
    return formattedTelefone;
  }
  return telefone;
};

const generateQRCode = () => {
  const email = document.getElementById("input-email").value;
  let telefone = document.getElementById("input-telefone").value;
  let cpf = document.getElementById("input-cpf").value;
  const qrcodeElement = document.getElementById("qrcode");
  const emailWarning = document.getElementById("email-warning");
  const telefoneWarning = document.getElementById("telefone-warning");
  const cpfWarning = document.getElementById("cpf-warning");

  let inputText = "";

  if (email && emailRegex.test(email)) {
    inputText = `email: ${email}`;
    emailWarning.style.display = "none";
  } else {
    emailWarning.style.display = email ? "block" : "none";
  }

  if (telefone && telefoneRegex.test(telefone)) {
    telefone = formatTelefone(telefone);
    inputText = `tel: ${telefone}`;
    telefoneWarning.style.display = "none";
  } else {
    telefoneWarning.style.display = telefone ? "block" : "none";
  }

  if (cpf && cpfRegex.test(cpf)) {
    cpf = formatCPF(cpf);
    inputText = `CPF: ${cpf}`;
    cpfWarning.style.display = "none";
  } else {
    cpfWarning.style.display = cpf ? "block" : "none";
  }

  if (!inputText) {
    qrcodeElement.innerHTML = "";
    return;
  }

  while (qrcodeElement.firstChild) {
    qrcodeElement.removeChild(qrcodeElement.firstChild);
  }

  const qrcode = new QRCode(qrcodeElement, {
    text: inputText,
    width: 128,
    height: 128,
  });
};


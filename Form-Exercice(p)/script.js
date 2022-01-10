window.onload = () => {
  const state = document.getElementById("input-state");

  const date = document.getElementById("initial-date");

  const sendBtn = document.getElementById("send-btn");

  const modalCard = document.getElementById("modal-card");

  const modalBtnSave = document.getElementById("modal-btn-save");

  const modalBtnCancel = document.getElementById("modal-btn-cancel");

  const modalContent = document.getElementById("modal-content");

  const modalBtnClose = document.getElementById("modal-btn-close");

  const successContainer = document.getElementById("success-container");

  const inputCpf = document.getElementById("input-cpf")

  const closeSuccess = document.getElementById('close-success');

  const inputs = document.getElementsByTagName("input");

  let childs = 0;  

  let currentYear = new Date().getFullYear();  

  closeSuccess.addEventListener("click", () => {
    // Fecha notificação;
    successContainer.style.bottom = "-20vh";
  });

  inputCpf.addEventListener("blur", (event) => {
    var Soma;
    var Resto;
    Soma = 0;   
    
    if (event.target.value == "00000000000") {
      // Se o CPF inserido for "00000000000" mostra mensagem de erro, zera o valor e sai da função;
      alert("CPF Inválido");
      event.target.value = "";
      return;      
    }
    for (let i = 1; i <= 9; i += 1) {
      // Faz multiplicação do (Nove primeiros dígitos) * (10 ao 2 de forma decrescente) e faz a adição a cada multiplicação;
      Soma = Soma + event.target.value.substring(i-1, i) * (11 - i);      
    }
    Resto = (Soma * 10) % 11;
    
    if ((Resto == 10) || (Resto == 11)) {
      // Se o resto da divisão for 10 ou 11
      Resto = 0;
    }
    if (Resto != event.target.value.substring(9, 10)) {
      // Se o resto não for igual ao primeiro digito verificador do CPF;
      alert("CPF Inválido");
      event.target.value = "";
      return;
    }
	Soma = 0;
    for (let i = 1; i <= 10; i += 1) {
      // Faz multiplicação do (Dez primeiros dígitos) * (11 ao 2 de forma decrescente) e faz a adição a cada multiplicação;
      Soma = Soma + event.target.value.substring(i-1, i) * (12 - i);
    }
    Resto = (Soma * 10) % 11;
    
    if ((Resto == 10) || (Resto == 11)) {
      // Se o resto da divisão for 10 ou 11
      Resto = 0;
    }
    if (Resto != event.target.value.substring(10, 11)) {
      // Se o resto não for igual ao último digito verificador do CPF;
      alert("CPF Inválido");
      event.target.value = "";
      return;
    }
    let cpfFormater = [];
    // Array vazia para formatação do CPF;

    for (let index = 0; index < event.target.value.length; index += 1) {
      // Percorre a CPF e adiciona cada numero 1 por 1 no cpfFormater
      cpfFormater.push(event.target.value[index]);      
    }
    event.target.value = "";
    // Zera a caixa de input do CPF
    cpfFormater.splice(3, 0, ".");
    cpfFormater.splice(7, 0, ".");
    cpfFormater.splice(11, 0, "-");
    // Formata corretamente o CPF
    if (!isNaN(cpfFormater[0])) {
      event.target.value = `${cpfFormater.join("")}`;
      // insire o CPF formatado no input;
    }
});

inputCpf.addEventListener("keyup", (event) => {
  console.log(event.keyCode);
  if (event.keyCode < 48 || event.keyCode > 57 && event.keyCode < 96 || event.keyCode > 105) {
    event.target.value = "";
    return;
  }
});

  date.addEventListener("keyup", () => {
    // Checa se o dia inserido é maior que 31 ou menor/igual à 0;
    if (date.value.length == 2) {
      if (date.value > 31 || date.value <= 0) {
        alert("Data Incorreta!!");
        date.value = "";
        return;
      }
      // insere "/" depois do dia
      date.value = date.value + "/";
      // Checa se o mês inserido é maior que 31 ou menor que 1; 
    } else if (date.value.length == 5) {
      if (date.value.slice(-2) > 12 || date.value.slice(-2) < 1) {
        alert("Data Incorreta!!");
        date.value = "";
        return;
      }
      // insere "/" depois do mês;
      date.value = date.value + "/";
      // Checa se o ano inserido menos ano atual é maior que "n" ("n" anos atrás) "n = 100";
    } else if (date.value.length == 10) {
      if (currentYear - date.value.slice(-4) > 100) {
        alert("Data Invalida!!");
        date.value = "";
        return;
      }
    }
  });

  sendBtn.addEventListener("click", (event) => {
    // Cancela a função do botão de envio for formulário;
    event.preventDefault();    
    // Zera o conteudo da caixa Modal antes de adicionar novos elementos;
    modalContent.innerHTML = "";
    // Checa se existe alguem campo input vazio, se true adiciona classe de erro e sai da função;
    for (let i = 0; i < inputs.length; i += 1) {
      if (inputs[i].value == "") {
        inputs[i].classList.add("is-danger");
        if (i == inputs.length - 1) {
          window.confirm("Preencha Todos os campos Obrigatórios!");
          return;
        }
      }      
      // Insere o Estado na posição 10 do conteudo da caixa modal;
      if (modalContent.children.length == 10) {
        modalContent.appendChild(document.createElement("h3")).innerText = `${state.name}:`;
        modalContent.appendChild(document.createElement("p")).innerText = `${state.value}`;
        // Se o input casa estiver checado e for do tipo radio, Insere titulo(placeholder do input) e paragrafo(valor do input) no conteudo da caixa modal;
        if (inputs[i].checked && inputs[i].type == "radio") {
          modalContent.appendChild(document.createElement("h3")).innerText = `${inputs[i].placeholder}:`;
          modalContent.appendChild(document.createElement("p")).innerText = `${inputs[i].value}`;
          // Se o apartamento estiver checado e for do tipo radio, Insere titulo(placeholder do input) e paragrafo(valor do input) no conteudo da caixa modal;                   
        } else if (inputs[i + 1].checked && inputs[i + 1].type == "radio") {
          modalContent.appendChild(document.createElement("h3")).innerText = `${inputs[i + 1].placeholder}:`;
          modalContent.appendChild(document.createElement("p")).innerText = `${inputs[i + 1].value}`;                   
        }              
      }
      // Se o input não for do tipo "radio" Insere titulo(placeholder do input) e paragrafo(valor do input) no conteudo da caixa modal; 
      else if (inputs[i].type !== "radio") {
        modalContent.appendChild(document.createElement("h3")).innerText = `${inputs[i].placeholder}:`;
        modalContent.appendChild(document.createElement("p")).innerText = `${inputs[i].value}`;
      }      
      // Insere classe nos titulos criados no conteudo da caixa modal;
      for (let j = 0; j < modalContent.children.length; j += 2) {
        modalContent.children[j].className += "subtitle is-5 mb-0 mt-2";
      }
    }
    // Mostra a caixa modal;
    modalCard.classList.add("is-active");
  });

  modalBtnSave.addEventListener("click", () => {
    // Adiciona classe com animação de carregamento ao botão.
    modalBtnSave.classList.add("is-loading")
    setTimeout(() => {
      // Aguarda 2 segundos e desativa a caixa modal, animção de carregamento e mostra notificação de suscesso;
      modalCard.classList.remove("is-active"); 
      modalBtnSave.classList.remove("is-loading");
      successContainer.style.bottom = "0vh";
    }, 2000);
    setTimeout(() => {      
      // Esconde notificação de suscesso ao se passar 6.5 segundos;
      successContainer.style.bottom = "-20vh";
    }, 6500);
  });

  modalBtnCancel.addEventListener("click", () => {
    // Fecha o modal;
    modalCard.classList.remove("is-active");
  });

  modalBtnClose.addEventListener("click", () => {
    // Fecha o modal;
    modalCard.classList.remove("is-active");
  });

  const states = [
    // Lista dos Estados;
    "",
    "Acre",
    "Alagoas",
    "Amapá",
    "Amazonas",
    "Bahia",
    "Ceará",
    "Distrito Federal",
    "Espírito Santo",
    "Goiás",
    "Maranhão",
    "Mato Grosso",
    "Mato Grosso do Sul",
    "Minas Gerais",
    "Paraná",
    "Paraíba",
    "Pará",
    "Pernambuco",
    "Piauí",
    "Rio de Janeiro",
    "Rio Grande do Norte",
    "Rio Grande do Sul",
    "Rondonia",
    "Roraima",
    "Santa Catarina",
    "Sergipe",
    "São Paulo",
    "Tocantins",
  ];

  while (childs < states.length) {
    // Cria às opções do select com o texto e valor do nome dos estados;
    state.appendChild(document.createElement("option"));
    state.children[childs].innerText = `${states[childs]}`;
    state.children[childs].value = `${states[childs]}`;
    state.children[childs].className = "selection-state";
    childs += 1;
  }
  childs = 0;
};

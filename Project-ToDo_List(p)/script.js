const createTaskBtn = document.getElementById('criar-tarefa');
const inputTaskBox = document.getElementById('texto-tarefa');
const taskList = document.getElementById('lista-tarefas');
const wipeBtn = document.getElementById('apaga-tudo');
const completedEraser = document.getElementById('remover-finalizados');
const saveBtn = document.getElementById('salvar-tarefas');
const upBtn = document.getElementById('mover-cima');
const downBtn = document.getElementById('mover-baixo');
const removeSelectedBtn = document.getElementById('remover-selecionado');
let childs = 0;

function selection(event) {
  while (taskList.children.length > childs) {
    taskList.children[childs].classList.remove('selected');
    childs += 1;
  } event.target.classList.add('selected');
  childs = 0;
}

function completed(event) {
  if (event.target.className.includes('completed')) {
    event.target.classList.remove('completed');
  } else {
    event.target.classList.add('completed');
  }
}

function taskCreation(event) {
  console.log(createTaskBtn.firstChild);
  if (event.keyCode === 13 || event.target === createTaskBtn.firstChild) {
    if (inputTaskBox.value === '') {
      return alert('É nescessário inserir algo na caixa de texto para criar uma tarefa');
    }
    taskList.appendChild(document.createElement('li'));
    taskList.lastElementChild.innerText = inputTaskBox.value;
    taskList.lastElementChild.addEventListener('click', selection);
    taskList.lastElementChild.addEventListener('dblclick', completed);
    taskList.lastElementChild.className = 'task';
    inputTaskBox.value = '';
    childs = 0;
  }
}

createTaskBtn.addEventListener('click', taskCreation);

function wipe() {
  taskList.innerHTML = '';
}

wipeBtn.addEventListener('click', wipe);

function completedWipe() {
  const completedTask = document.querySelectorAll('.completed');
  while (completedTask.length > childs) {
    completedTask[childs].remove();
    childs += 1;
  } childs = 0;
}

completedEraser.addEventListener('click', completedWipe);

function saveTasks() {
  localStorage.clear();
  while (taskList.children.length > childs) {
    console.log(taskList.children[childs].innerText);
    localStorage.setItem(`task ${childs} class`, `${taskList.children[childs].className}`);
    localStorage.setItem(`task ${childs} text`, `${taskList.children[childs].innerText}`);
    childs += 1;
  } childs = 0;
  console.log(localStorage);
}

function memory() {
  for (let i = 0; i < localStorage.length; i += 1) {
    if (localStorage[`task ${i} text`] === undefined) {
      alert('Obrigado por voltar!! Não esqueça de salvar suas tarefas antes de fechar o site!!!');
      return;
    }
    taskList.appendChild(document.createElement('li'));
    taskList.lastElementChild.innerText = localStorage[`task ${i} text`];
    taskList.lastElementChild.className = localStorage[`task ${i} class`];
    taskList.lastElementChild.addEventListener('click', selection);
    taskList.lastElementChild.addEventListener('dblclick', completed);
  }
}

saveBtn.addEventListener('click', saveTasks);

function moveSelectedUp() {
  const elementSelected = document.querySelector('.selected');
  if (taskList.children[0] === elementSelected || elementSelected == null) {
    return;
  }
  elementSelected.parentNode.insertBefore(elementSelected, elementSelected.previousElementSibling);
}

function moveSelectedDown() {
  const elementSelected = document.querySelector('.selected');
  const taskListChilds = taskList.children;
  if (taskListChilds[taskListChilds.length - 1] === elementSelected || elementSelected == null) {
    return;
  }
  elementSelected.parentNode.insertBefore(elementSelected.nextElementSibling, elementSelected);
}

upBtn.addEventListener('click', moveSelectedUp);

downBtn.addEventListener('click', moveSelectedDown);

function selectedWipe() {
  const elementSelected = document.querySelector('.selected');
  elementSelected.remove();
}

inputTaskBox.addEventListener('keypress', taskCreation);

removeSelectedBtn.addEventListener('click', selectedWipe);

window.onload = (memory);

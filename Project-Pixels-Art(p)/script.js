const colorPallet = document.getElementById('color-palette');
const palletChildren = colorPallet.children;
const pixelBoard = document.getElementById('pixel-board');
const buttonContainer = document.getElementById('btn-container');
let child = 0;

function paletteColors() {
  for (let index = 0; index < palletChildren.length; index += 1) {
    if (index === 0) {
      palletChildren[index].style.background = 'black';
    } else {
      palletChildren[index].style.background = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
    }
  }
  palletChildren[0].classList.add('selected');
}
paletteColors();

function pixelBgColor(origin) {
  const selectedPixel = origin.target;
  selectedPixel.style.background = `${document.querySelector('.selected').style.background}`;
}

function addEventPixelColoring() {
  while (child < pixelBoard.children.length) {
    pixelBoard.children[child].addEventListener('click', pixelBgColor);
    child += 1;
  }
  child = 0;
}

function generatePixels(number) {
  pixelBoard.innerHTML = '';
  let functionInput = number;
  if (functionInput === undefined || functionInput < 5) {
    functionInput = 5;
  } else if (functionInput > 50) {
    functionInput = 50;
  }
  const size = functionInput * functionInput;
  for (let index = 0; index < size; index += 1) {
    pixelBoard.appendChild(document.createElement('div'));
    pixelBoard.children[index].className = 'pixel';
    pixelBoard.children[index].style.width = '40px';
    pixelBoard.children[index].style.height = '40px';
  }
  const pixelElement = pixelBoard.children[0];
  pixelBoard.style.width = `${(parseInt(pixelElement.style.width, 10) + 2) * functionInput}px`;
  pixelBoard.style.height = `${(parseInt(pixelElement.style.height, 10) + 2) * functionInput}px`;
  addEventPixelColoring();
}
generatePixels();

function paletteSelection(origin) {
  while (child < palletChildren.length) {
    palletChildren[child].classList.remove('selected');
    child += 1;
  }
  child = 0;

  origin.target.classList.add('selected');
}

function addPaletteEvents() {
  while (child < palletChildren.length) {
    palletChildren[child].addEventListener('click', paletteSelection);
    child += 1;
  }
  child = 0;
}
addPaletteEvents();

function clear() {
  while (child < pixelBoard.children.length) {
    pixelBoard.children[child].style.background = 'rgb(255, 255, 255)';
    child += 1;
  }
  child = 0;
}

function addButton() {
  buttonContainer.appendChild(document.createElement('button'));
  const buttonClear = buttonContainer.children[0];
  buttonClear.id = 'clear-board';
  buttonClear.innerText = 'Limpar';
  buttonClear.addEventListener('click', clear);
}
addButton();

function inputBtn() {
  buttonContainer.appendChild(document.createElement('input'));
  const inputContainer = buttonContainer.children[1];
  inputContainer.id = 'board-size';
  inputContainer.placeholder = 'Insira um Tamanho';
  inputContainer.type = 'number';
  inputContainer.min = '1';
  inputContainer.max = '50';
  buttonContainer.appendChild(document.createElement('button'));
  const sizeButton = buttonContainer.children[2];
  sizeButton.id = 'generate-board';
  sizeButton.innerText = 'VQV';
  sizeButton.addEventListener('click', () => {
    if (inputContainer.value < 5) {
      alert('Board inválido!');
    }
    generatePixels(inputContainer.value);
  });
}
inputBtn();

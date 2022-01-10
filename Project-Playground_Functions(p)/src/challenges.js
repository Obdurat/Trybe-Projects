/* eslint-disable complexity */
/* eslint-disable sonarjs/cognitive-complexity */
// Desafio 1
function compareTrue(a, b) {
  // seu código aqui
  if (a === true && b === true) {
    return true;
  } return false;
}

// Desafio 2
function calcArea(a, b) {
  // seu código aqui
  return (a * b) / 2;
}


// Desafio 3
function splitSentence(str) {
  // seu código aqui
  return str.split(' ');
}

// Desafio 4

function concatName(a) {
  // seu código aqui
  return `${a[a.length - 1]}, ${a[0]}`;
}

// Desafio 5
function footballPoints(wins, ties) {
  // seu código aqui
  wins *= 3;
  return wins + ties;
}

// Desafio 6

function highestCount(a) {
  // seu código aqui
  let count = 0;
  let biggest = -a.length * 999;
  for (let index = 0; index < a.length; index += 1) {
    if (biggest < a[index]) {
      biggest = a[index];
    }
  }
  for (let index = 0; index < a.length; index += 1) {
    if (biggest === a[index]) {
      count += 1;
    }
  } return count;
}

// Desafio 7
function catAndMouse(mouse, cat1, cat2) {
  // seu código aqui
  if (Math.abs(mouse - cat1) === Math.abs(cat2 - mouse)) {
    return 'os gatos trombam e o rato foge';
  } if (mouse + cat1 < mouse + cat2) {
    return 'cat1';
  }
  return 'cat2';
}

// Desafio 8
function fizzBuzz(a) {
  // seu código aqui
  let result = [];
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] % 3 === 0 && a[i] % 5 === 0) {
      result.push('fizzBuzz');
    } else if (a[i] % 3 === 0) {
      result.push('fizz');
    } else if (a[i] % 5 === 0) {
      result.push('buzz');
    } else if (a[i] % 3 !== 0 && a[i] % 5 !== 0) {
      result.push('bug!');
    }
  } return result;
}

// Desafio 9
function encode(str) {
  // seu código aqui
  let split = str.split('');
  for (let index = 0; index < str.length; index += 1) {
    if (str[index] === 'a') {
      split[index] = 1;
    } else if (str[index] === 'e') {
      split[index] = 2;
    } else if (str[index] === 'i') {
      split[index] = 3;
    } else if (str[index] === 'o') {
      split[index] = 4;
    } else if (str[index] === 'u') {
      split[index] = 5;
    }
  } return split.join('');
}

function decode(str) {
  // seu código aqui
  let split = str.split('');
  for (let index = 0; index < str.length; index += 1) {
    if (str[index] === '1') {
      split[index] = 'a';
    } else if (str[index] === '2') {
      split[index] = 'e';
    } else if (str[index] === '3') {
      split[index] = 'i';
    } else if (str[index] === '4') {
      split[index] = 'o';
    } else if (str[index] === '5') {
      split[index] = 'u';
    }
  } return split.join('');
}

module.exports = {
  calcArea,
  catAndMouse,
  compareTrue,
  concatName,
  decode,
  encode,
  fizzBuzz,
  footballPoints,
  highestCount,
  splitSentence,
};

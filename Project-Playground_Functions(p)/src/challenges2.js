/* eslint-disable complexity */
// Desafio 10
function techList(array, name) {
  // seu código aqui
  let orderArray = array.sort();
  let order = [];
  if (array.length === 0) {
    return 'Vazio!';
  }
  for (let index = 0; index < array.length; index += 1) {
    order.push({ tech: orderArray[index], name });
  } return order;
}

// Desafio 11
function generatePhoneNumber(array) {
  // seu código aqui
  let duplicateArray = [...array];
  let orderArray = duplicateArray.sort();
  let countDuplicates = 0;
  if (array.length !== 11) { return 'Array com tamanho incorreto.'; }

  for (let index = 0; index < array.length; index += 1) {
    // eslint-disable-next-line max-len
    if (orderArray[index] === orderArray[index + 2]) { countDuplicates += 1; } else if (array[index] > 9 || array[index] < 0) { return 'não é possível gerar um número de telefone com esses valores'; }
  }
  // eslint-disable-next-line max-len
  if (countDuplicates === 1) { return 'não é possível gerar um número de telefone com esses valores'; }
  array.splice(0, 0, '(');
  array.splice(3, 0, ')');
  array.splice(4, 0, ' ');
  array.splice(10, 0, '-');

  return array.join('');
}

// Desafio 12
function triangleCheck(lineA, lineB, lineC) {
  // seu código aqui
  if (Math.abs(lineB - lineC) < lineA && lineA < lineB + lineC) {
    return true;
  } if (Math.abs(lineA - lineC) < lineB && lineB < lineA + lineC) {
    return true;
  // eslint-disable-next-line sonarjs/prefer-single-boolean-return
  } if (Math.abs(lineA - lineB) < lineC && lineC < lineA + lineB) {
    return true;
  }
  return false;
}

// Desafio 13
function hydrate(str) {
  // seu código aqui
  let numbersFound = [];
  let result = 0;
  for (let index = 0; index < str.length; index += 1) {
    if (!isNaN(str[index]) && str[index] !== ' ') {
      numbersFound.push(parseInt(str[index], 10));
    }
  }
  for (let resultIndex = 0; resultIndex < numbersFound.length; resultIndex += 1) {
    result += numbersFound[resultIndex];
  }
  if (result > 1) { return `${result} copos de água`; }

  return `${result} copo de água`;
}

module.exports = {
  generatePhoneNumber,
  techList,
  hydrate,
  triangleCheck,
};

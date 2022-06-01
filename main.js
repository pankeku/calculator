const numbers = document.querySelectorAll('.numbers');
const input = document.querySelector('.calculator__input');
const operators = document.querySelectorAll('.operator');
let firstNumber = '';
let secondNumber = '';
let selectedOperator = '';

input.textContent = '';

function add(n1, n2) {
  return n1 + n2;
}

function substract(n1, n2) {
  return n1 - n2;
}

function multiply(n1, n2) {
  return n1 * n2;
}

function divide(n1, n2) {
  return n1 / n2;
}

function operate(n1, n2, operator) {
  if (operator === '+') {
    return add(n1, n2);
  }

  if (operator === '-') {
    return substract(n1, n2);
  }

  if (operator === '*') {
    return multiply(n1, n2);
  }

  if (operator === '/') {
    return divide(n1, n2);
  }
}

numbers.forEach((button) => {
  button.addEventListener('click', () => {
    if (secondNumber !== '') {
      secondNumber = '';
      input.textContent = '';
    }

    updateDisplay(button.textContent);
  });
});

operators.forEach((button) => {
  button.addEventListener('click', () => {
    
    if (firstNumber === '') {
      firstNumber = input.textContent;
      input.textContent = '';
    } else if (secondNumber === '') {
      secondNumber = input.textContent;
      input.textContent = '';
    }
    evaluate();
    selectedOperator = button.textContent;
  });
});

function evaluate() {

  if (selectedOperator === '=') {
    let result = operate(
      parseInt(firstNumber),
      parseInt(secondNumber),
      selectedOperator
    );
    updateDisplay(result);

    firstNumber = result;

  }


  if (firstNumber !== '' && secondNumber !== '') {
    let result = operate(
      parseInt(firstNumber),
      parseInt(secondNumber),
      selectedOperator
    );
    updateDisplay(result);

    firstNumber = result;

  }
}

function updateDisplay(text) {
  input.textContent === '0'
    ? (input.textContent = text)
    : (input.textContent += text);
}

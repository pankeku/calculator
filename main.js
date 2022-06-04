const numbers = document.querySelectorAll('.numbers');
const input = document.querySelector('.calculator__input');
const operators = document.querySelectorAll('.operator');
const equal = document.querySelector('.equal');
const clear = document.querySelector('.clear');
const plusMinus = document.querySelector('.plus-minus');
const percentage = document.querySelector('.percentage');
const dot = document.querySelector('.dot');
const backspace = document.querySelector('.backspace');

let firstNumber = '';
let secondNumber = '';
let cache = '';
let operator = '';

window.addEventListener('keydown', function(e){
  const key = document.querySelector(`.calculator__button[data-key="${e.key}"]`);
  console.log(e.key);
  key.click();
});

function operate(n1, n2, operator) {
  if (operator === '+') {
    return n1 + n2;
  }

  if (operator === '-') {
    return n1 - n2;
  }

  if (operator === '*') {
    return n1 * n2;
  }

  if (operator === '/') {
    return n1 / n2;
  }
}

function print() {
  console.log('First: ' + firstNumber);
  console.log('Second: ' + secondNumber);
  console.log('Cache: ' + cache);
  console.log('Operator: ' + operator);
}

numbers.forEach((button) => {
  button.addEventListener('click', () => {
    cache = cache + button.textContent;

    updateDisplay();
  });
});

operators.forEach((button) => {
  button.addEventListener('click', () => {
    setNumbers();
    evaluate();

    operator = button.textContent;
  });
});

equal.addEventListener('click', () => {
  setNumbers();
  evaluate();
});

clear.addEventListener('click', () => {
  clearEverything();
});

function clearEverything() {
  firstNumber = '';
  secondNumber = '';
  cache = '';
  operator = '';
  input.textContent = '';
}

plusMinus.addEventListener('click', () => {
  cache = input.textContent;
  if (cache !== '' && cache !== '0') {
    if (cache.charAt(0) !== '-') {
      cache = '-' + cache;
    } else {
      cache = cache.substring(1);
    }
    updateDisplay();
  }
});

percentage.addEventListener('click', () => {
  cache = parseFloat(input.textContent) / 100;

  updateDisplay();
});

dot.addEventListener('click', () => {
  cache = input.textContent;
  if (!(cache.includes('.'))) {
    cache = cache + '.';
    updateDisplay();
  }
})

backspace.addEventListener('click', () => {
  cache = input.textContent;
  cache = cache.substring(0, cache.length - 1);
  console.log(cache);
  updateDisplay();
})

function divideByZero() {
  if (operator === '/' && secondNumber === '0') {
    return true;
  }

  return false;
}

function evaluate() {
  if (divideByZero()) {
    clearEverything();
    input.textContent = 'Bruh..';
  }

  if (firstNumber != '' && secondNumber != '') {
    if (divideByZero) {
    }

    let result = operate(
      parseFloat(firstNumber),
      parseFloat(secondNumber),
      operator
    );

    result = +result.toFixed(5);

    cache = result;

    updateDisplay();

    firstNumber = result;
    secondNumber = '';
    cache = '';
    operator = '';
  }
}

function updateDisplay() {
  input.textContent = cache;
}

function setNumbers() {
  if (firstNumber !== '' && secondNumber === '' && operator !== '') {
    secondNumber = cache;
    cache = '';
  }

  if (firstNumber !== '' && operator === '' && cache !== '') {
    firstNumber = cache;
    cache = '';
  }

  if (firstNumber === '') {
    firstNumber = cache;
    cache = '';
  }
}

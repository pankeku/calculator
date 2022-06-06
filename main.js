const buttons = document.querySelectorAll('button');
const numbers = document.querySelectorAll('.numbers');
const display = document.querySelector('.calculator__display');
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

function evaluate() {
  if (operator === '/' && secondNumber === '0') {
    clearAll();
    display.textContent = 'Bruh..';
  }

  if (firstNumber != '' && secondNumber != '') {
    let result = operate(
      parseFloat(firstNumber),
      parseFloat(secondNumber),
      operator
    );
    console.log(result);
    result = +result.toFixed(3);

    if (result.toString().length > 14) {
      result = result.toExponential(2).toString();
    }

    cache = result;

    updateDisplay();

    firstNumber = result;
    secondNumber = '';
    cache = '';
    operator = '';
  }
}

function displayHasDot() {
  display.textContent.includes('.')
    ? dot.classList.add('calculator__button--disabled')
    : dot.classList.remove('calculator__button--disabled');
}

function updateDisplay() {
  display.textContent = cache;
  displayHasDot();
}

numbers.forEach((button) => {
  button.addEventListener('click', () => {
    if (isDisplayError()) {
      return;
    }

    cache += button.textContent;

    updateDisplay();
    deactivateButton();
  });
});

operators.forEach((button) => {
  button.addEventListener('click', () => {
    deactivateButton();
    setNumbers();
    evaluate();

    operator = button.textContent;
    if (display.textContent !== '') {
      button.classList.add('calculator__button--active');
    }
  });
});

function isDisplayError() {
  if (cache.length > 14) {
    display.classList.add('calculator__display--error');
    return true;
  } else {
    display.classList.remove('calculator__display--error');
    return false;
  }
}

equal.addEventListener('click', () => {
  setNumbers();
  evaluate();
});

clear.addEventListener('click', () => {
  clearAll();
});

plusMinus.addEventListener('click', () => {
  cache = display.textContent;
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
  if (display.textContent !== '') {
    cache = parseFloat(display.textContent) / 100;
  }
  updateDisplay();
});

dot.addEventListener('click', () => {
  cache = display.textContent;
  if (!cache.includes('.')) {
    cache += '.';
    updateDisplay();
  }
});

backspace.addEventListener('click', () => {
  cache = display.textContent;
  cache = cache.substring(0, cache.length - 1);
  isDisplayError();
  updateDisplay();
});

function clearAll() {
  firstNumber = '';
  secondNumber = '';
  cache = '';
  operator = '';
  display.textContent = '';
  dot.classList.remove('calculator__button--disabled');
  display.classList.remove('calculator__display--error');
  deactivateButton();
}

function deactivateButton() {
  operators.forEach((button) => {
    button.classList.remove('calculator__button--active');
  });
}

window.addEventListener('keydown', (e) => {
  const key = document.querySelector(
    `.calculator__button[data-key="${e.key}"]`
  );
  key.click();
});

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    button.classList.add('button--active');
    setTimeout(() => {
      button.classList.remove('button--active');
    }, 100);
  });
});

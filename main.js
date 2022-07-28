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

const calculator = {
  firstNumber: null,
  secondNumber: null,
  operator: null,
  cache: '',
};

function operate(n1, n2, operator) {
  let result = null;

  if (operator === '+') {
    result = n1 + n2;
  }

  if (operator === '-') {
    result = n1 - n2;
  }

  if (operator === '*') {
    result = n1 * n2;
  }

  if (operator === '/') {
    result = n1 / n2;
  }

  return result;
}

function setNumbers() {
  if (
    calculator.firstNumber !== null &&
    (calculator.secondNumber === null || calculator.secondNumber === '') &&
    calculator.operator !== null
  ) {
    calculator.secondNumber = calculator.cache;
    calculator.cache = '';
  }

  if (
    calculator.firstNumber !== null &&
    calculator.operator === null &&
    calculator.cache !== ''
  ) {
    calculator.firstNumber = calculator.cache;
    calculator.cache = '';
  }

  if (calculator.firstNumber === null) {
    calculator.firstNumber = calculator.cache;
    calculator.cache = '';
  }
}

function evaluate() {
  if (calculator.operator === '/' && calculator.secondNumber === '0') {
    clearAll();
    display.textContent = 'Bruh..';
  }

  if (calculator.firstNumber != null && calculator.secondNumber != null && calculator.secondNumber != '') {
    let result = operate(
      parseFloat(calculator.firstNumber),
      parseFloat(calculator.secondNumber),
      calculator.operator
    );
    result = +result.toFixed(3);

    if (result.toString().length > 14) {
      result = result.toExponential(2).toString();
    }

    calculator.cache = result;

    updateDisplay();

    calculator.firstNumber = result;
    calculator.secondNumber = null;
    calculator.cache = '';
    calculator.operator = null;
  }
}

function displayHasDot() {
  display.textContent.includes('.')
    ? dot.classList.add('calculator__button--disabled')
    : dot.classList.remove('calculator__button--disabled');
}

function updateDisplay() {
  display.textContent = calculator.cache;
  displayHasDot();
}

function clearAll() {
  calculator.firstNumber = null;
  calculator.secondNumber = null;
  calculator.cache = '';
  calculator.operator = null;
  display.textContent = '';
  dot.classList.remove('calculator__button--disabled');
  display.classList.remove('calculator__display--error');
  deactivateButton();
}

function isDisplayError() {
  if (calculator.cache.length > 14) {
    display.classList.add('calculator__display--error');
    return true;
  } 

    display.classList.remove('calculator__display--error');
    return false;
}

numbers.forEach((button) => {
  button.addEventListener('click', () => {
    if (isDisplayError()) {
      return;
    }

    calculator.cache += button.textContent;

    updateDisplay();
    deactivateButton();
  });
});

operators.forEach((button) => {
  button.addEventListener('click', () => {
    deactivateButton();
    setNumbers();
    evaluate();

    calculator.operator = button.textContent;
    if (display.textContent !== '') {
      button.classList.add('calculator__button--active');
    }
  });
});

equal.addEventListener('click', () => {
  setNumbers();
  evaluate();
});

clear.addEventListener('click', () => {
  clearAll();
});

plusMinus.addEventListener('click', () => {
  calculator.cache = display.textContent;

  if (calculator.cache == null && calculator.cache == '0') {
    return;
  }

  if (calculator.cache.charAt(0) !== '-') {
    calculator.cache = '-' + calculator.cache;
  } else {
    calculator.cache = calculator.cache.substring(1);
  }
  updateDisplay();
});

percentage.addEventListener('click', () => {
  if (display.textContent == '') {
    return;
  }

  let result = parseFloat(display.textContent) / 100;

  if (result.toString().length > 14) {
    result = result.toExponential(2).toString();
  }

  calculator.cache = result;
  updateDisplay();
});

dot.addEventListener('click', () => {
  calculator.cache = display.textContent;
  if (!calculator.cache.includes('.')) {
    calculator.cache += '.';
    updateDisplay();
  }
});

backspace.addEventListener('click', () => {
  calculator.cache = display.textContent;
  calculator.cache = calculator.cache.substring(0, calculator.cache.length - 1);
  isDisplayError();
  updateDisplay();
});

function deactivateButton() {
  operators.forEach((button) => {
    button.classList.remove('calculator__button--active');
  });
}

window.addEventListener('keydown', (e) => {
  const key = document.querySelector(
    `.calculator__button[data-key="${e.key}"]`
  );

  if (key != null) {
    key.click();
  }
  
});

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    button.classList.add('button--active');
    setTimeout(() => {
      button.classList.remove('button--active');
    }, 100);
  });
});

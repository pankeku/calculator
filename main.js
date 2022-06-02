const numbers = document.querySelectorAll('.numbers');
const input = document.querySelector('.calculator__input');
const operators = document.querySelectorAll('.operator');
const equal = document.querySelector('.equal');
let firstNumber = '';
let secondNumber = '';
let evaluationAllowed = false;

input.textContent = '';

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

    setNumbers();

    evaluate();

    selectedOperator = button.textContent;

  });
});

equal.addEventListener('click', () => {

  setNumbers();
  evaluate();

});


function setNumbers() {

  if (firstNumber === '') {
    firstNumber = input.textContent;
  } else if (secondNumber === '' && input.textContent != '') {
    secondNumber = input.textContent;    
    evaluationAllowed = true;
  }

  clearDisplay();
}

function evaluate() {

  if (firstNumber !== '' && secondNumber !== '' && evaluationAllowed === true) {

    let result = getResult();

    input.textContent = '';

    updateDisplay(result);

    firstNumber = result;

    evaluationAllowed = false;
  }
}

function updateDisplay(text) {  
  input.textContent += text;
}

function clearDisplay() {
  
  input.textContent = '';
}

function getResult() {
  return operate(
    parseInt(firstNumber),
    parseInt(secondNumber),
    selectedOperator
  );
}

const calculator = document.getElementById('calculator');
const buttons = document.getElementById('buttons');
const display = document.getElementById('display');
const clearBtn = document.getElementById('clear');
const equalBtn = document.getElementById('equals');
const backBtn = document.getElementById('back');
const plusBtn = document.getElementById('add');
const subtractBtn = document.getElementById('subtract');
const multiplyBtn = document.getElementById('multiply');
const divideBtn = document.getElementById('divide');
const percent = document.getElementById('percent');
const oneBtn = document.getElementById('one');

const keypad = document.querySelectorAll('.keypad-value-input');

let isOperatorUsed = false;
let operator = '';
let cacheInput = '';

const equal = function () {
  if (!operator) {
    return;
  }
  const { value } = display;
  //TO DO: implement the operation function, use cache operator value
  const operatedResult = operate(operator, Number(cacheInput), Number(value));
  // this part update the display and save the new cache with the Operated result
  display.value = operatedResult;
  storeCacheInput(operatedResult);
  isOperatorUsed = false;
  operator = '';
};

function storeCacheInput(input) {
  cacheInput = input;
}

const clear = function () {
  display.value = '0';
  cacheInput = '';
  operator = '';
};

function operate(operator, firstNumber, secondNumber) {
  if (operator === '+') {
    return firstNumber + secondNumber;
  }
  if (operator === '-') {
    return firstNumber - secondNumber;
  }
  if (operator === '*') {
    return firstNumber * secondNumber;
  }
  if (operator === '/') {
    if (secondNumber === 0) {
      alert('Cannot divide 0');
      return 0;
    }
    const result = firstNumber / secondNumber;
    return result;
  }
  if (operator === '%') {
    return (firstNumber * secondNumber) / 100;
  }
}

const back = function () {
  console.log(display.value);
  if (display.value === '0' || display.value.length === '1') {
    display.value = '0';
    return;
  }
  display.value = display.value.slice(0, -1);
};

equalBtn.addEventListener('click', equal);

backBtn.addEventListener('click', back);

clearBtn.addEventListener('click', clear);

// display.addEventListener('keypress', check);
plusBtn.addEventListener('click', onHandlerOperationClick);
subtractBtn.addEventListener('click', onHandlerOperationClick);
multiplyBtn.addEventListener('click', onHandlerOperationClick);
divideBtn.addEventListener('click', onHandlerOperationClick);
percent.addEventListener('click', onHandlerOperationClick);

document.addEventListener('keydown', onHandlerDisplayKeyPress);

keypad.forEach((node) => node.addEventListener('click', onHandlerDisplayClick));

const optionsKeys = {
  0: '0',
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  '+': '+',
  '-': '-',
  '*': '*',
  '/': '/',
  '.': '.',
  '%': '%',
  Enter: 'Enter',
  Backspace: 'Backspace',
  default: '',
};

const operationList = ['+', '-', '*', '/', '%'];

function onHandlerDisplayKeyPress(e) {
  const maxLength = 15;
  if (isOperatorUsed) {
    storeCacheInput(display.value);
    display.value = '0';
    isOperatorUsed = false;
    console.log('safe input calculator', isOperatorUsed);
  }
  console.log(e.key);

  const val = optionsKeys[e.key] || optionsKeys['default'];
  if (val === 'Enter') {
    return equal();
  }
  if (operationList.includes(val)) {
    isOperatorUsed = true;
    operator = val;
    return;
  }
  if (val === 'Backspace') {
    return back();
  }

  if (val === '.' && display.value.includes('.')) {
    // Si el valor clickeado es un punto y ya hay un punto en el display, no hacer nada
    return;
  }

  if (display.value.length === maxLength) {
    return;
  }

  if (display.value.charAt(0) === '0') {
    display.value = display.value.slice(1);
  }

  display.value += val;
}

function onHandlerOperationClick({ target }) {
  isOperatorUsed = true;
  operator = target?.value;
  console.log('clicked Listener', isOperatorUsed);
}

function onHandlerDisplayClick(e) {
  console.log('click handler display', isOperatorUsed);
  /////////////// Save input calculator before clean up display input
  if (isOperatorUsed) {
    storeCacheInput(display.value);
    display.value = '0';
    isOperatorUsed = false;
    console.log('safe input calculator', isOperatorUsed);
  }
  const maxLength = 15;
  const regex = /^\d*\.?\d*$/;
  const val = e.target;

  if (val.nodeName === 'BUTTON' && regex.test(val.value)) {
    const clickVal = val.value;
    if (clickVal === '.' && display.value.includes('.')) {
      // Si el valor clickeado es un punto y ya hay un punto en el display, no hacer nada
      return;
    }

    if (display.value.length === maxLength) {
      return;
    }

    if (display.value.charAt(0) === '0') {
      display.value = display.value.slice(1);
    }
    display.value += clickVal;
  }
}

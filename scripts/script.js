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
const decimal = document.getElementById('decimal');

const keypad = document.querySelectorAll('.keypad-value-input');

const elementosButt = document.querySelectorAll('.butt');

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
  if (display.value === '0' || display.value.length === '1') {
    display.value = '0';
    return;
  }
  display.value = display.value.slice(0, -1);
};

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
  c: 'c',
  Enter: 'Enter',
  Backspace: 'Backspace',
  default: '',
};

const operationList = ['+', '-', '*', '/', '%'];

function handleKeyDown(e) {
  elementosButt.forEach((ele) => {
    const val = optionsKeys[e.key] || optionsKeys['default'];
    if (val === ele.textContent) {
      ele.classList.add('bg-gradient');
    }
  });
}

function handleKeyUp(e) {
  elementosButt.forEach((ele) => {
    const val = optionsKeys[e.key] || optionsKeys['default'];
    if (val === ele.textContent) {
      ele.classList.remove('bg-gradient');
    }
  });
}

function onHandlerDisplayKeyPress(e) {
  const maxLength = 15;
  if (isOperatorUsed) {
    storeCacheInput(display.value);
    display.value = '0';
    isOperatorUsed = false;
    console.log('safe input calculator', isOperatorUsed);
  }

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

  if (val === 'c') {
    return clear();
  }

  if (val === '.' && display.value.includes('.')) {
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

function handleKeydownEvent(key, element) {
  document.addEventListener('keydown', (e) => {
    if (e.key === key) {
      element.classList.add('bg-gradient');
    }
  });

  document.addEventListener('keyup', (e) => {
    if (e.key === key) {
      element.classList.remove('bg-gradient');
    }
  });
}

function onEventDown(e) {
  e.target.classList.add('bg-gradient');
}
function onEventUp(e) {
  e.target.classList.remove('bg-gradient');
}

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

handleKeydownEvent('Backspace', backBtn);
handleKeydownEvent('Enter', equalBtn);
handleKeydownEvent('.', decimal);
handleKeydownEvent('c', clearBtn);

function listenersHandlers(element) {
  if (element === equalBtn) {
    element.addEventListener('click', equal);
    element.addEventListener('mousedown', onEventDown);
    element.addEventListener('mouseup', onEventUp);
  }

  if (element === clearBtn) {
    element.addEventListener('click', clear);
    element.addEventListener('mousedown', onEventDown);
    element.addEventListener('mouseup', onEventUp);
  }

  if (element === backBtn) {
    element.addEventListener('click', back);
    element.addEventListener('mousedown', onEventDown);
    element.addEventListener('mouseup', onEventUp);
  }

  element.addEventListener('click', onHandlerOperationClick);
  element.addEventListener('mousedown', onEventDown);
  element.addEventListener('mouseup', onEventUp);
}

listenersHandlers(equalBtn);
listenersHandlers(backBtn);
listenersHandlers(clearBtn);
listenersHandlers(plusBtn);
listenersHandlers(subtractBtn);
listenersHandlers(multiplyBtn);
listenersHandlers(divideBtn);
listenersHandlers(percent);

document.addEventListener('keydown', onHandlerDisplayKeyPress);

keypad.forEach((node) => {
  node.addEventListener('click', onHandlerDisplayClick);
  node.addEventListener('mousedown', onEventDown);
  node.addEventListener('mouseup', onEventUp);
});

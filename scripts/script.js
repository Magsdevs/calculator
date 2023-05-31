const calculator = document.getElementById('calculator');
const buttons = document.getElementById('buttons');
let display = document.getElementById('display');
let operator = '';
let firstNumber = '';
let secondNumber = '';
let globalDisplay = display.value;

const add = function () {
  let sum = [...arguments].reduce((initial, total) => initial + total);
  return sum;
};

const subtract = function () {
  let subtract = [...arguments].reduce((initial, total) => initial - total);
  return subtract;
};

const multiply = function () {
  let args = [...arguments];
  return args
    .flat()
    .reduce((previousValue, currentValue) => previousValue * currentValue);
};

function clickDisplayHandler(e) {
  let maxLength = 15;
  let regex = /^\d*\.?\d*$/;
  let val = e.target;
  e.preventDefault();
  if (val.nodeName === 'BUTTON' && regex.test(val.value)) {
    const clickVal = val.value;
    if (clickVal === '.' && display.value.includes('.')) {
      // Si el valor clickeado es un punto y ya hay un punto en el display, no hacer nada
      return;
    }

    if (display.value.length === maxLength) {
      return;
    }
    display.value += clickVal;
  }
}

const check = function (evt) {
  const data = document.getElementById('display').value;
  if (
    (evt.charCode >= 48 && evt.charCode <= 57) ||
    evt.charCode == 46 ||
    evt.charCode == 0
  ) {
    if (data.indexOf('.') > -1) {
      if (evt.charCode == 46) evt.preventDefault();
    }
  } else {
    evt.preventDefault();
  }
};

calculator.addEventListener('click', clickDisplayHandler);
display.addEventListener('keypress', check);

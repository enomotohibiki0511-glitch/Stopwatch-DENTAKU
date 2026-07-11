document.addEventListener('DOMContentLoaded', () => {
  const display = document.querySelector('.display');
  const buttons = document.querySelectorAll('table.keys button');

  const OPERATORS = ['+', '-', '*', '/'];

  let expression = '';

  function isOperator(char) {
    return OPERATORS.includes(char);
  }

  function getLastSegment() {
    const parts = expression.split(/[+\-*/]/);
    return parts[parts.length - 1];
  }

  function updateDisplay() {
    display.textContent = expression;
  }

  function handleClear() {
    expression = '';
  }

  function handleDigit(digit) {
    const lastSegment = getLastSegment();

    if (lastSegment === '0') {
      expression = expression.slice(0, -1) + digit;
    } else {
      expression += digit;
    }
  }

  function handleDoubleZero() {
    const lastSegment = getLastSegment();

    if (lastSegment === '' || lastSegment === '0') {
      return;
    }

    expression += '00';
  }

  function handleDecimal() {
    const lastSegment = getLastSegment();

    if (lastSegment.includes('.')) {
      return;
    }

    if (lastSegment === '') {
      expression += '0.';
    } else {
      expression += '.';
    }
  }

  function handleOperator(operator) {
    if (expression === '') {
      return;
    }

    const lastChar = expression.slice(-1);

    if (isOperator(lastChar)) {
      expression = expression.slice(0, -1) + operator;
    } else {
      expression += operator;
    }
  }

  function handleEquals() {
    if (expression === '') {
      return;
    }

    const lastChar = expression.slice(-1);

    if (isOperator(lastChar)) {
      return;
    }

    try {
      const result = Function('"use strict"; return (' + expression + ');')();

      if (typeof result !== 'number' || !isFinite(result)) {
        expression = 'エラー';
      } else {
        expression = String(Number(result.toFixed(8)));
      }
    } catch (error) {
      expression = 'エラー';
    }
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const value = button.textContent;

      if (expression === 'エラー' && value !== 'AC') {
        expression = '';
      }

      if (value === 'AC') {
        handleClear();
      } else if (value === '=') {
        handleEquals();
      } else if (value === '.') {
        handleDecimal();
      } else if (value === '00') {
        handleDoubleZero();
      } else if (isOperator(value)) {
        handleOperator(value);
      } else {
        handleDigit(value);
      }

      updateDisplay();
    });
  });

  updateDisplay();
});
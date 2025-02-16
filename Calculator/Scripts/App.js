const screen = document.getElementById('screen');

// Append value to the screen
function appendValue(value) {
  // Prevent multiple consecutive operators
  const lastChar = screen.value[screen.value.length - 1];
  if (isOperator(value) && isOperator(lastChar)) {
    return;
  }
  // Prevent operator at the beginning
  if (screen.value === '' && isOperator(value)) {
    return;
  }
  // Prevent multiple decimal points in a number
  if (value === '.' && screen.value.includes('.')) {
    return;
  }
  // Append the value to the screen
  if (screen.value === '0' && value !== '.') {
    screen.value = value;
  } else {
    screen.value += value;
  }
}

// Clear the screen
function clearScreen() {
  screen.value = '';
}

// Backspace functionality
function backspace() {
  screen.value = screen.value.slice(0, -1);
}

// Check if a character is an operator
function isOperator(char) {
  return ['+', '-', '*', '/'].includes(char);
}

// Calculate the result
function calculate() {
  try {
    // Replace multiple consecutive operators with a single operator
    let expression = screen.value.replace(/([+\-*/])\1+/g, '$1');
    // Replace any leading or trailing operators with an empty string
    expression = expression.replace(/^[+\-*/]+|[+\-*/]+$/g, '');
    // Evaluate the expression
    screen.value = eval(expression);
  } catch {
    screen.value = 'Error';
  }
}

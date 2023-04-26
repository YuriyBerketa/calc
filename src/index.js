const calculator = document.querySelector('.calculator');
let history = [];
let tempNumber = '';
let operationType = '';
let isPercent = false;
let isEqual = false;

calculator.addEventListener('click', event => {
  const target = event.target;
  if (target.classList.contains('calculator__col')) {
    const data = target.dataset.type;
    operationTypeHandling(data);
    renderTotal(tempNumber);
    renderHistory(history);
  }
});

function operationTypeHandling(data) {
  if (data >= 0) {
    operationType = 'number';
    tempNumber = tempNumber === '0' ? data : tempNumber + data;
  } else if (data === 'float') {
    operationType = 'number';
    if (!/\./.test(tempNumber)) {
      if (tempNumber) {
      tempNumber = tempNumber + '.';
    } else {
      tempNumber = '0.';
    }
    } 
  } else if (data === 'delete' && operationType === 'number') {
    tempNumber = tempNumber.substring(0, tempNumber.length - 1);
    tempNumber = tempNumber ? tempNumber : '0';
  } else if (['+', '-', '*', '/'].includes(data) && tempNumber) {
    operationType = data;
    history.push(tempNumber, operationType);
    tempNumber = '';
    // isPercent = false;
  } else if (data === 'clear') {
    history = [];
    tempNumber = '0';
    // isPercent = false;
  } else if (data === '%') {
    history.push(tempNumber);
      isPercent = true;
      isEqual = false;
    tempNumber = calculate(history, isPercent, isEqual);
    history = [];
  } else if (data === '=') {
      history.push(tempNumber);
      isEqual = true;
      tempNumber = calculate(history, isPercent, isEqual);
      history = [];
      isPercent = false;
  }
//  else if (data === '%') {
//       operationType = data;
//       tempNumber = calculate(history);
//   }
}

function renderTotal(value) {
  const totalEl = calculator.querySelector('.calculator__total');
  totalEl.innerHTML = value;
}

function renderHistory(historyArr) {
  const historyEl = calculator.querySelector('.calculator__history');
  let htmlEl = '';

  historyArr.forEach(item => {
    if (item >= 0) {
      htmlEl = htmlEl + `&nbsp;<span>${item}</span>`;
    } else if (['+', '-', '*', '/', '%'].includes(item)) {
        item = item === '*' ? '×' : item === '/' ? '÷' : item;
      htmlEl = htmlEl + `&nbsp;<strong>${item}</strong>`;
    }
  });
  historyEl.innerHTML = htmlEl;
}

function calculate(historyArr, isPercent, isEqual) {
  let total = 0;
  historyArr.forEach((item, indx) => {
    item = parseFloat(item);
    if (indx === 0) {
      total = item;
    } else if (indx - 2 >= 0 && isPercent && indx - 2 === historyArr.length - 3) {
      if (!isEqual) {
        const x = total;
        const operation = historyArr[indx-1];
        const n = item;
        total = calculatePercent(x, operation, n);
        }
    }
    else if (indx - 2 >= 0) {
      const prevItem = historyArr[indx - 1];
      if (item >= 0) {
        if (prevItem === '+') {
          total = total + item;
        } else if (prevItem === '-') {
          total = total - item;
        } else if (prevItem === '*') {
          total = total * item;
        } else if (prevItem === '/') {
          total = total / item;
        } else if (prevItem === '%') {
            total = total / 100 * item;
        }
      }
    }
  });
  // console.log(total);
  return total;
}


// логика процентов на калькуляторе

function calculatePercent(x, operation, n) {
  let total
  if (['+', '-'].includes(operation)) {
   total = x * (n / 100);
  } else if (['*', '/'].includes(operation)) {
    total = n / 100;
  }
  console.log(total);
  return total;
}
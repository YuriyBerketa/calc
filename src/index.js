const calculator = document.querySelector('.calculator');
let history = [];
let tempNumber = '';
let operationType = '';


calculator.addEventListener('click', ((event) => {
    const target = event.target;
    if (target.classList.contains('calculator__col')) {
        const data = target.dataset.type;
        operation(data);
            renderTotal(tempNumber);
        renderHistory(history);
       
        
    }
}))

function operation(data) {
    if (data >= 0) {
        operationType = 'number';
        tempNumber = tempNumber === '0' ? data : tempNumber + data;
    } else if (data === 'float') {
        operationType = 'number';
        if (/\./.test(tempNumber)) {
            
        } else if (tempNumber){
            tempNumber = tempNumber + '.';
        } else {
            tempNumber = '0.';
        }
    } else if (data === 'delete' && operationType === 'number') {
        tempNumber = tempNumber.substring(0, tempNumber.length - 1);
    } else if (['+', '-', '*', '/'].includes(data) && tempNumber) {
        operationType = data;
        history.push(tempNumber, operationType);
        tempNumber = '';
    } else if (data === '=') {
        history.push(tempNumber);
        tempNumber = calculate(history);
        // renderTotal(total);
        history = [];
    } else if (data === 'clear') {
        history = [];
        tempNumber = '0';
    }

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
        } else if (['+', '-', '*', '/'].includes(item)) {
            htmlEl = htmlEl + `&nbsp;<strong>${item}</strong>`;
}      
        })
    historyEl.innerHTML = htmlEl;
    }
    
function calculate(historyArr) {
    let total = 0;
    historyArr.forEach((item, indx) => {
        item = parseFloat(item);
        if (indx === 0) {
            total = item;
        } else if (indx - 2 >= 0) {
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
                 }
                }
                
        }
    })
    return total;
}
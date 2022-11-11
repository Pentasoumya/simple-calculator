const calulator = document.querySelector('.calculator')
const keys = calulator.querySelector('.calculator__keys')
const display = document.querySelector('.calculator__display')


const calculate = (n1, operator, n2) => {
    const firstNum = parseFloat(n1)
    const secondNum = parseFloat(n2)
    if (operator === 'add')return firstNum + secondNum
    if (operator === 'substract')return firstNum - secondNum
    if (operator === 'multiply')return firstNum * secondNum
    if (operator === 'divide')return firstNum / secondNum
}

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target
        const action = key.dataset.action
        const keycontent = key.textContent
        const displayedNum = display.textContent
        const previousKeyType = calulator.dataset.previousKeyType
        if (!action) {
            if (
                displayedNum === '0' ||
                previousKeyType === 'operator' ||
                previousKeyType === 'calculate'
            ) {
                display.textContent = keycontent
            } else {
                display.textContent = displayedNum + keycontent
            }
            calulator.dataset.previousKeyType = 'number'
        }
        if (action === 'decimal') {
            if (!displayedNum.includes('.')) {
                display.textContent = displayedNum + '.'
            } else if (
                previousKeyType === 'operator'||
                previousKeyType === 'calculate'
            ) {
                display.textContent = '0.'
            }

            calulator.dataset.previousKeyType = 'decimal'
        }
        Array.from(key.parentNode.children)
        .forEach(k => k.classList.remove('is-depressed'))
        if (
            action === 'add'||
            action === 'substract'||
            action === 'multiply'||
            action === 'divide'
        ) {
            const firstValue = calulator.dataset.firstValue
            const operator = calulator.dataset.operator
            const secondValue = displayedNum

            // Note: It's sufficient to check for firstValue and operator
            if (
                firstValue &&
                operator &&
                previousKeyType !== 'operator' &&
                previousKeyType !== 'calculate'
            ) {
                const calcValue = calculate(firstValue,operator,secondValue)
                display.textContent = calcValue
                calulator.dataset.firstValue = calcValue
            } else {
                calulator.dataset.firstValue = displayedNum
            }
            key.classList.add('is-depressed')
            // Add custom attribute
            calulator.dataset.previousKeyType = 'operator'
            calulator.dataset.firstValue = displayedNum
            calulator.dataset.operator = action
        }
        if (action === 'calculate') {
            let firstValue = calulator.dataset.firstValue
            const operator = calulator.dataset.operator
            const secondValue = displayedNum

            if (firstValue) {
                if (previousKeyType === 'calculate') {
                    firstValue = displayedNum
                    secondValue = calulator.dataset.modValue
                }
                display.textContent = calculate(firstValue,operator,secondValue)
            }
            // set modValue attribute
            calulator.dataset.modValue = secondValue
            calulator.dataset.previousKeyType = 'calculate'
        }
        if (action === 'clear') {
            if (key.textContent === 'AC') { 
                calulator.dataset.firstValue = ''
                calulator.dataset.modValue = ''
                calulator.dataset.operator = ''
                calulator.dataset.previousKeyType = ''
            } else {
                key.textContent = 'AC'
            }
            display.textContent = 0
            calulator.dataset.previousKeyType = 'clear'
        }
    }
})
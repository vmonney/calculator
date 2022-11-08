class Calculator {
  constructor (previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear() /* Start with everything cleared */ 
  }

  clear() {
    this.currentOperand = 0
    this.previousOperand = ''
    this.operation = undefined
  }

  delete() {
    if(this.currentOperand === 0) return
    this.currentOperand = this.currentOperand.slice(0,-1)
    if(this.currentOperand === '') {
      this.currentOperand = 0
    }
  }

  appendNumber(number) {
    if (this.currentOperand === 0) {
      this.currentOperand = number
    } else {
    this.currentOperand += number
    }
  }

  chooseOperation(operation) {
    /* prevent clicking several times operand */
    if (this.currentOperand === 0) return

    /* Compute in case we not press in the equal button*/
    if (this.previousOperand !== '') {
      this.compute()
    }

    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = 0
    return this.operation
}

  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseInt(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case "+":
        computation = prev + current
        break;
      case "-":
       computation = prev - current
       break;
      case "x":
        computation = prev * current
       break;
      case "÷":
       computation = prev / current
       break;
  
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = 
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = 
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
  
  getDisplayNumber(number) {
    const floatNumber = parseFloat(number)
    if (isNaN(floatNumber)) return ''
    return floatNumber.toLocaleString('fr')
  }

}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('.previous-operand')
const currentOperandTextElement = document.querySelector('.current-operand')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
    document.querySelector('.operator.active')?.classList.remove('active')
  })
});

operationButtons.forEach(button => {
  button.addEventListener('click', event => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
    const activeOperator = document.querySelectorAll('.operator.active').length >0;
    if (!activeOperator) {
      event.currentTarget.classList.add("active");
    }
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
  document.querySelector('.operator.active')?.classList.remove('active')
} )

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
  document.querySelector('.operator.active')?.classList.remove('active')
} )

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
} )
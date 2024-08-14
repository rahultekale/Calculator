document.addEventListener('DOMContentLoaded', function () {
    const result = document.getElementById('result');
    let currentInput = '';
    let equation = '';
    let operator = '';

    const numberButtons = document.querySelectorAll('.number');
    const operatorButtons = document.querySelectorAll('.operator');
    const clearButton = document.getElementById('clear');
    const backspaceButton = document.getElementById('backspace');
    const toggleSignButton = document.getElementById('toggle-sign');
    const equalsButton = document.getElementById('equals');
    const percentageButton = document.getElementById('percentage');

    numberButtons.forEach(button => {
        button.addEventListener('click', function () {
            currentInput += this.textContent;
            equation += this.textContent;
            result.value = equation;
        });
    });

    operatorButtons.forEach(button => {
        button.addEventListener('click', function () {
            if (currentInput === '' && equation !== '') {
                currentInput = equation.slice(-1);  // Use last character if user presses operator repeatedly
            }
            equation += ` ${this.textContent} `;
            result.value = equation;
            operator = this.textContent;
            currentInput = '';
        });
    });

    equalsButton.addEventListener('click', function () {
        if (equation !== '') {
            try {
                let finalResult = eval(equation.replace(/X/g, '*').replace(/÷/g, '/'));
                result.value = `${equation} = ${finalResult}`;
                equation = String(finalResult);  // Store the result for continued operations
                currentInput = equation;
            } catch {
                result.value = 'Error';
                equation = '';
                currentInput = '';
            }
        }
    });

    clearButton.addEventListener('click', function () {
        currentInput = '';
        equation = '';
        result.value = '';
    });

    backspaceButton.addEventListener('click', function () {
        if (equation !== '') {
            equation = equation.trim().slice(0, -1);
            currentInput = currentInput.slice(0, -1);
            result.value = equation;
        }
    });

    toggleSignButton.addEventListener('click', function () {
        if (currentInput !== '') {
            currentInput = String(-parseFloat(currentInput));
            equation = equation.replace(/(\d+|\d+\.\d+)$/, currentInput);
            result.value = equation;
        }
    });

    percentageButton.addEventListener('click', function () {
        if (currentInput !== '') {
            currentInput = String(parseFloat(currentInput) / 100);
            equation = equation.replace(/(\d+|\d+\.\d+)$/, currentInput);
            result.value = equation;
        }
    });
});

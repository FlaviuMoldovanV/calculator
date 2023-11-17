"use strict";

const calculator = {
    firstNumber: "",
    secondNumber: "",
    operator: "",
    total: null,
    dot: document.querySelector("#dot"),
    dotValue: true, // Flag to track if a dot is allowed in the current number
    equal: document.querySelector("#equal"),
    backspace: document.querySelector("#backspace"),
    clear: document.querySelector("#clear"),
    display: document.querySelector(".display"),
    resultDisplay: document.querySelector(".resultDisplay"),
};

const operators = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
};

function updateDisplay(input) {

    calculator.display.textContent += input;
    calculator.resultDisplay.textContent = calculator.total;
}

// Determines the result of any operation made by the user
function determineResult() {

    const first = parseFloat(calculator.firstNumber);
    const second = parseFloat(calculator.secondNumber);

    // Handles division by zero
    if (second === 0 && calculator.operator === "/") {
        alert("Nice try :)");
        location.reload();
    }

    calculator.total = operators[calculator.operator](first, second); 
    calculator.total = parseFloat((calculator.total).toFixed(3)); // Rounding the result to three decimal places
    calculator.firstNumber = calculator.total.toString();
    calculator.secondNumber = "";
}

function numberPress(number) {

    const targetNumber = calculator.operator === "" ? "firstNumber" : "secondNumber";

    calculator[targetNumber] += number;
    updateDisplay(number);
}

function operatorPress(operator) {

// In case the user wants to change the operator before making an operation
    if (calculator.operator !== "" && calculator.secondNumber == "") {
        calculator.display.textContent = calculator.display.textContent.slice(0, -3);
    }

    if (calculator.secondNumber !== "") {
        determineResult();
    }

    calculator.operator = operator;
    updateDisplay(` ${operator} `);
    calculator.dotValue = true;
}

function dotPress() {

    const number = calculator.operator === "" ? "firstNumber" : "secondNumber";


// In case the user wants to write a number less than 1
    if(calculator[number] === "")
    {
        calculator[number] = "0";
        updateDisplay("0");
    }

    calculator[number] +=".";
    updateDisplay(".");

    calculator.dotValue = false;
}


function equalPress() {

    // Only when the are 2 number values and an operator the equal should work
    if (calculator.firstNumber === "" || calculator.secondNumber === "" || calculator.operator === "") {
        alert("ERROR: Invalid action!");
    }
    else {
        determineResult();
        calculator.operator = "";
        calculator.resultDisplay.textContent = "";
        calculator.display.textContent = calculator.total;

    //Checks if the result has a decimal so the user can't type another
        if (calculator.total % 1 !== 0) {
            calculator.dotValue = false;
        }

        calculator.total = null;
    }
}

function backspacePress() {

    //Stores the last character in the display string
    const lastChar = calculator.display.textContent.charAt(calculator.display.textContent.length - 1);

    // if it's a dot then the flag is set to true so the user can add another if they desire
    if ( lastChar=== ".") {
        calculator.dotValue = true;
    }

    const number = calculator.operator === "" ? "firstNumber" : "secondNumber";

    calculator[number] = calculator[number].slice(0,-1);
    calculator.display.textContent = calculator.display.textContent.slice(0, -1);

}

document.querySelectorAll(".number").forEach(button => {
    button.addEventListener("click", () => numberPress(button.textContent));
});

document.querySelectorAll(".operator").forEach(button => {
    button.addEventListener("click", () => operatorPress(button.textContent));
});

calculator.equal.addEventListener("click", () => equalPress());

calculator.dot.addEventListener("click", () => { if (calculator.dotValue) dotPress() });

calculator.backspace.addEventListener("click", () => backspacePress());

// The page refreshes when the user presses the Clear button
calculator.clear.addEventListener("click", () => location.reload());







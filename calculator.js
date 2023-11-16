"use strict";

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equal = document.querySelector(".equal");
const clear = document.querySelector("#clear");

const calculator = {
    firstNumber: "",
    secondNumber: "",
    symbol: "",
    total: "",
    display: document.querySelector(".display"),
    resultDisplay: document.querySelector(".resultDisplay"),
}

const operators = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => parseFloat((a / b).toFixed(3)),
}

function updateDisplay(input) {

    calculator.display.textContent += input;
    calculator.resultDisplay.textContent = calculator.total;
}

function operation() {

    let first = parseFloat(calculator.firstNumber);
    let second = parseFloat(calculator.secondNumber);

    if (second == 0 && calculator.symbol == "/") {
        alert("Nice try :)");
        location.reload();
    }

    switch (calculator.symbol) {
        case "+":
            calculator.total = operators.add(first, second);
            break;
        case "-":
            calculator.total = operators.subtract(first, second);
            break;
        case "*":
            calculator.total = operators.multiply(first, second);
            break;
        case "/":
            calculator.total = operators.divide(first, second);
            break;
    }

    calculator.firstNumber = calculator.total;
    calculator.secondNumber = "";
}

function numberPress(number) {

    if (calculator.symbol === "") {
        calculator.firstNumber += number;
    }

    else {
        calculator.secondNumber += number;
    }

    updateDisplay(number);
}

function operatorPress(operator) {

    if (calculator.symbol === "") {
        calculator.symbol = operator;
    }
    else if (calculator.secondNumber == "") {
        calculator.display.textContent = calculator.display.textContent.slice(0, -3);
        calculator.symbol = operator;
    }
    else {
        operation();
        calculator.symbol = operator;
    }

    updateDisplay(` ${operator} `);
}

function equalPress() {
    if (calculator.firstNumber === "" || calculator.secondNumber === "" || calculator.symbol === "") {
        alert("ERROR Invalid action!");
    }
    else {
        operation();
        calculator.symbol = "";
        calculator.resultDisplay.textContent = "";
        calculator.display.textContent = calculator.total;
    }
}

numberButtons.forEach(button => {
    button.addEventListener("click", () => numberPress(button.textContent));
});

operatorButtons.forEach(button => {
    button.addEventListener("click", () => operatorPress(button.textContent));
});

equal.addEventListener("click", () => equalPress());

clear.addEventListener("click", () => location.reload());

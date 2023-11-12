"use strict";

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => parseFloat((a / b).toFixed(3));

let firstNumber = "";
let secondNumber = "";
let symbol = "";
let total = "";

const display = document.querySelector(".display");
const resultDisplay = document.querySelector(".resultDisplay")

function operation(firstNumber, secondNumber, operator) {

    firstNumber = parseFloat(firstNumber);
    secondNumber = parseFloat(secondNumber);

    if (secondNumber == 0 && operator == "/") { 
        alert("Nice try :)");
        location.reload();
    }

    switch (operator) {
        case "+":
            return add(firstNumber, secondNumber);
        case "-":
            return subtract(firstNumber, secondNumber);
        case "*":
            return multiply(firstNumber, secondNumber);
        case "/":
            return divide(firstNumber, secondNumber);
    }
}

function numberPress(input) {

    if (symbol == "") {
        firstNumber += input;
        display.textContent = firstNumber;
    }

    else {
        secondNumber += input;
        display.textContent += input;
    }
}

function operatorPress(input) {

    if (symbol == "") {
        symbol = input;
        display.textContent += ` ${input} `;
    }
    else {
        total = operation(firstNumber, secondNumber, symbol);
        firstNumber = total;
        secondNumber = "";
        symbol = input;
        display.textContent += ` ${input} `;
        resultDisplay.textContent = total;
    }
}

function equalPress() {
    if (firstNumber == "" || secondNumber == "" || symbol == "") {
        alert("ERROR Invalid action!");
    }
    else {
        total = operation(firstNumber, secondNumber, symbol);
        firstNumber = total;
        secondNumber = "";
        symbol = "";
        resultDisplay.textContent = "";
        display.textContent = total;
    }
}


const numberButtons = document.querySelectorAll(".number");

numberButtons.forEach(button => {
    button.addEventListener("click", () => numberPress(button.textContent));
});


const operatorButtons = document.querySelectorAll(".operator");

operatorButtons.forEach(button => {
    button.addEventListener("click", () => operatorPress(button.textContent));
});


const equal = document.querySelector(".equal");

equal.addEventListener("click", () => equalPress());

const clear = document.querySelector("#clear");

clear.addEventListener("click", () => location.reload());

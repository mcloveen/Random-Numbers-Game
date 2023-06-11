"use strict";

let numbers = [];
let clickedNumbers = [];
let remainingAttempts = 3;
let canClick = false;
let timeLeft = 18;
let timerInterval;

// Start game function
function startGame() {
    document.getElementById("time").textContent = timeLeft;
    document.querySelector("button").style.display = "none";
    canClick = true;
    hideNumbers();
    revealNumbersDelayed(); // Reqemleri gecikmeli goster
    startTimerDelayed(); // zamani gecikmeli baslat

    // background rengini convert et
    document.body.style.backgroundColor = "beige";
}


// 1'den 16'ya qeder olan ededler - Random function
function fillNumbersArray() {
    for (let i = 1; i <= 16; i++) {
        numbers.push(i);
    }
    numbers.sort(function (a, b) { return 0.5 - Math.random() });
}

// Create Table-function
function createTable() {
    let tableBody = document.getElementById("table-body");
    let index = 0;

    for (let i = 0; i < 4; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < 4; j++) {
            let cell = document.createElement("td");
            let numberText = document.createElement("span");
            numberText.textContent = numbers[index];
            let hiddenText = document.createElement("span");
            hiddenText.textContent = "";
            hiddenText.classList.add("hidden");
            cell.appendChild(numberText);
            cell.appendChild(hiddenText);
            cell.setAttribute("onclick", "checkNumber(this)");
            row.appendChild(cell);
            index++;
        }
        tableBody.appendChild(row);
    }
}

// hidden numbers function
function hideNumbers() {
    let cells = document.querySelectorAll("td");
    cells.forEach(function (cell) {
        let numberText = cell.querySelector("span:first-child");
        let hiddenText = cell.querySelector("span:last-child");
        numberText.classList.add("hidden");
        hiddenText.classList.remove("hidden");
    });
}

// reqemleri gecikmeli olaraq cixar
function revealNumbersDelayed() {
    let cells = document.querySelectorAll("td");
    let delay = 100; // gecikme vaxti
    let uniqueNumbers = Array.from(new Set(numbers)); // 

    cells.forEach(function (cell, index) {
        setTimeout(function () {
            let numberText = cell.querySelector("span:first-child");
            let hiddenText = cell.querySelector("span:last-child");
            let randomNumber = uniqueNumbers[index];
            numberText.textContent = randomNumber;
            numberText.classList.remove("hidden");
            hiddenText.classList.add("hidden");

            // son reqem cixdiqdan sonra oyunu baslat
            if (index === cells.length - 1) {
                canClick = true;
            }
        }, delay * (index + 1));
    });
}

// vaxti gecikmeli baslat
function startTimerDelayed() {
    let delay = 100 * numbers.length; // gecikme zamani

    setTimeout(function () {
        startTimer();
    }, delay);
}

// Num control function
function checkNumber(cell) {
    if (!canClick) {
        return;
    }

    let numberText = cell.querySelector("span:first-child");

    if (numberText.classList.contains("hidden")) {
        return;
    }

    let number = parseInt(numberText.textContent);
    if (number === clickedNumbers.length + 1) {
        cell.classList.add("green");
        clickedNumbers.push(number);
        if (clickedNumbers.length === 16) {
            alert("Tebrikler!");
            showRestartButton();
            document.body.style.backgroundColor = "black"; // background colour convert et
        }
    } else {
        if (!cell.classList.contains("red")) {
            cell.classList.add("red");
            remainingAttempts--;
            if (remainingAttempts === 0) {
                alert("Cehd etme sayınız bitti! Uduzdunuz!");
                showRestartButton();
                document.body.style.backgroundColor = "black"; // convert bacground
            } else {
                alert("Yanlıs seçim! Qalan cehd sayınız: " + remainingAttempts);
            }
        }
        canClick = false;
        setTimeout(function () {
            cell.classList.remove("red");
            canClick = true;
        }, 1000);
    }
}


// start time function
function startTimer() {
    timerInterval = setInterval(function () {
        timeLeft--;
        document.getElementById("time").textContent = timeLeft;
        if (timeLeft === 0) {
            alert("Vaxtiniz doldu! Uduzdunuz!");
            showRestartButton();
            document.body.style.backgroundColor = "black";
        }
    }, 1000);
}

// New game function
function restartGame() {
    clearInterval(timerInterval);
    numbers = [];
    clickedNumbers = [];
    remainingAttempts = 3;
    timeLeft = 20;
    clearTable();
    fillNumbersArray();
    createTable();
    document.getElementById("restartButton").style.display = "none";
    document.querySelector("button").style.display = "block";
    canClick = false;
}

// Table clear function
function clearTable() {
    let tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";
}

// Show New game start button 
function showRestartButton() {
    clearInterval(timerInterval);
    canClick = false;
    document.getElementById("restartButton").style.display = "block";
}

fillNumbersArray();
createTable();

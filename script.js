"use strict";

const statusMessage = {
  low: "TOO LOW",
  high: "TOO HIGH",
  correct: "YOU WON !!!",
  wrong: "You Lost...",
  start: "Start Guessing",
};

const secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

const message = document.querySelector(".message");
const numberElement = document.querySelector(".number");
const scoreElement = document.querySelector(".score");

const updateUI = function (backgroundColor, messageText) {
  document.body.style.backgroundColor = backgroundColor;
  message.textContent = messageText;
  numberElement.style.width = "30rem";
  numberElement.textContent = secretNumber;
};

const declareWin = function () {
  updateUI("#60b347", statusMessage.correct);
};

const handleWrongGuess = function (guessedNumber) {
  if (guessedNumber < secretNumber) {
    message.textContent = statusMessage.low;
  } else {
    message.textContent = statusMessage.high;
  }
  score--;
  scoreElement.textContent = score;
};

const declareLoss = function () {
  updateUI("#dc143c", statusMessage.wrong);
  score--;
  scoreElement.textContent = score;
};

const checkGuessedNumber = function () {
  const guessedNumber = +document.querySelector(".guess").value;
  if (guessedNumber === secretNumber) {
    declareWin();
  } else {
    if (score > 1) {
      handleWrongGuess(guessedNumber);
    } else {
      declareLoss();
    }
  }
};

const checkBtn = document
  .querySelector(".check")
  .addEventListener("click", checkGuessedNumber);

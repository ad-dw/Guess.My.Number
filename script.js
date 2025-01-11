"use strict";

const statusMessage = {
  low: "TOO LOW",
  high: "TOO HIGH",
  correct: "YOU WON !!!",
  wrong: "You Lost...",
  start: "Start Guessing",
  empty: "Enter a number!",
  outOfRange: "Guessed number not in range!",
};

const secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

const message = document.querySelector(".message");
const numberElement = document.querySelector(".number");
const scoreElement = document.querySelector(".score");
const checkBtn = document.querySelector(".check");

const updateUI = function (backgroundColor, messageText) {
  document.body.style.backgroundColor = backgroundColor;
  message.textContent = messageText;
  numberElement.style.width = "30rem";
  numberElement.textContent = secretNumber;
  checkBtn.disabled = true;
};

const declareWin = function () {
  updateUI("#60b347", statusMessage.correct);
  if (score > highscore) {
    document.querySelector(".highscore").textContent = score;
  }
};

const handleOutOfRangeGuess = function () {
  message.textContent = statusMessage.outOfRange;
};

const handleWrongGuess = function (guessedNumber) {
  if (guessedNumber < 0 || guessedNumber > 20) {
    handleOutOfRangeGuess();
  } else if (guessedNumber < secretNumber) {
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
  if (!guessedNumber) {
    message.textContent = statusMessage.empty;
  } else {
    if (guessedNumber === secretNumber) {
      declareWin();
    } else {
      if (score > 1) {
        handleWrongGuess(guessedNumber);
      } else {
        declareLoss();
      }
    }
  }
};

checkBtn.addEventListener("click", checkGuessedNumber);

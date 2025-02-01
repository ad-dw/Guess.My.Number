"use strict";

const statusMessage = {
  low: "TOO LOW",
  high: "TOO HIGH",
  correct: "YOU WON !!!",
  wrong: "You Lost...",
  start: "Start guessing...",
  empty: "Nothing to check! Enter a number",
  outOfRange: "Guessed number not in range!",
};

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

const message = document.querySelector(".message");
const numberElement = document.querySelector(".number");
const scoreElement = document.querySelector(".score");
const checkBtn = document.querySelector(".check");
const resetBtn = document.querySelector(".again");
const guessInputfeild = document.querySelector(".guess");

const updateUI = function (
  backgroundColor,
  messageText,
  secretNumberWidth,
  secretNumberValue,
  disableCheckBtn
) {
  document.body.style.backgroundColor = backgroundColor;
  message.textContent = messageText;
  numberElement.style.width = secretNumberWidth;
  numberElement.textContent = secretNumberValue;
  checkBtn.disabled = disableCheckBtn;
};

const startConfetti = () => {
  setTimeout(function () {
    confetti.start();
  }, 1000);
};

const stopConfetti = () => {
  setTimeout(function () {
    confetti.stop();
  }, 5000);
};

const declareWin = function () {
  updateUI("#60b347", statusMessage.correct, "30rem", secretNumber, true);
  if (score > highscore) {
    document.querySelector(".highscore").textContent = score;
  }
  guessInputfeild.removeEventListener("keydown", handleKeyInteraction);
  startConfetti();
  stopConfetti();
};

const handleOutOfRangeGuess = function () {
  message.textContent = statusMessage.outOfRange;
};

const handleWrongGuess = function (guessedNumber) {
  if (guessedNumber <= 0 || guessedNumber > 20) {
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
  updateUI("#dc143c", statusMessage.wrong, "30rem", secretNumber, true);
  score--;
  scoreElement.textContent = score;
  guessInputfeild.removeEventListener("keydown", handleKeyInteraction);
};

const checkGuessedNumber = function () {
  let guessedNumber = guessInputfeild.value;
  if (!guessedNumber) {
    message.textContent = statusMessage.empty;
  } else {
    guessedNumber = +guessedNumber;
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

const resetGame = function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  scoreElement.textContent = score;
  updateUI("#222", statusMessage.start, "15rem", "?", false);
  document.querySelector(".guess").value = "";
  guessInputfeild.addEventListener("keydown", handleKeyInteraction);
};

const handleKeyInteraction = function (event) {
  if (event.key === "Enter") {
    checkGuessedNumber();
  }
};

checkBtn.addEventListener("click", checkGuessedNumber);
resetBtn.addEventListener("click", resetGame);
guessInputfeild.addEventListener("keydown", handleKeyInteraction);

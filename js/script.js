// Dice Img
const elDiceImg = document.querySelector("[data-dice]");
elDiceImg.style.display = "none";

// Variables
let currentScore = 0;
let activePlayer = 0;
let score = [0, 0];
let isGameOver = true;

// Function switch player
function switchPlayer() {
  currentScore = 0;
  document.querySelector(`[data-current-${activePlayer}]`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.querySelector("[data-player-0]").classList.toggle("player--active");
  document.querySelector("[data-player-1]").classList.toggle("player--active");
}

// CLick document
document.addEventListener("click", (evt) => {
  rollBtnClick(evt);
  holdBtnClick(evt);
  newBtnCLick(evt);
});

// Roll Btn Click
function rollBtnClick(evt) {
  const el = evt.target.closest("[data-btn-roll]");

  if (!el) return;

  if (isGameOver) {
    elDiceImg.style.display = "block";

    const randomNum = Math.trunc(Math.random() * 6 + 1);
    elDiceImg.src = `images/dice-${randomNum}.png`;

    if (randomNum !== 1) {
      currentScore += randomNum;
      document.querySelector(`[data-current-${activePlayer}]`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
}

// Hold Btn Click
function holdBtnClick(evt) {
  const el = evt.target.closest("[data-btn-hold]");

  if (!el) return;

  if (isGameOver) {
    score[activePlayer] += currentScore;
    document.querySelector(`[data-score-${activePlayer}]`).textContent =
      score[activePlayer];

    if (score[activePlayer] >= 100) {
      isGameOver = !isGameOver;
      document
        .querySelector(`[data-player-${activePlayer}]`)
        .classList.add("player--winner");
    } else {
      switchPlayer();
    }
  }
}

// New Btn click
function newBtnCLick(evt) {
  const el = evt.target.closest("[data-btn-new]");

  if (!el) return;

  currentScore = 0;
  activePlayer = 0;
  score = [0, 0];
  isGameOver = true;
  document.querySelector(`[data-current-0]`).textContent = currentScore;
  document.querySelector(`[data-current-1]`).textContent = currentScore;

  document.querySelector(`[data-score-0]`).textContent = score[activePlayer];
  document.querySelector(`[data-score-1]`).textContent = score[activePlayer];

  document.querySelector(`[data-player-0]`).classList.remove("player--winner");
  document.querySelector(`[data-player-1]`).classList.remove("player--winner");
  document.querySelector(`[data-player-1]`).classList.remove("player--active");
  document.querySelector(`[data-player-0]`).classList.add("player--active");
}

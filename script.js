const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");
const modeBtn = document.getElementById("modeBtn");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = true;
let vsComputer = false;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

initializeGame();

function initializeGame() {
  cells.forEach(cell => cell.addEventListener("click", cellClicked));
  restartBtn.addEventListener("click", restartGame);
  modeBtn.addEventListener("click", toggleMode);
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function cellClicked() {
  const cellIndex = this.getAttribute("data-index");

  if (board[cellIndex] !== "" || !running) return;

  updateCell(this, cellIndex);
  checkWinner();

  if (vsComputer && running) {
    computerMove();
    checkWinner();
  }
}

function updateCell(cell, index) {
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
  let roundWon = false;

  for (let condition of winPatterns) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `Player ${currentPlayer} wins! 🎉`;
    running = false;
  } else if (!board.includes("")) {
    statusText.textContent = `It's a draw! 😐`;
    running = false;
  } else {
    changePlayer();
  }
}

function restartGame() {
  currentPlayer = "X";
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(cell => (cell.textContent = ""));
  running = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function toggleMode() {
  vsComputer = !vsComputer;
  modeBtn.textContent = vsComputer ? "Mode: Player vs Computer" : "Mode: Player vs Player";
  restartGame();
}

function computerMove() {
  let emptyIndices = board.map((v, i) => (v === "" ? i : null)).filter(i => i !== null);
  if (emptyIndices.length === 0) return;
  let randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  board[randomIndex] = currentPlayer;
  cells[randomIndex].textContent = currentPlayer;
}

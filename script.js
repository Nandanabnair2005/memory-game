const colors = ["violet", "orchid", "purple", "magenta"];
let gameSequence = [];
let playerSequence = [];
let acceptingInput = false;

// DOM Elements
const buttons = document.querySelectorAll(".button");
const startButton = document.getElementById("start-button");
const statusText = document.getElementById("status");




// Button click handler
buttons.forEach(button => {
  button.addEventListener("click", () => {
    if (!acceptingInput) return;

    const color = button.dataset.color;
    playerSequence.push(color);
    flashButton(color);

    const index = playerSequence.length - 1;
    if (playerSequence[index] !== gameSequence[index]) {
      endGame();
      return;
    }

    if (playerSequence.length === gameSequence.length) {
      acceptingInput = false;
      setTimeout(nextRound, 1000);
    }
  });
});

// Start game
startButton.addEventListener("click", startGame);

function startGame() {
  gameSequence = [];
  playerSequence = [];
  statusText.textContent = "Watch the sequence...";
  nextRound();
}

function nextRound() {
  playerSequence = [];
  const nextColor = colors[Math.floor(Math.random() * colors.length)];
  gameSequence.push(nextColor);
  showSequence();
}

function showSequence() {
  acceptingInput = false;
  let i = 0;

  const interval = setInterval(() => {
    flashButton(gameSequence[i]);
    i++;
    if (i >= gameSequence.length) {
      clearInterval(interval);
      acceptingInput = true;
      statusText.textContent = `Your turn (Level ${gameSequence.length})`;
    }
  }, 800);
}

function flashButton(color) {
  const button = document.querySelector(`.button.${color}`);
  if (button) {
    button.classList.add("active");
    setTimeout(() => button.classList.remove("active"),400);
  }
}

function endGame() {
  acceptingInput = false;
  failSound.currentTime = 0;
  failSound.play();
  statusText.textContent = `Game Over! You reached level ${gameSequence.length}. Click Start to play again.`;
}

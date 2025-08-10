const colors = ['violet', 'orchid', 'purple', 'magenta'];
let gamePattern = [];
let userPattern = [];
let level = 0;
let clickable = false;

const statusText = document.getElementById('status');
const startButton = document.getElementById('start-button');
const buttons = document.querySelectorAll('.button');

// Flash animation for color
function flash(color) {
  const btn = document.querySelector(`.button.${color}`);
  btn.classList.add('active');
  setTimeout(() => {
    btn.classList.remove('active');
  }, 300);
}

// Play a new round
function nextSequence() {
  userPattern = [];
  level++;
  statusText.textContent = `Level ${level}`;
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  gamePattern.push(randomColor);
  playPattern();
}

// Show the full pattern to the user
function playPattern() {
  clickable = false;
  let i = 0;
  const interval = setInterval(() => {
    flash(gamePattern[i]);
    i++;
    if (i >= gamePattern.length) {
      clearInterval(interval);
      clickable = true;
    }
  }, 600);
}

// Start game
startButton.addEventListener('click', () => {
  gamePattern = [];
  userPattern = [];
  level = 0;
  statusText.textContent = 'Get ready...';
  setTimeout(() => {
    nextSequence();
  }, 500);
});

// Handle user clicks
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    if (!clickable) return;

    const clickedColor = btn.getAttribute('data-color');
    userPattern.push(clickedColor);
    flash(clickedColor);
    checkAnswer(userPattern.length - 1);
  });
});

// Check the player's input
function checkAnswer(currentIndex) {
  if (userPattern[currentIndex] !== gamePattern[currentIndex]) {
    gameOver();
    return;
  }

  if (userPattern.length === gamePattern.length) {
    setTimeout(() => nextSequence(), 1000);
  }
}

// Game over logic
function gameOver() {
  statusText.textContent = `❌ Game Over at Level ${level}. Click "Start Game" to try again.`;
  clickable = false;
  gamePattern = [];
  userPattern = [];
  level = 0;
}

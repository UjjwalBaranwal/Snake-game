// defining the HTML element
const board = document.querySelector("#game-board");
console.log(board);
const instructionText = document.querySelector("#instructionText");
const logo = document.querySelector(".logo");
const score = document.querySelector("#score");
const highScoreElement = document.querySelector("#highScore");

//defining game variable
const GridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let direction = "right";
let gameInteval;
let gameSpeedDelay = 200;
let gameStarted = false;
let highScore = 0;

//draw map snake food

function draw() {
  board.innerHTML = "";
  drawSnake();
  drawFood();
  updateScore();
}

//draw snake
function drawSnake() {
  snake.forEach((obj) => {
    const snakeElement = createGameElement("div", "snake");
    setPosition(snakeElement, obj);
    board.appendChild(snakeElement);
  });
}
// draw food
function drawFood() {
  if (gameStarted) {
    const foodElement = createGameElement("div", "food");
    setPosition(foodElement, food);
    board.appendChild(foodElement);
  }
}
//creating a snake and food or div

function createGameElement(tag, className) {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

//function for set position of snake and food
function setPosition(element, position) {
  element.style.gridColumn = position.x;
  element.style.gridRow = position.y;
}
//generating food
function generateFood() {
  const x = Math.floor(Math.random() * GridSize) + 1;
  const y = Math.floor(Math.random() * GridSize) + 1;
  return { x, y };
}

//moving the snake
function move() {
  const head = { ...snake[0] };
  switch (direction) {
    case "right":
      head.x++;
      break;
    case "up":
      head.y--;
      break;
    case "left":
      head.x--;
      break;
    case "down":
      head.y++;
      break;
  }
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    food = generateFood();
    increaseSpeed();
    clearInterval(gameInteval);
    gameInteval = setInterval(() => {
      move();
      checkCollision();
      draw();
    }, gameSpeedDelay);
  } else {
    snake.pop();
  }
  //   snake.pop();
}
//increase speed function
function increaseSpeed() {
  console.log(gameSpeedDelay);
  if (gameSpeedDelay > 150) {
    gameSpeedDelay -= 5;
  } else if (gameSpeedDelay > 100) {
    gameSpeedDelay -= 3;
  } else if (gameSpeedDelay > 50) {
    gameSpeedDelay -= 2;
  } else if (gameSpeedDelay > 25) {
    gameSpeedDelay -= 1;
  }
}

// start game function
function startGame() {
  gameStarted = true; //starting the game
  instructionText.style.display = "none";
  logo.style.display = "none";
  gameInteval = setInterval(() => {
    move();
    checkCollision();
    draw();
  }, gameSpeedDelay);
}

// reset game function
function resetGame() {
  updateHighScore();
  stopGame();
  snake = [{ x: 10, y: 10 }];
  food = generateFood();
  direction = "right";
  gameSpeedDelay = 200;
  updateScore();
}
// stop game

function stopGame() {
  clearInterval(gameInteval);
  gameStarted = false;
  instructionText.style.display = "block";
  logo.style.display = "block";
}

function updateScore() {
  const currentScore = snake.length - 1;
  score.textContent = currentScore.toString().padStart(3, "0");
}

function updateHighScore() {
  const currentScore = snake.length - 1;
  if (currentScore > highScore) {
    highScore = currentScore;
    highScoreElement.textContent = highScore.toString().padStart(3, "0");
  }
  highScoreElement.style.display = "block";
}

//check the collison
function checkCollision() {
  const head = snake[0];
  if (head.x < 1 || head.x > GridSize || head.y < 1 || head.y > GridSize) {
    resetGame();
  }
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      resetGame();
    }
  }
}

// creating keypresed event listner

function handleKeyPress(e) {
  if ((!gameStarted && e.code === "Space") || (!gameStarted && e.key === " ")) {
    startGame();
  } else {
    switch (e.key) {
      case "ArrowUp":
        direction = "up";
        break;
      case "ArrowDown":
        direction = "down";
        break;
      case "ArrowRight":
        direction = "right";
        break;
      case "ArrowLeft":
        direction = "left";
        break;
    }
  }
}
document.addEventListener("keydown", handleKeyPress);

//testing function
// draw();
//test moving
// setInterval(() => {
//   move();
//   draw();
// }, 200);

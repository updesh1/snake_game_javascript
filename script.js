const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreText = document.getElementById("score");

const box = 20;
let score = 0;

let snake = [
  { x: 300, y: 300 },
  { x: 280, y: 300 },
  { x: 260, y: 300 }
];

let food = {
  x: Math.floor(Math.random() * 30) * box,
  y: Math.floor(Math.random() * 30) * box
};

let direction = "RIGHT";
let gameOver = false;

document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowUp") changeDirectionByButton("UP");
  if (event.key === "ArrowDown") changeDirectionByButton("DOWN");
  if (event.key === "ArrowLeft") changeDirectionByButton("LEFT");
  if (event.key === "ArrowRight") changeDirectionByButton("RIGHT");
});

function changeDirectionByButton(newDirection) {
  if (newDirection === "UP" && direction !== "DOWN") direction = "UP";
  if (newDirection === "DOWN" && direction !== "UP") direction = "DOWN";
  if (newDirection === "LEFT" && direction !== "RIGHT") direction = "LEFT";
  if (newDirection === "RIGHT" && direction !== "LEFT") direction = "RIGHT";
}

function drawGame() {
  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.fillText("Game Over", 190, 280);
    ctx.font = "24px Arial";
    ctx.fillText("Click Restart", 220, 320);
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "lime" : "white";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = "black";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = "blue";
  ctx.beginPath();
  ctx.arc(food.x + box / 2, food.y + box / 2, box / 2, 0, 2 * Math.PI);
  ctx.fill();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === "UP") snakeY -= box;
  if (direction === "DOWN") snakeY += box;
  if (direction === "LEFT") snakeX -= box;
  if (direction === "RIGHT") snakeX += box;

  if (snakeX === food.x && snakeY === food.y) {
    score++;
    scoreText.textContent = "Score: " + score;

    food = {
      x: Math.floor(Math.random() * 30) * box,
      y: Math.floor(Math.random() * 30) * box
    };
  } else {
    snake.pop();
  }

  const newHead = { x: snakeX, y: snakeY };

  if (
    snakeX < 0 ||
    snakeY < 0 ||
    snakeX >= canvas.width ||
    snakeY >= canvas.height ||
    collision(newHead, snake)
  ) {
    gameOver = true;
  }

  snake.unshift(newHead);
}

function collision(head, snakeArray) {
  for (let i = 0; i < snakeArray.length; i++) {
    if (head.x === snakeArray[i].x && head.y === snakeArray[i].y) {
      return true;
    }
  }
  return false;
}

function restartGame() {
  score = 0;
  scoreText.textContent = "Score: 0";

  snake = [
    { x: 300, y: 300 },
    { x: 280, y: 300 },
    { x: 260, y: 300 }
  ];

  food = {
    x: Math.floor(Math.random() * 30) * box,
    y: Math.floor(Math.random() * 30) * box
  };

  direction = "RIGHT";
  gameOver = false;
}

setInterval(drawGame, 100);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}
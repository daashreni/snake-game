// Define your game variables
let blockSize = 25;
let total_row = 18;
let total_column = 18;
let board;
let context;

let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

let speedX = 0;
let speedY = 0;

let snakeBody = [];

let foodX;
let foodY;

let gameOver = false;

// Function to initialize or reset the game
function initializeGame() {
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    speedX = 0;
    speedY = 0;
    snakeBody = [];
    gameOver = false;
    placeFood();
}

window.onload = function () {
    board = document.getElementById('board');
    board.height = total_row * blockSize;
    board.width = total_column * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener('keyup', changeDirection);
    setInterval(update, 1000 / 10);
}

function update() {
    if (gameOver) {
        return;
    }

    context.clearRect(0, 0, board.width, board.height); // Clear the board

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX === foodX && snakeY === foodY) {
        snakeBody.push([snakeX, snakeY]);
        placeFood();
    } else {
        // Move the snake's body forward
        for (let i = snakeBody.length - 1; i > 0; i--) {
            snakeBody[i] = snakeBody[i - 1];
        }
    }

    // Update the head position
    snakeX += speedX * blockSize;
    snakeY += speedY * blockSize;

    // Update the first segment of snakeBody to reflect the new head position
    snakeBody[0] = [snakeX, snakeY];

    // Check for collision with the snake's body
    for (let i = 1; i < snakeBody.length; i++) {
        if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
            gameOver = true;
            alert("Game over! You collided with yourself. Click OK to restart.");
            initializeGame(); // Restart the game
            return; // Exit update function to prevent further execution
        }
    }

    // Check if the snake has hit the boundaries
    if (snakeX < 0 || snakeX >= total_column * blockSize || snakeY < 0 || snakeY >= total_row * blockSize) {
        gameOver = true;
        alert("Game over! You hit the wall. Click OK to restart.");
        initializeGame(); // Restart the game
        return; // Exit update function to prevent further execution
    }

    // Draw the snake
    context.fillStyle = "green";
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }
}

function changeDirection(e) {
    if (e.code === "ArrowUp" && speedY !== 1) {
        speedX = 0;
        speedY = -1;
    } else if (e.code === "ArrowDown" && speedY !== -1) {
        speedX = 0;
        speedY = 1;
    } else if (e.code === "ArrowLeft" && speedX !== 1) {
        speedX = -1;
        speedY = 0;
    } else if (e.code === "ArrowRight" && speedX !== -1) {
        speedX = 1;
        speedY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * total_column) * blockSize;
    foodY = Math.floor(Math.random() * total_row) * blockSize;
}

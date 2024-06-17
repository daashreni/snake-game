let blockSize = 25;
let total_row = 18;
let total_column = 18;
let board;
let context;

let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

//set total no of rows and columns
let speedX = 0;
let speedY = 0;

let snakeBody = [];

let foodX;
let foodY;

let gameOver = false;

window.onload = function () {
    board = document.getElementById('board');
    board.height = total_row * blockSize;
	board.width = total_column * blockSize;
	context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000 / 10);
}


function update() {
    if (gameOver) {
        return;
    }

    context.fillStyle = "#c5dc44";
    context.fillRect(0, 0,  board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
    }
    
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "green";
    snakeX += speedX * blockSize;
    snakeY += speedY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    if ( snakeX < 0 
        || snakeX > total_column * blockSize 
        || snakeY < 0 
        || snakeY > total_row * blockSize){
        
        gameOver = true;
        alert("it's over");
    
    }

    for ( let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameOver = true;
            alert("get over with yourself");
        }
    }
}

function changeDirection(e) {
    if(e.code == "ArrowUp" && speedY != 1){
        speedX = 0;
        speedY = -1;
    }
    else if(e.code == "ArrowDown" && speedY != -1){
        speedX = 0;
        speedY = 1;
    }
    else if(e.code == "ArrowLeft" && speedX != 1){
        speedX = -1;
        speedY = 0;
    }
    else if(e.code == "ArrowRight" && speedX != -1){
        speedX = 1;
        speedY = 0;
    }
}

function placeFood(){
    foodX = Math.floor(Math.random() * total_column) * blockSize;
    foodY = Math.floor(Math.random() * total_row) * blockSize;
}



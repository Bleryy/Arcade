
    

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const scoreDiv = document.getElementById("Score")


let snake = {
    x:10, 
    y:10,
    size:20,
    direction: "right",
    body: [[20, 20], [20, 20]]
};

let apple={
    x: Math.floor(Math.random() * (canvas.width / 20)) * 20, 
    y: Math.floor(Math.random() * (canvas.height / 20)) * 20,
    size:20,
};

let isRunning;
let intervalId;

function drawSnake() {
    ctx.fillStyle = "green";

    for(let i=0; i<snake.body.length; i++){
        let segment = snake.body[i];
        ctx.fillRect(segment[0], segment[1], snake.size, snake.size);
    }
}

function drawApple() {
    ctx.fillStyle = "red";
    ctx.fillRect(apple.x, apple.y, apple.size, apple.size);
}

// Use the keys to move the snake as well having the body move even after it grows..
function moveSnake() {
    if (snake.direction === "right") {
        snake.body.unshift([snake.body[0][0]+snake.size, snake.body[0][1]]);
        snake.body.pop();
    }
    else if (snake.direction === "left") {
        snake.body.unshift([snake.body[0][0]-snake.size, snake.body[0][1]]);
        snake.body.pop();
    }
    else if (snake.direction === "up") {
        snake.body.unshift([snake.body[0][0], snake.body[0][1]-snake.size]);
        snake.body.pop();
    }
    else if (snake.direction === "down") {
        snake.body.unshift([snake.body[0][0], snake.body[0][1]+snake.size]);
        snake.body.pop();
    }
	
}

function keys(event){
	if (event.code == 'ArrowRight'){
        snake.direction = "right";
    }
    else if (event.code == 'ArrowLeft'){
        snake.direction = "left";
    }
    else if (event.code == 'ArrowUp'){
        snake.direction = "up";
    }
    else if (event.code == 'ArrowDown'){
        snake.direction = "down";
    }
}

function endGame() {
	setTimeout(function() { scoreDiv.innerText = ("Game over! Score: " + (snake.body.length - 2)); }, 100);
	document.removeEventListener('keydown', keys, true);
	endGame = true;
	isRunning = false;

}

// It either hits a wall or it collides with itself the game should end..
function checkCollision() {
    // Check if snake has collided with the apple
    if (snake.body[0][0] === apple.x && snake.body[0][1] === apple.y) {
        // Update the position of the apple
        apple.x = Math.floor(Math.random() * (canvas.width / apple.size)) * apple.size;
        apple.y = Math.floor(Math.random() * (canvas.height / apple.size)) * apple.size;

        // Add a body to the snake
        snake.body.push([snake.body[snake.body.length-1][0], snake.body[snake.body.length-1][1]]);
		let segment = snake.body.length-1;
        ctx.fillRect(segment[0], segment[1], snake.size, snake.size);
		//console.log(snake.body.length)
		
    }
	if (snake.body[0][0] < -20 || snake.body[0][1] < -20 || snake.body[0][0] > 500 || snake.body[0][1] > 500){
		
		endGame()= true;
		
	}
	for( let i = 1; i < snake.body.length; i++){
		if (snake.body[0][0] == snake.body[i][0] && snake.body[0][1] == snake.body[i][1])
			
		endGame()= true;
    }


}


document.addEventListener('keydown', keys, true);

function score(){
	if (snake.body.length > 2){
		scoreDiv.innerText = "Score: " + (snake.body.length - 2);
		
	};


}


function update() {
	if(isRunning){
	moveSnake();
    checkCollision();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawApple();
	score();
	}
}

function startGame(event) {
    intervalId = setInterval(update, 100);
	isRunning = true;

}

function resetGame(event) {
    clearInterval(intervalId);
    snake.x = 0;
    snake.y = 0;
    snake.direction = "right";
    drawSnake();
}

document.getElementById("resetButton").addEventListener("click", () => {
    location.reload();
});

document.getElementById("startButton").addEventListener("click", startGame);

//board
var blocksize=25;
var rows=20;
var cols=50
let board;
let context;
let score = 0;
let gameSpeed = 10; // updates per second
let gameLoop;

//snake head
let snakeX= blocksize*5;
let snakeY= blocksize*5;

var velocityX=0;
var velocityY=0;

var snakeBody=[];

//snake food
var foodX;
var foodY;

var gameover= false;

window.onload=function(){
    board=document.getElementById("board");
    board.height=rows*blocksize;
    board.width=cols*blocksize;
    context=board.getContext("2d"); //used for drawing on the board

    placeFood();
    document.addEventListener("keyup",changeDirection);
    // update();
    gameLoop = setInterval(update, 1000 / gameSpeed);
}
function update(){
    if(gameover){
        return;
    }

    context.fillStyle="black";
    context.fillRect(0,0,board.width,board.height);
    context.fillStyle = "white";
    context.font = "20px Arial";
    context.fillText("Score: " + score, 10, 25);

    context.fillStyle="red";
    context.fillRect(foodX,foodY,blocksize,blocksize);

    if(snakeX==foodX && snakeY==foodY){
        snakeBody.push([foodX,foodY]);
        placeFood();
        score++;
        document.getElementById("score").innerText = "Score: " + score;

        if (score % 10 == 0 && gameSpeed < 25) { // cap the speed
            gameSpeed += 1;
            clearInterval(gameLoop);
            gameLoop = setInterval(update, 1000 / gameSpeed);
        }
    }

    for(let i=snakeBody.length-1;i>0;i--){
        snakeBody[i]=snakeBody[i-1];
    }
    if(snakeBody.length){
        snakeBody[0]=[snakeX,snakeY];
    }
    
    context.fillStyle="lime";
    snakeX+=velocityX*(blocksize);
    snakeY+=velocityY*(blocksize);
    context.fillRect(snakeX,snakeY,blocksize,blocksize);

    for(let i=0;i<snakeBody.length;i++){
        context.fillRect(snakeBody[i][0],snakeBody[i][1],blocksize,blocksize);
    }
    if(snakeX<0 || snakeX>cols*blocksize || snakeY<0 || snakeY>rows*blocksize){
        gameover=true;
        document.getElementById("gameOver").classList.add("show");
    }
    for(let i=0;i<snakeBody.length;i++){
        if(snakeX==snakeBody[i][0] && snakeY==snakeBody[i][1]){
            gameover=true;
           document.getElementById("gameOver").classList.add("show");
        }
    }
}

function placeFood(){
    foodX=Math.floor(Math.random()*cols)*blocksize;
    foodY=Math.floor(Math.random()*rows)*blocksize;
}
function changeDirection(e){
    if(e.key=="i" && velocityY!=1){
        velocityX=0;
        velocityY=-1;
    }
    else if(e.key=="k" && velocityY!= -1){
        velocityX=0;
        velocityY=1;
    }
    else if(e.key=="j" && velocityX!=1){
        velocityX=-1;
        velocityY=0;
    }
    else if(e.key=="l" && velocityX!= -1){
        velocityX=1;
        velocityY=0;
    }
}
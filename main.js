var playerYVelocity = 0;

var ballXVelocity;
if(getRndInteger(0,2) == 1){
  ballXVelocity = 3;
}
else{
  ballXVelocity = -3;
}
var ballYVelocity = 0;

var leftPlayerRight;
var leftPlayerTop;
var leftPlayerBottom;
var rightPlayerLeft;
var rightPlayerTop;
var rightPlayerBottom;

var ballLeft;
var ballRight;
var ballTop;
var ballBottom;

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

document.addEventListener('keydown', function (event) {
  if (event.key == "ArrowUp") {
    playerYVelocity = -10
  }
  else if (event.key == "ArrowDown") {
    playerYVelocity = 10
  }
});

document.addEventListener('keyup', function (event) {
  if (event.key == "ArrowUp") {
    playerYVelocity = 0
  }
  else if (event.key == "ArrowDown") {
    playerYVelocity = 0
  }
});


var myGameArea = {
  canvas: document.getElementById("myCanvas"),
  start: function () {
    this.canvas.width;
    this.canvas.height;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(periodic, 10);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

var leftPlayer;
var rightPlayer;
var object;

var height = 100;
var width = 30;

function startGame() {
  myGameArea.start();
  leftPlayer = new player(width, height, "white", 100, 500);
  rightPlayer = new player(width, height, "white", 900, 500);
  object = new ball(40, "white", 500, 500)
}

var extraSpeed = 0;
function increaseSpeed(){
  extraSpeed +=0.15;
}

function player(width, height, color, x, y, rot) {
  this.width = width;
  this.rot = rot;
  this.height = height;
  
  this.x = x;
  this.y = y;
  this.update = function () {
    ctx = myGameArea.context;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = color;
    ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
    ctx.restore();
  }

}

function ball(size, color, x, y) {
  this.size = size;
  this.x = x;
  this.y = y;
  this.color = color;
  this.x = x;
  this.y = y;
  this.update = function () {
    ctx = myGameArea.context;
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }

}


function isContacting() {
  //This function handles detection of contacting one of the paddles.
  leftPlayerRight = leftPlayer.x + leftPlayer.width/2;
  leftPlayerTop = leftPlayer.y + leftPlayer.height/2;
  leftPlayerBottom = leftPlayer.y - leftPlayer.height/2;
  rightPlayerLeft = rightPlayer.x - rightPlayer.width/2;
  rightPlayerTop = rightPlayer.y + rightPlayer.height/2;
  rightPlayerBottom = rightPlayer.y - rightPlayer.height/2;

  ballLeft = object.x - object.size; //size = the radius
  ballRight = object.x + object.size;
  ballTop = object.y + object.size;
  ballBottom = object.y - object.size

  //Is game over?
  if (ballLeft < 0){
    ballXVelocity=0;
    ballYVelocity = 0;
    extraSpeed = 0;
    object.x = 500;
    object.y = 500;
    ballXVelocity = 2;
    extraSpeed = 0;
  }
  if (ballRight > 1000){
    ballXVelocity=0;
    ballYVelocity = 0;
    object.x = 500;
    object.y = 500;
    ballXVelocity = 2;
    extraSpeed = 0;
  }

  //Top and bottom walls
  if ((ballBottom <= 0)){
    ballYVelocity = getRndInteger(4,8);
  }
  if ((ballTop >= 1000)){
    ballYVelocity = -getRndInteger(4,8);
  }

  if (((ballLeft < leftPlayerRight) && (ballLeft > leftPlayerRight-10)) && ((ballTop > leftPlayerBottom) && (ballBottom < leftPlayerTop))) {
    increaseSpeed();
    object.x = leftPlayerRight + object.size + 5
    ballXVelocity = 6 + extraSpeed;
    ballYVelocity = getRndInteger(-3,3)
    
  }
  if (((ballRight > rightPlayerLeft) && ((ballRight < rightPlayerLeft+10))) && ((ballTop > rightPlayerBottom) && (ballBottom < rightPlayerTop))) {
    increaseSpeed();
    object.x = rightPlayerLeft - object.size - 5
    ballXVelocity = -6 - extraSpeed;
    ballYVelocity = getRndInteger(-3,3)
  }
}

function periodic() {
  myGameArea.clear();
  leftPlayer.y += playerYVelocity;
  leftPlayer.update();
  rightPlayer.y += playerYVelocity;
  rightPlayer.update();
  object.x += ballXVelocity;
  object.y += ballYVelocity;
  object.update()

  isContacting();
}

startGame();
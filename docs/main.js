var playerYVelocity = 0;
var ballXVelocity = -2;

document.addEventListener('keydown', function (event) {
  if (event.key == "ArrowUp") {
    playerYVelocity = -5
  }
  else if (event.key == "ArrowDown") {
    playerYVelocity = 5
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
    this.interval = setInterval(updateGameArea, 20);
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
  leftPlayer = new player(width, height, "black", 100, 500);
  rightPlayer = new player(width, height, "black", 900, 500);
  object = new ball(40, "red", 500, 500)
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
  if ((object.x - 50) < (leftPlayer.x + width / 2)) { //Left Player Detection
    //TODO:


  }
}


function updateGameArea() {
  myGameArea.clear();

  leftPlayer.y += playerYVelocity;
  leftPlayer.update();

  rightPlayer.y += playerYVelocity;
  rightPlayer.update();

  object.x += ballXVelocity; //temp
  object.update()
  isContacting();
}

function setSpeed() {
  var mylist = document.getElementById("myList");
  var result = mylist.selectedIndex.text;
  console.log(result); //TODO:FIX THIS
}

startGame();
var y=0;

document.addEventListener('keydown', function(event) {
    if (event.key == "ArrowUp"){
        y=-5
    }
    else if (event.key == "ArrowDown"){
        y=5
    }
});

document.addEventListener('keyup', function(event) {
    if (event.key == "ArrowUp"){
        y=0
    }
    else if (event.key == "ArrowDown"){
        y=0
    }
});


var myGameArea = {
    canvas : document.getElementById("myCanvas"),
    start : function() {
      this.canvas.width;
      this.canvas.height;
      this.context = this.canvas.getContext("2d");
      document.body.insertBefore(this.canvas, document.body.childNodes[0]);
      this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }


var leftPlayer;

function startGame() {
  myGameArea.start();
  leftPlayer = new component(30, 100, "black", 300, 320);
}

function component(width, height, color, x, y, rot) {
  this.width = width;
  this.rot = rot;
  this.height = height;
  this.x = x;
  this.y = y;
  this.update = function() {
    ctx = myGameArea.context;
    ctx.save();
    ctx.translate(this.x, this.y);        
    ctx.rotate(this.angle);
    ctx.fillStyle = color;
    ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);        
    ctx.restore();    
}

}


function updateGameArea(){
    myGameArea.clear();
    leftPlayer.y += y;
    leftPlayer.update();
}

startGame();
document.addEventListener("DOMContentLoaded", function() {
  startGame();
  window.addEventListener(
    "keydown",
    function(e) {
      // space and arrow keys
      if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
      }
    },
    false
  );
});

var GameObject = {
  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
};

startGame = () => {
  GameObject.canvas = document.getElementById("myCanvas");
  GameObject.context = GameObject.canvas.getContext("2d");
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  setInterval(draw, 10);
};

var x = 50;
var y = 50;
var foodX = 20;
var foodY = 20;
var dx = 0.5;
var dy = 0;
var ballRadius = 1;
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

drawBall = () => {
  let ctx = GameObject.context;
  let color = "#ffffff";
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();
};

draw = () => {
  let ctx = GameObject.context;
  let canvas = GameObject.canvas;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawFood();

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    dy = -dy;
  }

  if (rightPressed) {
    dy = 0;
    dx = 0.5;
  } else if (leftPressed) {
    dy = 0;
    dx = -0.5;
  } else if (upPressed) {
    dx = 0;
    dy = -0.5;
  } else if (downPressed) {
    dx = 0;
    dy = 0.5;
  }

  x += dx;
  y += dy;
};

drawFood = () => {
  let ctx = GameObject.context;
  let color = "#ffffff";
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(foodX, foodY, ballRadius, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();
};

keyDownHandler = e => {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  } else if (e.key == "Up" || e.key == "ArrowUp") {
    upPressed = true;
  } else if (e.key == "Down" || e.key == "ArrowDown") {
    downPressed = true;
  }
};

keyUpHandler = e => {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  } else if (e.key == "Up" || e.key == "ArrowUp") {
    upPressed = false;
  } else if (e.key == "Down" || e.key == "ArrowDown") {
    downPressed = false;
  }
};

class Snake {
  constructor(args) {
    this.length = 1;
    this.x = args.x;
    this.y = args.y;
    this.speed = 0;
  }

  update = () => {
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };

  newPos = () => {
    this.x += this.speed;
  };
}

class Food {
  constructor(args) {
    this.x = args.x;
    this.y = args.y;
  }
}

// updateGameArea = () => {
//   var x, height, gap, minHeight, maxHeight, minGap, maxGap;
//   for (i = 0; i < myObstacles.length; i += 1) {
//     if (myGamePiece.crashWith(myObstacles[i])) {
//       return;
//     }
//   }
//   myGameArea.clear();
//   myGameArea.frameNo += 1;
//   if (myGameArea.frameNo == 1 || everyinterval(150)) {
//     x = myGameArea.canvas.width;
//     minHeight = 20;
//     maxHeight = 200;
//     height = Math.floor(
//       Math.random() * (maxHeight - minHeight + 1) + minHeight
//     );
//     minGap = 50;
//     maxGap = 200;
//     gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
//     myObstacles.push(new Component(10, height, "green", x, 0));
//     myObstacles.push(
//       new Component(10, x - height - gap, "green", x, height + gap)
//     );
//   }
//   for (i = 0; i < myObstacles.length; i += 1) {
//     myObstacles[i].x += -1;
//     myObstacles[i].update();
//   }
//   myScore.text = "SCORE: " + myGameArea.frameNo;
//   myScore.update();
//   myGamePiece.newPos();
//   myGamePiece.update();
// };

// everyinterval = n => {
//   if ((myGameArea.frameNo / n) % 1 == 0) {
//     return true;
//   }
//   return false;
// };

// accelerate = n => {
//   myGamePiece.gravity = n;
// };

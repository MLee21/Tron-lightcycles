var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
context.fillStyle = "black";
context.fillRect(0,0,512,480);
document.body.appendChild(canvas);

function Cycle(x, y, width, height, color) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;
}

Cycle.prototype.draw = function () {
  context.fillStyle = this.color;
  context.fillRect(this.x, this.y, this.width, this.height);
  return this;
}

Cycle.prototype.move = function (direction) {
  if (direction === "down") {
    this.y += 3;
  } else if (direction === "up") {
    this.y -= 3;
  } else if (direction === "left") {
    this.x -= 3;
  } else if (direction === "right") {
    this.x += 3;
  };
}

var keysDown = {};

var playerOneControls = function () {
  addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
  }, false);

  addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
  }, false);

  if (38 in keysDown) {
    cycles[0].move("up");
  }

  if (40 in keysDown) {
    cycles[0].move("down");
  }

  if (37 in keysDown) {
    cycles[0].move("left");
  }

  if (39 in keysDown) {
    cycles[0].move("right");
  }
};

var playerTwoControls = function () {
  addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
  }, false);

  addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
  }, false);

  if (87 in keysDown) {
    cycles[1].move("up");
  }

  if (83 in keysDown) {
    cycles[1].move("down");
  }

  if (65 in keysDown) {
    cycles[1].move("left");
  }

  if (68 in keysDown) {
    cycles[1].move("right");
  }
};


var cycles = [];

cycles.push(new Cycle(50, 220, 10, 10, "yellow"));
cycles.push(new Cycle(452, 220, 10, 10, "green"));

requestAnimationFrame(function gameLoop() {
  playerOneControls();
  playerTwoControls();
  cycles.forEach(function (cycle) {
    cycle.draw();
  });
  requestAnimationFrame(gameLoop);
});


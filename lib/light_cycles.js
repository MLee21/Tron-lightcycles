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

var cycles = [];

cycles.push(new Cycle(50, 220, 20, 20, "yellow"));
cycles.push(new Cycle(452, 220, 20, 20, "green"));

requestAnimationFrame(function gameLoop() {
  cycles.forEach(function (cycle) {
    cycle.draw().move("up");
  });
  requestAnimationFrame(gameLoop);
});


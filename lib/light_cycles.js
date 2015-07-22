var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
context.fillStyle = "black";
context.fillRect(0,0,512,480);
document.body.appendChild(canvas);

function Cycle(x, y, width, height, color, speed) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;
  this.speed = speed;
  this.crashed = false;
}

Cycle.prototype.draw = function () {
  context.fillStyle = this.color;
  context.fillRect(this.x, this.y, this.width, this.height);
  return this;
}

function getNextPixels (x, y, direction) {
  directions = {
    "vertical": context.getImageData(x + 10, y, 1, 1).data,
    "horizontal": context.getImageData(x, y + 10, 1, 1).data
  }
  //this.crashed = detectCollision[corner1] || detectCollision[corner2]
  return [context.getImageData(x, y, 1, 1).data, directions[direction]]
};


Cycle.prototype.move = function (direction) {
  directions = {
    "up": function () {
      var nextSquare = getNextPixels(this.x, this.y - 1, "vertical");
      this.crashed = detectCollision(nextSquare);
      this.y -= this.speed;
    },
    "down": function () {
      var nextSquare = getNextPixels(this.x, this.y + 10, "vertical");
      this.crashed = detectCollision(nextSquare);
      this.y += this.speed;
    },
    "left": function () {
      var nextSquare = getNextPixels(this.x - 1, this.y, "horizontal");
      this.crashed = detectCollision(nextSquare);
      this.x -= this.speed;
    },
    "right": function () {
      var nextSquare = getNextPixels(this.x + 10, this.y, "horizontal");
      this.crashed = detectCollision(nextSquare);
      this.x += this.speed;
    }
  }
  //directions[direction]
  if (direction === "down") {
    var nextSquare = context.getImageData(this.x, this.y + 10, 1, 1).data;
    if(detectCollision(nextSquare)){
      this.crashed = true;
    };
    this.y += 3;
    console.log(getNextPixels(this.x, this.y + 10, "vertical")[1]);
  } else if (direction === "up") {
    var nextSquare = context.getImageData(this.x, this.y - 1, 1, 1).data;
    if(detectCollision(nextSquare)){
      this.crashed = true;
    };
    this.y -= 3;
  } else if (direction === "left") {
    var nextSquare = context.getImageData(this.x - 1, this.y, 1, 1).data;
    if(detectCollision(nextSquare)){
      this.crashed = true;
    };
    this.x -= 3;
  } else if (direction === "right") {
    var nextSquare = context.getImageData(this.x + 10, this.y, 1, 1).data;
    if(detectCollision(nextSquare)){
      this.crashed = true;
    };
    this.x += 3;
    console.log(getNextPixels(this.x + 10, this.y, "horizontal")[1]);
  };
}

function detectCollision (nextSquare) {
  if (nextSquare[0] != 0 || nextSquare[1] != 0 || nextSquare[2] != 0) {
    console.log("COLLISION!!!");
    return true;
  } else {
    return false;
  }
};

var keysDownOne = {};
var keysDownTwo = {};

var playerOneControls = function () {
  addEventListener("keydown", function (e) {
    if (e.keyCode === 38 || e.keyCode === 40 || e.keyCode === 37 || e.keyCode === 39 ) {
      keysDownOne = {};
      keysDownOne[e.keyCode] = true;
    };
  }, false);

  if(cycles[0].crashed === false) {

    if (38 in keysDownOne) {
      cycles[0].move("up");
    }

    if (40 in keysDownOne) {
      cycles[0].move("down");
    }

    if (37 in keysDownOne) {
      cycles[0].move("left");
    }

    if (39 in keysDownOne) {
      cycles[0].move("right");
    }
  };
};

var playerTwoControls = function () {
  addEventListener("keydown", function (e) {
    if (e.keyCode === 87 || e.keyCode === 83 || e.keyCode === 65 || e.keyCode === 68 ) {
    keysDownTwo = {};
    keysDownTwo[e.keyCode] = true;
    };
  }, false);

  if (cycles[1].crashed === false) {

    if (87 in keysDownTwo) {
      cycles[1].move("up");
    }

    if (83 in keysDownTwo) {
      cycles[1].move("down");
    }

    if (65 in keysDownTwo) {
      cycles[1].move("left");
    }

    if (68 in keysDownTwo) {
      cycles[1].move("right");
    }
  };
};


var cycles = [];

//speed susceptible to change
cycles.push(new Cycle(50, 220, 10, 10, "yellow", 3));
cycles.push(new Cycle(452, 220, 10, 10, "green", 3));

requestAnimationFrame(function gameLoop() {
  playerOneControls();
  playerTwoControls();
  cycles.forEach(function (cycle) {
    cycle.draw();
  });
  requestAnimationFrame(gameLoop);
});


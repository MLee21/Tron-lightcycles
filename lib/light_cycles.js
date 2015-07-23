var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
context.fillStyle = "black";
context.fillRect(0,0,512,480);
document.body.appendChild(canvas);

function Cycle(x, y, color, speed, player) {
  this.x = x;
  this.y = y;
  this.player = player;
  this.width = 10;
  this.height = 10;
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
  return [context.getImageData(x, y, 1, 1).data, directions[direction]]
};

function detectCollision (nextSquare) {
  return (nextSquare[0] !== 0 || nextSquare[1] !== 0 || nextSquare[2] !== 0)
};


function detectEdge (cycle, player) {
  if (cycle.x < 10) {
    cycle.automove("left", player);
    console.log("offgridleft");
  };
  if (cycle.y < 10) {
    cycle.automove("up", player);
    console.log("offgridup");
  };
  if (cycle.x > canvas.width - 10) {
    cycle.automove("right");
    console.log("offgridright");
  };
  if (cycle.y > canvas.height - 10) {
    cycle.automove("down");
    console.log("offgriddown");
  };
};


Cycle.prototype.automove = function (direction, player) {
};

Cycle.prototype.move = function (direction) {
  var _this = this;
  directions = {
    "up" : function () {
      var nextSquare = getNextPixels(_this.x, _this.y - 1, "vertical");
      _this.stopped = detectCollision(nextSquare[0]) || detectCollision(nextSquare[1]);
      _this.crashed = detectCollision(nextSquare[0]) || detectCollision(nextSquare[1]);
      _this.y -= _this.speed;
    },
    "down" : function () {
      var nextSquare = getNextPixels(_this.x, _this.y + 10, "vertical");
      _this.stopped = detectCollision(nextSquare[0]) || detectCollision(nextSquare[1]);
      _this.crashed = detectCollision(nextSquare[0]) || detectCollision(nextSquare[1]);
      _this.y += _this.speed;
    },
    "left" : function () {
      var nextSquare = getNextPixels(_this.x - 1, _this.y, "horizontal");
      _this.stopped = detectCollision(nextSquare[0]) || detectCollision(nextSquare[1]);
      _this.crashed = detectCollision(nextSquare[0]) || detectCollision(nextSquare[1]);
      _this.x -= _this.speed;
    },
    "right" : function () {
      var nextSquare = getNextPixels(_this.x + 10, _this.y, "horizontal");
      _this.stopped = detectCollision(nextSquare[0]) || detectCollision(nextSquare[1]);
      _this.crashed = detectCollision(nextSquare[0]) || detectCollision(nextSquare[1]);
      _this.x += _this.speed;
    }
  };
  directions[direction]();
};


var keysDownOne = {};
var keysDownTwo = {};

var playerOneControls = function () {
  detectEdge(cycles[0], 1);

  addEventListener("keydown", function (e) {
    if (e.keyCode === 38 || e.keyCode === 40 || e.keyCode === 37 || e.keyCode === 39 ) {
      keysDownOne = {};
      keysDownOne[e.keyCode] = true;
    };
  }, false);


  if (cycles[0].crashed === false) {

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
  } else {
    console.log("autopilot");
    keysDownOne = {};
  };
};

var playerTwoControls = function () {
  addEventListener("keydown", function (e) {
    if (e.keyCode === 87 || e.keyCode === 83 || e.keyCode === 65 || e.keyCode === 68 ) {
    keysDownTwo = {};
    keysDownTwo[e.keyCode] = true;
    };
  }, false);

  if (cycles[1].autopilot === false) {

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
cycles.push(new Cycle(50, 220, "yellow", 3, 1));
cycles.push(new Cycle(452, 220, "green", 3, 2));

requestAnimationFrame(function gameLoop() {
  playerOneControls();
  playerTwoControls();
  cycles.forEach(function (cycle) {
    cycle.draw();
  });
  requestAnimationFrame(gameLoop);
});


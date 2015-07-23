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
  return [context.getImageData(x, y, 1, 1).data, directions[direction]]
};

function detectCollision (nextSquare) {
  if (nextSquare[0] !== 0 || nextSquare[1] !== 0 || nextSquare[2] !== 0) {
    console.log("COLLISION!!!");
    return true;
  } else {
    return false;
  }
};

Cycle.prototype.move = function (direction) {
  var _this = this;
  directions = {
    "up": function () {
      var nextSquare = getNextPixels(_this.x, _this.y - 1, "vertical");
      console.log(nextSquare);
      _this.crashed = detectCollision(nextSquare[0]) || detectCollision(nextSquare[1]);
      _this.y -= _this.speed;
    },
    "down": function () {
      var nextSquare = getNextPixels(_this.x, _this.y + 10, "vertical");
      _this.crashed = detectCollision(nextSquare[0]) || detectCollision(nextSquare[1]);
      _this.y += _this.speed;
    },
    "left": function () {
      var nextSquare = getNextPixels(_this.x - 1, _this.y, "horizontal");
      _this.crashed = detectCollision(nextSquare[0]) || detectCollision(nextSquare[1]);
      _this.crashed = detectCollision(nextSquare);
      _this.x -= _this.speed;
    },
    "right": function () {
      var nextSquare = getNextPixels(_this.x + 10, _this.y, "horizontal");
      _this.crashed = detectCollision(nextSquare[0]) || detectCollision(nextSquare[1]);
      _this.x += _this.speed;
    }
  };
  directions[direction]();
};



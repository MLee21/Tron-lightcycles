function gameMenus (cycle1, cycle2) {
  game = {}
  addEventListener("keydown", function (e) {
    if (e.keyCode === 13){
    game[start] = true;
    }
  });
  if (cycle1.crashed) {
    game[end] = true;
    game[winner] = cycle2;
  };
  if (cycle2.crashed) {
    game[end] = true;
    game[winner] = cyle1;
  }
  return game;
}


//module.exports = gameMenus;

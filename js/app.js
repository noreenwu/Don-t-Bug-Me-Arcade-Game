// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug-trimmed.png';
    this.x = 20;
    this.y = 80;
    this.rate = 2;
    this.identifier = 0;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    (this.x > 400) ? this.x = -10 : this.x += this.rate;  // TODO: * dt ?
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // this.sprite = 'images/char-cat-girl.png';
    this.sprite = 'images/char-boy-trimmed.png';
    this.x = 200;
    this.y = 400;
    // this.w = Resources.get('images/char-boy.png').naturalWidth;
    // this.h = Resources.get('images/char-boy.png').naturalHeight;
}

Player.prototype.update = function(dt) {

};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

function move(moveData, stayOnBoard) {
  // moveData will be an array of needed values (current position,
  //    amount to move and what limit is being observed)
  // stayOnBoard() is a function which keeps the player on the board:
  //    that is lower than the upper limits of the screen if
  //    the player is moving to the right or down and
  //    higher than the lowest limits if the player is moving
  //    left or up (towards the 0,0 coordinate)

  const [coord, change, lim] = moveData;
  console.log("move");

  return stayOnBoard(moveData);
}

// function notTooLow() {
//   console.log("notTooLow");
//   return (30);
// }

function notTooLow(moveData) {

    const [coord, change, lim] = moveData;
    console.log("notTooLow " + coord);

    let proposedChange = coord + change;
    return (proposedChange >= lim ? proposedChange : coord);
       // only allow the change if the result is not below the lower limit of screen
}

function notTooHigh(moveData) {
  const [coord, change, lim] = moveData;

  console.log("notTooHigh " + coord);
  let proposedChange = coord + change;

  return (proposedChange <= lim ? proposedChange : coord);
  // only allow the change to take effect if the limit is not exceeded
}


Player.prototype.handleInput = function(k) {
  if (k == 'up') {
    // this.y -= 10;
    this.y = move([this.y, -20, 0], notTooLow);   // TODO: give 0 a name

  } else if (k == 'down') {
    // this.y += 10;
    this.y = move([this.y, +20, 450], notTooHigh);
  } else if (k == 'left') {
    // this.x -= 10;
    this.x = move([this.x, -20, 0], notTooLow);
  } else if (k == 'right') {
    // this.x += 10;
    this.x = move([this.x, +20, 415], notTooHigh);
  }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let enemy1 = new Enemy();
let enemy2 = new Enemy();
let enemy3 = new Enemy();
enemy2.x += 80;
enemy2.y += 60;
enemy2.rate = 0;
enemy2.identifier = 1;

enemy3.x = 0;
enemy3.y = 100;
enemy3.rate = 4;
enemy3.identifier = 2;

// let allEnemies = [enemy1, enemy2, enemy3];
enemy1.rate = 0;
let allEnemies = [enemy1];

let player = new Player();

function closeModal() {
  console.log("closeModal");
  document.getElementById('congrats-modal').style.display = "none";
  document.getElementsByClassName('modal')[0].style.display = "none";
}


function resetPlayerPosition() {
  player.reset();
}

function newGame() {
  console.log("new game...");
  closeModal();
  // reset();                // move player back to starting place
  resetPlayerPosition();
  listenForKeyInputs();   // listen for key inputs
}



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

function handleKey(e) {

  var allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
}

function listenForKeyInputs() {
  document.addEventListener('keyup', handleKey);
}

function stopListeningForKeyInputs() {

  document.removeEventListener('keyup', handleKey);
}

function showWinner() {
  document.getElementById('congrats-modal').style.display = "block";
  document.getElementsByClassName('modal')[0].style.display = "block";

  stopListeningForKeyInputs();
}

listenForKeyInputs();

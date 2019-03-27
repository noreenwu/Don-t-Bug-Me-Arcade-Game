// Enemies our player must avoid
var Enemy = function(x, y, rate) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug-trimmed.png';
    this.x = x;
    this.y = y;
    this.rate = rate;
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
    this.sprite = 'images/char-boy-trimmed-red-background.png';
    this.x = 200;
    this.y = 500;
    // this.w = Resources.get('images/char-boy.png').naturalWidth;
    // this.h = Resources.get('images/char-boy.png').naturalHeight;
}

Player.prototype.update = function(dt) {

};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 500;
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
  // console.log("move");

  return stayOnBoard(moveData);
}

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
    this.y = move([this.y, -18, 0], notTooLow);    // TODO: give 0 a name

  } else if (k == 'down') {
    // this.y += 10;
    this.y = move([this.y, +18, 500], notTooHigh); // high in coordinate value but bottom of screen
  } else if (k == 'left') {
    // this.x -= 10;
    this.x = move([this.x, -18, 0], notTooLow);
  } else if (k == 'right') {
    // this.x += 10;
    this.x = move([this.x, +18, 415], notTooHigh);
  }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [new Enemy(0, 120, .75), new Enemy(0, 200, 1.25),
                  new Enemy(0, 270, 1.5), new Enemy(10, 380, 2)];

let player = new Player();
let playing = true;

function closeModal() {
  console.log("closeModal");
  document.getElementById('congrats-modal').style.display = "none";
  document.getElementsByClassName('thankyou-modal')[0].style.display = "none";
  document.getElementsByClassName('sorry-modal')[0].style.display = "none";
  document.getElementsByClassName('modal')[0].style.display = "none";
}

function showThanksComeAgain() {
  document.getElementsByClassName('thankyou-modal')[0].style.display = 'block';
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
  playing = true;
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

function tryAgain() {
  document.getElementsByClassName('sorry-modal')[0].style.display = "block";
  // document.getElementsByClassName('modal')[0].style.display = "block";
  stopListeningForKeyInputs();
  playing = false;
}

function showWinner() {
  document.getElementById('congrats-modal').style.display = "block";
  document.getElementsByClassName('modal')[0].style.display = "block";

  stopListeningForKeyInputs();
  playing = false;

}

listenForKeyInputs();

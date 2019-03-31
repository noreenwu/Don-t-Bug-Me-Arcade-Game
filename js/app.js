// Enemies our player must avoid (unless it's a gem, an "antiEnemy")
var Enemy = function(x, y, rate, sprite = 'images/enemy-bug-trimmed.png') {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = sprite;
    this.x = x;
    this.y = y;
    this.rate = rate;
    // (sprite != 'images/enemy-bug-trimmed.png') ? this.antiEnemy = true : this.antiEnemy = false;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    let increment = dt * this.rate;
    (this.x > 400) ? this.x = -10 : this.x += increment;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.harmlessSprite = function() {
  this.sprite = 'images/ghost-bug.png';
  setTimeout(this.enemyStatus, 5000, this);
}

// Enemy.prototype.flashStatus = function(obj) {
//     if (obj.sprite == 'images/enemy-bug-trimmed.png') {
//       obj.sprite = 'images/ghost-bug.png';
//     }
//     else {
//       obj.sprite = 'images/enemy-bug-trimmed.png';
//     }
// }

Enemy.prototype.enemyStatus = function(obj) {
    obj.sprite = 'images/enemy-bug-trimmed.png';
}

// Enemy.prototype.harmlessStatus = function(obj) {
//     obj.sprite = 'images/ghost-bug.png';
// }

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // this.sprite = 'images/char-cat-girl.png';
    this.stdsprite = 'images/char-boy-trimmed-red-background.png';
    this.supersprite = 'images/char-cat-girl-trimmed.png';
    this.sprite = this.stdsprite;
    this.x = 200;
    this.y = 500;
    this.health = false;
    // this.w = Resources.get('images/char-boy.png').naturalWidth;
    // this.h = Resources.get('images/char-boy.png').naturalHeight;
}

Player.prototype.update = function(dt) {

};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 500;
};

Player.prototype.gotHealth = function() {
    this.health = true;
    this.sprite = this.supersprite;
    setTimeout(this.healthFades, 5000, this);
}

Player.prototype.isExtraHealthy = function() {
    return this.health;
}

Player.prototype.healthFades = function(obj) {
    obj.health = false;
    obj.sprite = obj.stdsprite;
}

// moveData will be an array of needed values (current position,
//    amount to move and what limit is being observed)
// stayOnBoard() is a function which keeps the player on the board:
//    that is lower than the upper limits of the screen if
//    the player is moving to the right or down and
//    higher than the lowest limits if the player is moving
//    left or up (towards the 0,0 coordinate)
Player.prototype.move = function(moveData, stayOnBoard) {
  const [coord, change, lim] = moveData;

  return stayOnBoard(moveData);
}

Player.prototype.notTooLow = function(moveData) {
  const [coord, change, lim] = moveData;

  let proposedChange = coord + change;
  return (proposedChange >= lim ? proposedChange : coord);
     // only allow the change if the result is not below the lower limit of screen
}

Player.prototype.notTooHigh = function(moveData) {
  const [coord, change, lim] = moveData;

  let proposedChange = coord + change;
  return (proposedChange <= lim ? proposedChange : coord);
  // only allow the change to take effect if the limit is not exceeded
}

Player.prototype.handleInput = function(k) {
  if (k == 'up') {
    this.y = this.move([this.y, -18, 0], this.notTooLow);    // TODO: give 0 a name

  } else if (k == 'down') {
    this.y = this.move([this.y, +18, 500], this.notTooHigh); // high in coordinate value but bottom of screen
  } else if (k == 'left') {
    this.x = this.move([this.x, -18, 0], this.notTooLow);
  } else if (k == 'right') {
    this.x = this.move([this.x, +18, 415], this.notTooHigh);
  }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


let Collectible = function(x = 300, y = 200) {
  this.sprite = 'images/blue-gem-trimmed.png';
  this.x = 300;
  this.y = 200;
  this.displayMe = false;
  this.collected = false;    // whether gem was collected at current location
  this.setup();
}

Collectible.prototype.setup = function() {
    setInterval(this.changeDisplay, 2800, this);
}

Collectible.prototype.changeDisplay = function(obj) {
  obj.displayMe = !obj.displayMe;
  obj.x = obj.getRandomInt(200, 450);
  console.log("random int obj.x " + obj.x);
  obj.y = obj.getRandomInt(200, 450);
}

Collectible.prototype.getRandomInt = function(min, max) {
    return Math.floor(min + Math.random()*(max + 1 - min));
}

Collectible.prototype.render = function() {
   if ( (this.displayMe == true) && playing ) {
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
   }
}

Collectible.prototype.getRect = function() {
  const rect = {
      x: this.x,
      y: this.y,
      width: Resources.get(this.sprite).naturalWidth,
      height: Resources.get(this.sprite).naturalHeight };

   return(rect);
}
Collectible.prototype.setCollected = function() {
  this.collected = true;
}

Collectible.prototype.wasCollected = function() {
  return this.collected;
}

let Location = function(x, y) {
  this.x = 0;
  this.y = 0;
}

var Health = function() {
  this.sprite = 'images/heart-trimmed.png';
  // this.locations = [ new Location(140, 350), new Location(170, 200)];
  this.locationsX = [ 140, 350, 200, 300, 100 ];
  this.locationsY = [ 350, 300, 100, 200, 350 ];
  this.locationIdx = 0;
  this.x = 140;
  this.y = 350;
  this.displayMe = true;
  this.collected = false;
  this.setup();
}

Health.prototype.setup = function() {
    console.log("Health setup");
    setInterval(this.changeDisplay, 3000, this);
}

Health.prototype.stop = function() {
    console.log("Health stop");
    this.displayMe = false;
    clearInterval(this.changeDisplay);
}

Health.prototype.changeDisplay = function(obj) {
    console.log("locationIdx " + obj.locationIdx);
    obj.displayMe = ! obj.displayMe;
    obj.x = obj.locationsX[obj.locationIdx];
    obj.y = obj.locationsY[obj.locationIdx];
    // rotate the heart location based on the arrays of coordinates
    obj.locationIdx = (obj.locationIdx + 1) % obj.locationsX.length;
}

Health.prototype.render = function() {
   if ( (this.displayMe == true) && !player.isExtraHealthy() && playing ) {
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
   }
}

Health.prototype.setCollected = function() {
   this.collected = true;
}

Health.prototype.wasCollected = function() {
   return this.collected;
}

// var GemBoard = function() {
//    this.sprite = 'images/blue-gem-trimmed.png';
//    this.x = 0;
//    this.y = 500;
// }
//
// GemBoard.prototype.render = function() {
//    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// }
//
// GemBoard.prototype.rewarded = function() {
//    this.x += 100;
// }

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [new Enemy(0, 120, 115), new Enemy(0, 200, 90),
                  new Enemy(0, 270, 120), new Enemy(10, 380, 140)];


let player = new Player();
// let gems = new GemBoard();
let playing = true;
let heartHealth = new Health();
// let gemCollectible = new Collectible();
let collectibleGem1 = new Collectible(350, 100);

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
  heartHealth.stop();
  playing = false;
}

function showWinner() {
  document.getElementById('congrats-modal').style.display = "block";
  document.getElementsByClassName('modal')[0].style.display = "block";

  stopListeningForKeyInputs();
  playing = false;

}

listenForKeyInputs();

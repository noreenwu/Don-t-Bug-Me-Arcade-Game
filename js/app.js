



// Enemies our player must avoid
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

Enemy.prototype.enemyStatus = function(obj) {
    obj.sprite = 'images/enemy-bug-trimmed.png';
}

Enemy.prototype.getRect = function(rect) {
    rect.x = this.x;
    rect.y = this.y;
    rect.width = Resources.get(this.sprite).naturalWidth;
    rect.height = Resources.get(this.sprite).naturalHeight;

    return rect;
}



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
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
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.getRect = function(rect) {
    rect.x = this.x;
    rect.y = this.y,
    rect.width = Resources.get(this.sprite).naturalWidth;
    rect.height = Resources.get(this.sprite).naturalHeight;

    return rect;
}

class Rectangle {
  constructor(x = 0, y = 0, width = 101, height = 106) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
  }
}

/*
*/
class Collectible {
  constructor(x = 300, y = 200, sprite = 'images/blue-gem-trimmed.png', displayInt = 3000,
              rangeX1 = 30, rangeX2 = 400) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
    this.rangeX1 = rangeX1;
    this.rangeX2 = rangeX2;
    this.displayMe = true;
    this.collected = false;
    this.displayInt = displayInt;
    this.setup();
  }

  setup() {
    setInterval(this.changeDisplay, this.displayInt, this);
  }

  reset() {
    this.displayMe = true;
    this.collected = false;
  }


  stop() {
      this.displayMe = false;
      clearInterval(this.changeDisplay);
  }

  getRandomInt(min, max) {
      return Math.floor(min + Math.random()*(max + 1 - min));
  }

  changeDisplay(obj) {
    obj.displayMe = !obj.displayMe;
    obj.moveMe(obj);
    if (obj.displayMe) {
       obj.collected = false;
    }
  }

  render() {
     // if ( (this.displayMe == true) && (this.collected == false) && playing ) {
     if ( (this.displayMe == true) && playing ) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
     }
  }

  getRect(rect) {
    rect = {
        x: this.x,
        y: this.y,
        width: Resources.get(this.sprite).naturalWidth,
        height: Resources.get(this.sprite).naturalHeight };

        // console.log("getRect " + this.x, this.y, rect.width, rect.height);
     return(rect);
  }

  moveMe(obj) {
    obj.x = obj.getRandomInt(obj.rangeX1, obj.rangeX2);
    obj.y = obj.getRandomInt(100, 400);
    obj.displayMe = true;    // as soon as you move, you should be true
  }

  setCollected() {
    this.collected = true;
    // this.moveMe(this);

    this.displayMe = false;  // when to reset this to true?
  }

  wasCollected() {
    return this.collected;
  }

  visible() {
    return this.displayMe;
  }
}

/*
*/

class MessageField {
    constructor() {
    }

    messageUser(msg) {
      let f = document.getElementById("message");
      f.textContent = msg;
    }
}



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [new Enemy(0, 120, 115), new Enemy(0, 200, 90),
                  new Enemy(0, 270, 120), new Enemy(10, 380, 140)];


let player = new Player();
let playing = true;
let heartHealth = new Collectible(140, 350, 'images/heart-trimmed.png', 3000)
let collectibleGem1 = new Collectible(350, 100, 'images/blue-gem-trimmed.png', 2700);

function closeModal() {
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
  closeModal();
  resetPlayerPosition();     // move player back to starting place
  collectibleGem1.reset();
  listenForKeyInputs();      // listen for key inputs: the user pressing arrow keys
  playing = true;
  m.messageUser("Use arrow keys to move. Good luck!");
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

let gemRect = { x: 100, y: 100, width: 30, height: 30 };
let hhRect  = { x: 100, y: 100, width: 30, height: 30 };
let enRect = { x: 100, y: 100, width: 30, height: 30 };
let pRect = { x: 100, y: 100, width: 30, height: 30 };

listenForKeyInputs();
let m = new MessageField();
let f = document.getElementById("message");
m.messageUser("Use arrow keys to move. Have fun!");

//class from which hero and enemies will both inherit overlapping characteristics
class Characters {
  constructor() {
    this.sprite = 'images/';
    this.x = 2;
    this.y = 5;
  }

//sets boudaries for the canvas
  update(dt) {
    this.outOfBoundaryX = this.x > 5;
    this.outOfBoundaryY = this.y < 1;
  }
//offset because the images are all 101 x 83 pixels
//offset allows player to move block by block
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
  }
  //check collisions function that takes in a player or Enemy
  //if on the same x axis, checks to see if they're on the same y axis
  //0.5 is the sensitivity that checks for collisions
  checkCollisions(playerOrEnemy) {
    if(this.y === playerOrEnemy.y) {
      if(this.x >= playerOrEnemy.x - 0.4 && this.x <= playerOrEnemy.x + 0.4) {
        return true;
      }
    } else {
        return false;
    }
  }
}

//Hero class extends the Characters class from above
//Uses super keyword to get this.sprite, this.x & this.y from the Characteristics class we're inheriting from,
//refers to the constructor of the inherited class
class Player extends Characters {
  constructor() {
    super();
    this.sprite += 'char-pink-girl.png';
  }

//event listener at bottom feeds into this handleInput switch statement
//checks to see if player is in bounds and then moves accordingly
  handleInput(input) {
    switch (input) {
      case 'left':
        this.x = this.x>0 ? this.x-1 : this.x;
        break;
      case 'right':
        this.x = this.x<4 ? this.x+1 : this.x;
        break;
      case 'up':
        this.y = this.y>0 ? this.y-1 : this.y;
        break;
      case 'down':
        this.y = this.y<5 ? this.y+1 : this.y;
        break;
    }
  }
}

//Enemy class extends the Characters class from above
//Uses super keyword to get this.sprite, this.x & this.y from the Characteristics class we're inheriting from,
//passes in parameters to get different starting points on the x & y axes and a speed parameter
class Enemy extends Characters {
  constructor(x,y,speed) {
    super();
    this.sprite += 'enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
  }
  //moves enemy back to -1 when it goes out of bounds
  update(dt){
    super.update();
    if(this.outOfBoundaryX){
      this.x = -1;
    } else {
      this.x += this.speed * dt;
    }
  }
}

//Draw the enemy on the screen, required method for game
//offset because the images are all 101 x 83 pixels
//offset allows player to move block by block
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
};

//creats an instance of the Hero
const player = new Player();

//creates instances of the Enemy bug
//passes in different starting coordinates and speeds
const allEnemies = [];
const bug1 = new Enemy(1,2,2);
allEnemies.push(bug1);

const bug2 = new Enemy(4,1,2.5);
allEnemies.push(bug2);

const bug3 = new Enemy(0,3,1);
allEnemies.push(bug3);

const bug4 = new Enemy(1,2,.5);
allEnemies.push(bug4);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

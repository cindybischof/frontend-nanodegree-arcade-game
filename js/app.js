//class from which hero and enemies will both inherit overlapping characteristics
class Entity {
  constructor() {
    this.sprite = 'images/';
    this.x = 2;
    this.y = 5;
  }
//offset because the images are all 101 x 83 pixels
    render() {
      ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
  }
}

//Hero class extends the Characters class from above
//Uses super keyword to get this.sprite, this.x & this.y from the Characteristics class we're inheriting from,
//refers to the constructor of the inherited class
class Player extends Entity {
  constructor() {
    super();
    this.sprite += 'char-pink-girl.png';
  }
}

//creats an instance of the Hero
const player = new Player();

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

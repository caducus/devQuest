class FirstLevel extends Phaser.Scene {
  constructor() {
    super({
      key: "Level01"
    });
  this.player;
  this.gameOver = false;
  this.score = 0;
  this.scoreText;
  this.gameOverText;
  }

  create() {
    // json level map
    const map = this.make.tilemap({key: "level1"});
    // tilesets to create the level
    const tiles = map.addTilesetImage("devQuest-tileset", "tiles");
    const stars = map.addTilesetImage("star", "stars")
    // ground layer of the world
    const obstacles = map.createStaticLayer("world", tiles, 0, 0);
    // level of stars to collect
    const starLayer = map.createDynamicLayer("stars", stars, 0, 0);

    // player will be able to collide with world
    obstacles.setCollisionByExclusion([-1]);

    // boundaries of the game are the total width and height of the json map
    this.physics.world.bounds.width = obstacles.widthInPixels;
    this.physics.world.bounds.height = obstacles.heightInPixels;

    // add the player to the level, set physics
    this.player = this.physics.add.sprite(50, 300, "player-idle", 0);

    // set the player to bounce slightly after each jump
    this.player.setBounce(0.3);

    // player will not be able to go out of bounds
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, obstacles);

    // create the score text
    this.scoreText = this.add.text(390, 25, "Stars: 0", {
      fontSize: "16px",
      fill: "#000000"
    });

    // fix the text to a static postion on the screen
    this.scoreText.setScrollFactor(0);

    // function called when a player touches a star
    function collectStar(sprite, tile) {
      // removes the star from the map
      starLayer.removeTileAt(tile.x, tile.y);
      // add one star to the star count
      this.score++;
      // update the score on the screen
      this.scoreText.setText("Stars:" + this.score);
      return false;
    }

    // when the player touches a star, call collectStar
    starLayer.setTileIndexCallback(21, collectStar, this);
    this.physics.add.overlap(this.player, starLayer);

    // defining keyboard functions
    this.cursors = this.input.keyboard.createCursorKeys();

    // camera to follow player
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);

    // set the background color of the level
    this.cameras.main.setBackgroundColor("#89D1E8")

    // player walk animation
    this.anims.create({
      key: "run",
      frameRate: 6,
      repeat: -1,
      frames: this.anims.generateFrameNumbers("player-run", {
        frames: [0, 1, 2, 3, 4, 5]
      })
    });

    // player idle animation
    this.anims.create({
      key: "idle",
      frameRate: 4,
      repeat: -1,
      frames: this.anims.generateFrameNumbers("player-idle", {
        frames: [0, 1, 2, 3]
      })
    });

    // player death animation
    this.anims.create({
      key: "death",
      frameRate: 8,
      repeat: 1,
      frames: this.anims.generateFrameNumbers("player-death", {
        frames: [0, 1, 2, 3, 4, 5, 6, 7]
      })
    });
  }

  update (time, delta) {

    // when left arrow is down, player moves left
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-100);
      this.player.anims.play("run", true);
      this.player.flipX = true;
    // when right arrow is down, player moves right
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(100);
      this.player.anims.play("run", true);
      this.player.flipX = false;
    // when idle, player does not move
    } else {
      this.player.body.setVelocityX(0);
      this.player.anims.play("idle", true);
    }
    // player jumps
    if (this.cursors.up.isDown && this.player.body.onFloor()) {
      this.player.setVelocityY(-170);
    }
  }

}

export default FirstLevel;

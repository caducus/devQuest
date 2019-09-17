class FirstLevel extends Phaser.Scene {
  constructor() {
    super({
      key: "Level01"
    });
  // class variables
  this.player;
  this.bats;
  this.direction = ["right", "right", "right", "right", "right", "right"];
  this.gameOver = false;
  this.score = 0;
  this.scoreText;
  this.gameOverText;
  }

  // CREATE STARTS HERE
  create() {

    // =======================
    // MAP AND TILESETS
    // =======================

    // create and load a level map
    const map = this.make.tilemap({key: "level1"});
    // tilesets used to create the layers of the map
    const tiles = map.addTilesetImage("devQuest-tileset", "tiles");
    const stars = map.addTilesetImage("star", "stars");

    // SET MAP LAYERS
    // ground layer of the world
    const obstacles = map.createStaticLayer("world", tiles, 0, 0);
    // star layer which contains all stars to collect
    const starLayer = map.createDynamicLayer("stars", stars, 0, 0);

    // GRAVITY AND PHYSICS
    // player will not fall through the tiles of the ground layer
    obstacles.setCollisionByExclusion([-1]);

    // boundaries of the game are the total width and height of the json map
    this.physics.world.bounds.width = obstacles.widthInPixels;
    this.physics.world.bounds.height = obstacles.heightInPixels;

    // =======================
    // ANIMATIONS
    // =======================

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

    // flying bat animation, right movement
    this.anims.create({
      key: "fly-right",
      frameRate: 4,
      repeat: -1,
      frames: this.anims.generateFrameNumbers("bat", {
        frames: [5, 6, 7, 6]
      })
    });

    // flying bat animation, left movement
    this.anims.create({
      key: "fly-left",
      frameRate: 4,
      repeat: -1,
      frames: this.anims.generateFrameNumbers("bat", {
        frames: [13, 14, 15, 14]
      })
    });

    // =======================
    // PLAYER
    // =======================

    // add the player to the level, set physics
    this.player = this.physics.add.sprite(50, 300, "player-idle", 0);

    // player will not be able to go out of bounds
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, obstacles);

    // =======================
    // CAMERA
    // =======================

    // camera to follow player
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);

    // set the background color of the level
    this.cameras.main.setBackgroundColor("#89D1E8");

    // =======================
    // GAME TEXT
    // =======================

    // create the score text which appears at the top right corner of the screen
    this.scoreText = this.add.text(390, 25, "Stars: 0", {
      fontSize: "16px",
      fill: "#000000"
    });

    // fix the text to a static postion on the screen
    this.scoreText.setScrollFactor(0);

    // =======================
    // STARS
    // =======================

    // when a player touches a star
    function collectStar(sprite, tile) {
      // removes the star from the map
      starLayer.removeTileAt(tile.x, tile.y);
      // add one star to the star count / score
      this.score++;
      // update the star count / score on the screen
      this.scoreText.setText("Stars:" + this.score);
      return false;
    };

    // when the player touches a star, call collectStar
    starLayer.setTileIndexCallback(21, collectStar, this);
    this.physics.add.overlap(this.player, starLayer);

    // =======================
    // USER INPUT
    // =======================

    // defining keyboard functions
    this.cursors = this.input.keyboard.createCursorKeys();

    // =======================
    // ENEMIES
    // =======================

    // // function called when a player collides with a bat sprite
    // function collideBat(player, bat) {
    //   // stop the players movement
    //   this.player.setVelocity(0, 0);
    //   // pause all physics within the game, ie. gravity
    //   this.physics.pause();
    //   this.player.anims.play("death");
    //   this.gameOver = true;
    // }

    // select the bat objects from the bat layer
    const batObjects = map.getObjectLayer("bats")["objects"];

    // create a group of bat enemies
    this.bats = this.physics.add.group({
      allowGravity: false
    });

    // put a bat sprite in place of each bat object from the bat layer
    batObjects.forEach(batObject => {
      this.enemyBat = this.physics.add.sprite(batObject.x, batObject.y, "bat");
      // set initial direction to right
      this.enemyBat.setDirection = "right";
      this.enemyBat.hasStartedMoving = false;
      this.bats.add(this.enemyBat);
    });

    // allow bats to collide with level and player
    this.physics.add.collider(this.bats, obstacles);
    // this.physics.add.collider(this.player, this.bats, collideBat, null, this);

  }
  // CREATE ENDS HERE

  // UPDATE STARTS HERE
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
    };
    // player jumps
    if ((this.cursors.up.isDown || this.cursors.space.isDown) && this.player.body.onFloor()) {
      this.player.setVelocityY(-170);
    };

    let enemies = this.bats.getChildren();

    for (let i = 0; i < enemies.length; i++) {

      // starts initial movement
      if (enemies[i].hasStartedMoving === false) {
        // change to true so that this will never be accessed again
        enemies[i].hasStartedMoving = true;
        // set initial velocity
        enemies[i].setVelocityX(100);
        // set initial animation
        enemies[i].anims.play("fly-right", true);
      };

      if (enemies[i].body.blocked.right === true) {
        if (enemies[i].setDirection === "right") {
          // change setDirection
          enemies[i].setDirection = "left";
          // change animation
          enemies[i].anims.play("fly-left", true);
          // change setVelocityX
          enemies[i].setVelocityX(-100);
        };
      } else if (enemies[i].body.blocked.left == true) {
        if (enemies[i].setDirection === "left") {
          // change setDirection
          enemies[i].setDirection = "right";
          // change animation
          enemies[i].anims.play("fly-right", true);
          // change setVelocityX
          enemies[i].setVelocityX(100);
        };
      };
    };

  }
  // UPDATE ENDS HERE

}

export default FirstLevel;

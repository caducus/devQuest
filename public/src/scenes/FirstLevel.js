class FirstLevel extends Phaser.Scene {
  constructor() {
    super({
      key: "Level01"
    });
  this.player;
  this.bats;
  this.pitfalls;
  this.music;
  this.finalStar;
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

    // MUSIC
    this.music = this.sound.add("music")
    this.music.loop = true;
    this.music.play();

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

    // final star animation
    this.anims.create({
      key: "spin",
      frameRate: 6,
      repeat: -1,
      frames: this.anims.generateFrameNumbers("final-star", {
        frames: [0, 1, 2, 3, 4, 5]
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

    // create the "Game Over!" text
    let deathText = this.add.text(170, 100, "Game Over!", {
      fontSize: "30px",
      fill: "#000000",
      shadow: {
        offsetX: 2,
        offsetY: 2,
        color: "#FFFFFF",
        blur: 0,
        stroke: false,
        fill: true
      }
    });

    // fix the text to a static position on the screen
    deathText.setScrollFactor(0);
    // make the text invisible (until the player dies)
    deathText.visible = false;

    // =======================
    // STARS
    // =======================

    // when a player touches a star
    function collectStar(player, tile) {
      // play the star audio sound
      let starSound = this.sound.add("star");
      starSound.play();
      // removes the star from the map
      starLayer.removeTileAt(tile.x, tile.y);
      // add one star to the star count / score
      this.score++;
      // update the star count / score on the screen
      this.scoreText.setText("Stars:" + this.score);
      return false;
    };

    // when the player touches the final star
    function collectFinalStar(player, star) {
      // add 5 stars to the total score
      this.score += 5;
      // update the star count / score on the screen
      this.scoreText.setText("Stars:" + this.score);
      // pick up the final star
      finalStar.destroy();
      // pause all physics within the game, ie. gravity
      this.physics.pause();
      // display win text
      let winText = this.add.text(2820, 150, "Level Complete!", {
        fontSize: "30px",
        fill: "#000000",
        shadow: {
          offsetX: 2,
          offsetY: 2,
          color: "#FFFFFF",
          blur: 0,
          stroke: false,
          fill: true
        }
      });
    };

    // when the player touches a star, call collectStar
    starLayer.setTileIndexCallback(21, collectStar, this);
    this.physics.add.overlap(this.player, starLayer);

    // create the final star sprite that will let the player complete the level
    let finalStar = this.physics.add.sprite(3154, 259, "final-star", 0);
    finalStar.body.allowGravity = false;
    finalStar.anims.play("spin", true);
    this.physics.add.overlap(this.player, finalStar, collectFinalStar, null, this);


    // =======================
    // USER INPUT
    // =======================

    // defining keyboard functions
    this.cursors = this.input.keyboard.createCursorKeys();

    // =======================
    // PITFALLS
    // =======================

    // function called when a player falls into a pit
    function collidePit(player, bat) {
      // make the deathText visible
      deathText.visible = true;
      // start player death animation
      player.anims.play("death", true);
      // stop music
      this.music.stop();
      // play death sound
      let deathSound = this.sound.add("death");
      // stop the players movement
      player.setVelocity(0, 0);
      // pause all physics within the game, ie. gravity
      this.physics.pause();
      // set gameOver to true;
      this.gameOver = true;
    };

    // select the pitfall objects from the pits layer
    const pitObjects = map.getObjectLayer("pits")["objects"];

    // create a group of all pitfalls
    this.pitfalls = this.physics.add.group({
      allowGravity: false,
      immovable: true
    });

    pitObjects.forEach(pitObject => {
      // use an arbitrary image for pitfall
      this.pitfall = this.physics.add.sprite(pitObject.x, pitObject.y, "one-star");
      this.pitfall.visible = false;
      this.pitfalls.add(this.pitfall);
    });

    // allow pitfalls to collide with player only
    this.physics.add.collider(this.player, this.pitfalls, collidePit, null, this);

    // =======================
    // ENEMIES (BATS)
    // =======================

    // function called when a player collides with a bat sprite
    function collideBat(player, bat) {
      // make the deathText visible
      deathText.visible = true;
      // start player death animation
      player.anims.play("death", true);
      // stop music
      this.music.stop();
      // play death sound
      let deathSound = this.sound.add("death");
      // stop the players movement
      player.setVelocity(0, 0);
      // pause all physics within the game, ie. gravity
      this.physics.pause();
      // set gameOver to true;
      this.gameOver = true;
    };

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
    this.physics.add.collider(this.player, this.bats, collideBat, null, this);

  }
  // CREATE ENDS HERE

  // UPDATE STARTS HERE
  update (time, delta) {

    // =======================
    // PLAYER ACTIONS
    // =======================

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
      let jumpSound = this.sound.add("jump");
      jumpSound.play();
      this.player.setVelocityY(-170);
    };

    // =======================
    // BAT ACTIONS
    // =======================

    // select the group of bats
    let enemies = this.bats.getChildren();

    // loop through the bats
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
      // if the bat is moving right and is blocked
      if (enemies[i].body.blocked.right === true) {
        if (enemies[i].setDirection === "right") {
          // change setDirection
          enemies[i].setDirection = "left";
          // change animation
          enemies[i].anims.play("fly-left", true);
          // change setVelocityX
          enemies[i].setVelocityX(-100);
        };
      // if the bat is moving left and is blocked
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

    // =======================
    // GAME OVER
    // =======================

    if (this.gameOver === true) {
      // camera shakes
      this.cameras.main.shake(400);
      // redirect to new game
      this.time.delayedCall(400, function () {
        this.score = 0;
        this.gameOver = false;
        this.direction = ["right", "right", "right", "right", "right", "right"];
        this.scene.start("MenuScene");
      }, [], this);
    };

  };
  // UPDATE ENDS HERE
}

export default FirstLevel;

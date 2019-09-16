class FirstLevel extends Phaser.Scene {
  constructor() {
    super({
      key: "LEVEL01"
    })
  }

  create() {
    // json level map
    const map = this.make.tilemap({key: "level1"});
    // tileset to create the level
    const tiles = map.addTilesetImage("devQuest-tileset", "tiles");
    // ground layer of the world
    const obstacles = map.createDynamicLayer("obstacles", tiles, 0, 0);
    // level of stars to collect

    // player will be able to collide with world
    obstacles.setCollisionByExclusion([-1]);

    // boundaries of the game are the total width and height of the json map
    this.physics.world.bounds.width = obstacles.widthInPixels;
    this.physics.world.bounds.height = obstacles.heightInPixels;

    // add the player to the level
    this.player = this.physics.add.sprite(50, 300, "player", 0);

    // give player physics and allow them to touch obstacles rather than fall through them
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, obstacles);

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
      frames: this.anims.generateFrameNumbers("player", {
        frames: [0, 1, 2, 3, 4, 5]
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
        // remember to add idle animated sprite here
      }
      // player jumps
      if (this.cursors.up.isDown && this.player.body.onFloor()) {
        this.player.setVelocityY(-100);
      }
  }

}

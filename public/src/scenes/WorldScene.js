class WorldScene extends Phaser.Scene {
  constructor() {
    super({
      key: "WORLD"
    })
  }

  create() {
    const map = this.make.tilemap({key: "map"});
    const tiles = map.addTilesetImage("spritesheet", "tiles");
    const grass = map.createStaticLayer("Grass", tiles, 0, 0);
    const trees1 = map.createDynamicLayer("Trees1", tiles, 0, 0);
    const trees2 = map.createDynamicLayer("Trees2", tiles, 0, 0);

    trees1.setCollisionByExclusion([-1]);
    trees2.setCollisionByExclusion([-1]);

    this.player = this.physics.add.sprite(50, 100, "player", 0);
    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.player.setCollideWorldBounds(true);

    this.physics.add.collider(this.player, trees1);
    this.physics.add.collider(this.player, trees2);

    this.cursors = this.input.keyboard.createCursorKeys();

    // camera to follow player

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);

    // player walk animation
    this.anims.create({
      key: "walk",
      frameRate: 3,
      repeat: -1,
      frames: this.anims.generateFrameNumbers("player", {
        frames: [0, 1, 2]
      })
    });

  }

  update (time, delta) {
    this.player.body.setVelocity(0);
      if (this.cursors.left.isDown) {
        this.player.body.setVelocityX(-80);
        this.player.anims.play("walk", true);
        this.player.flipX = true;
      } else if (this.cursors.right.isDown) {
        this.player.body.setVelocityX(80);
        this.player.anims.play("walk", true);
        this.player.flipX = false;
      }

      if (this.cursors.up.isDown) {
        this.player.body.setVelocityY(-80);
        this.player.anims.play("walk", true);
      } else if (this.cursors.down.isDown) {
        this.player.body.setVelocityY(80);
        this.player.anims.play("walk", true);
      }
  }

}

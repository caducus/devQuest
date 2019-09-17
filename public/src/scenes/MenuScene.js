class MenuScene extends Phaser.Scene {
  constructor () {
    super ({
      key: "MenuScene"
    })
  }
  init(data) {
    console.log("I recieved the following data from the load scene:");
    console.log(data);
  }

  create () {
    // main menu: background
    let title_bg = this.add.image(0, 0, "main_background");
    title_bg.setOrigin(0, 0);
    title_bg.scaleX = 0.6;
    title_bg.scaleY = 0.6;

    // main menu: logo
    this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, "logo");

    // main menu: play button
    let playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, "play_button");

    // create a hover sprite
    let hoverSprite = this.add.sprite(100, 100, "bat");
    hoverSprite.setVisible(false);

    // hover sprite animation
    this.anims.create({
      key: "fly",
      frameRate: 4,
      repeat: -1, // repeat forever
      frames: this.anims.generateFrameNumbers("bat", {
        frames: [0, 1, 2, 3]
      })
    })

    // set buttons to interactive
    playButton.setInteractive();

    // play button: hover over
    playButton.on("pointerover", () => {
      hoverSprite.setVisible(true);
      hoverSprite.play("fly");
      hoverSprite.x = playButton.x - 120;
      hoverSprite.y = playButton.y;
    });

    // play button: leave hover
    playButton.on("pointerout", () => {
      hoverSprite.setVisible(false);
    });

    // play button: click to start game
    playButton.on("pointerup", () => {
      console.log("Start game");
      this.scene.start("Level01");
    });
  }
}

export default MenuScene;

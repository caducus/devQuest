class MainMenuScene extends Phaser.Scene {
  constructor () {
    super ({
      key: "MENU"
    })
  }
  init(data) {
    console.log("I recieved the following data from the load scene:");
    console.log(data);
  }

  create () {
    // main menu: background
    let title_bg = this.add.image(0, 0, "title_background");
    title_bg.setOrigin(0, 0);

    // main menu: logo
    this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, "logo");

    // main menu: play button
    let playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, "play_button");

    // main menu: options button
    let optionsButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, "options_button");

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
    optionsButton.setInteractive();

    // play button: hover over
    playButton.on("pointerover", () => {
      hoverSprite.setVisible(true);
      hoverSprite.play("fly");
      hoverSprite.x = playButton.x - 100;
      hoverSprite.y = playButton.y;
    });

    // play button: leave hover
    playButton.on("pointerout", () => {
      hoverSprite.setVisible(false);
    });

    // play button: click to start game
    playButton.on("pointerup", () => {
      console.log("Start game");
      this.scene.start("WORLD");
    });

    // option button: hover over
    optionsButton.on("pointerover", () => {
      hoverSprite.setVisible(true);
      hoverSprite.play("fly");
      hoverSprite.x = optionsButton.x - 100;
      hoverSprite.y = optionsButton.y;
    });

    // option button: leave hover
    optionsButton.on("pointerout", () => {
        hoverSprite.setVisible(false);
    });

    // option button: click to get menu
    optionsButton.on("pointerup", () => {
      console.log("Open options menu");
    });
  }
}

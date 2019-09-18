class MenuScene extends Phaser.Scene {
  constructor () {
    super ({
      key: "MenuScene"
    })
  }

  // INIT STARTS HERE
  init(data) {
    console.log("I recieved the following data from the load scene:");
    console.log(data);
  }
  // INIT ENDS HERE

  // CREATE STARTS HERE
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

    // main menu: game instructions
    this.add.text(80, 300, "right and left arrows control direction", {
      fontSize: "14px",
      fill: "#FFFFFF",
      shadow: {
        offsetX: 1,
        offsetY: 1,
        color: "#000000",
        blur: 0,
        stroke: false,
        fill: true
      }
    });
    this.add.text(97, 320, "jump with the up arrow or space bar", {
      fontSize: "14px",
      fill: "#FFFFFF",
      shadow: {
        offsetX: 1,
        offsetY: 1,
        color: "#000000",
        blur: 0,
        stroke: false,
        fill: true
      }
    });
    this.add.text(55, 340, "to start a new game, click above or hit enter", {
      fontSize: "14px",
      fill: "#FFFFFF",
      shadow: {
        offsetX: 1,
        offsetY: 1,
        color: "#000000",
        blur: 0,
        stroke: false,
        fill: true
      }
    });

    // create a hover sprite
    let hoverSprite = this.add.sprite(100, 100, "bat");
    hoverSprite.setVisible(false);

    // hover sprite animation
    this.anims.create({
      key: "fly",
      frameRate: 4,
      repeat: -1, // repeat forever
      frames: this.anims.generateFrameNumbers("bat", {
        frames: [1, 2, 3, 2]
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
  };
  // CREATE ENDS HERE

  // UPDATE STARTS HERE
  update () {
    
  }
  // UPDATE ENDS HERE
}

export default MenuScene;

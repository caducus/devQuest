class LoadingScene extends Phaser.Scene {
  constructor () {
    super ({
      key: "LOAD"
    })
  }

  preload() {
    // images: main menu
    this.load.image("title_background", "../assets/image/title_background.jpg");
    this.load.image("options_button", "../assets/image/options_button.png");
    this.load.image("play_button", "../assets/image/play_button.png");
    this.load.image("logo", "../assets/image/logo.png");

    // images: world map
    this.load.image("tiles", "../assets/map/spritesheet.png");
    this.load.tilemapTiledJSON("map", "../assets/map/map.json");

    // images: character
    this.load.spritesheet("player", "../assets/sprite/57x57-hero-walk.png", {
      frameHeight: 63,
      frameWidth: 57
    });

    // images: enemies
    this.load.spritesheet("bat", "../assets/sprite/32x32-bat-sprite.png", {
      frameHeight: 32,
      frameWidth: 32
    });

    // create loading bar graphic
    let loadingBar = this.add.graphics({
      fillStyle: {
        color: 0xffffff //white
      }
    });

    // fill in loading bar based on percent of loading progress
    this.load.on("progress", (percent) => {
      loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
      console.log(percent);
    });

    this.load.on("complete", () => {
      console.log("I am completely loaded.");
    });
  }

  create () {
    this.scene.start("MENU", "I am data from the Load Scene, hear me roar.");
  }
}

class LoadScene extends Phaser.Scene {
  constructor () {
    super ({
      key: "LoadScene"
    })
    this.loadingText;
  }

  // PRELOAD STARTS HERE
  preload() {
    // images: main menu
    this.load.image("main_background", "../assets/image/main_background.png");
    this.load.image("play_button", "../assets/image/play_button.png");
    this.load.image("logo", "../assets/image/logo.png");
    // images: world map
    this.load.image("tiles", "../assets/map/devQuest-tileset.png");
    this.load.image("stars", "../assets/map/star.png");
    this.load.tilemapTiledJSON("level1", "../assets/map/level-01.json");
    // images: character
    this.load.spritesheet("player-run", "../assets/sprite/19x25-little-blue-run.png", {
      frameHeight: 25,
      frameWidth: 19
    });
    this.load.spritesheet("player-idle", "../assets/sprite/20x27-little-blue-idle.png", {
      frameHeight: 27,
      frameWidth: 20
    });
    this.load.spritesheet("player-death", "../assets/sprite/35x30-little-blue-death.png", {
      frameHeight: 30,
      frameWidth: 35
    });
    // images: enemies
    this.load.spritesheet("bat", "../assets/sprite/32x32-bat-sprite.png", {
      frameHeight: 32,
      frameWidth: 32
    });
    // image: star
    this.load.spritesheet("final-star", "../assets/sprite/13x13-star.png", {
      frameHeight: 13,
      frameWidth: 13
    });
    // images: placeholder
    this.load.spritesheet("one-star", "../assets/sprite/placeholder.png", {
      frameHeight: 3,
      frameWidth: 96
    });

    // audio
    this.load.audio("music", ["../assets/audio/enchanted_forest.mp3"]);
    this.load.audio("jump", ["../assets/audio/jump.mp3"]);
    this.load.audio("star", ["../assets/audio/star.mp3"]);
    this.load.audio("death", ["../assets/audio/hurt.mp3"]);

    // create loading bar graphic
    let loadingBar = this.add.graphics({
      fillStyle: {
        color: 0xffffff //white
      }
    });

    // fill in loading bar based on percent of loading progress
    this.load.on("progress", (percent) => {
      loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
    });

    this.load.on("complete", () => {
      console.log("Assets loaded.");
    });
  };
  // PRELOAD ENDS HERE

  // CREATE STARTS HERE
  create () {
      this.scene.start("MenuScene", "I am data from the Load Scene, hear me roar.");
  };
  // CREATE ENDS HERE
}

export default LoadScene;

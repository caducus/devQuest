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
    this.load.image("devQuest", "../assets/image/devQuest-logo.png");
    this.load.image("logo", "../assets/image/caducus-red-logo.png");
    // images: world map
    this.load.image("tiles", "../assets/map/devQuest-tileset.png");
    this.load.image("stars", "../assets/map/star.png");
    this.load.tilemapTiledJSON("level1", "../assets/map/level-01.json");
    // images: audio volume
    this.load.image("vol", "../assets/image/vol.png");
    this.load.image("vol_up", "../assets/image/vol_up.png");
    this.load.image("vol_down", "../assets/image/vol_down.png");
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
    // image: danger
    this.load.spritesheet("danger", "../assets/sprite/100x15-danger.png", {
      frameHeight: 5,
      frameWidth: 100
    });

    // audio
    // notes: Firefox doesn't support mp3s, so include oggs as well
    this.load.audio("music", ["../assets/audio/enchanted_forest.mp3", "../assets/audio/enchanted_forest_loop.ogg"]);
    this.load.audio("jump", ["../assets/audio/jump.mp3", "../assets/audio/jump.ogg"]);
    this.load.audio("star", ["../assets/audio/star.mp3", "../assets/audio/star.ogg"]);
    this.load.audio("death", ["../assets/audio/hurt.mp3", "../assets/audio/hurt.ogg"]);

    // create loading bar and box graphics
    let loadingBar = this.add.graphics();
    let loadingBox = this.add.graphics();

    // set the attributes of the loadingBox
    loadingBox.fillStyle(0xffffff, 0.8);
    loadingBox.fillRect(90, 150, 320, 50);

    // create loadingText
    let loadingText = this.add.text(100, 100, "Game Loading...", {
      fontSize: "18px",
      fill: "#FFFFFF",
    });

    // fill in loading bar based on percent of loading progress
    this.load.on("progress", (percent) => {
      loadingBar.clear();
      // set the attributes of the loadingBar based on the percentage of the game assets as they load
      loadingBar.fillStyle(0x89D1E8, 1);
      loadingBar.fillRect(110, 160, 280 * percent, 30);
    });

    this.load.on("complete", () => {
      // get rid of the loading bar and text when all assets have successfully been loaded
      loadingBar.destroy();
      loadingBox.destroy();
      loadingText.destroy();
    });
  };
  // PRELOAD ENDS HERE

  // CREATE STARTS HERE
  create () {
      // render the trademark logo after all assets have been loaded
      this.add.image(this.game.renderer.width / 2, (this.game.renderer.height / 2) - 25, "logo");
      // add a delay to allow the user to see the trademark logo before starting the menu scene
      this.time.addEvent({
        delay: 700,
        callback: ()=>{
          this.scene.start("MenuScene", "I am data from the Load Scene, hear me roar.");
        },
        loop: false
      });
  };
  // CREATE ENDS HERE
}

export default LoadScene;

import LoadScene from "./scenes/LoadScene.js";
import MenuScene from "./scenes/MenuScene.js";
import FirstLevel from "./scenes/FirstLevel.js";

let config = {
  type: Phaser.AUTO,
  // second possibility for game dimensions
  // parent: "game-content",
  // width: 500,
  // height: 400,
  scale: {
    parent: "game-content",
    mode: Phaser.Scale.FIT,
    width: 500,
    height: 400
  },
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 300
      },
      debug: false
    }
  },
  scene: [
    LoadScene,
    MenuScene,
    FirstLevel
  ]
};

let game = new Phaser.Game(config);

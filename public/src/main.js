import LoadScene from "./scenes/LoadScene.js";
import MenuScene from "./scenes/MenuScene.js";
import FirstLevel from "./scenes/FirstLevel.js";
import SecondLevel from "./scenes/SecondLevel.js";

let config = {
  type: Phaser.AUTO,
  // second possibility for game dimensions
  // parent: "game-content",
  width: 500,
  height: 400,
  scale: {
    parent: "game-content",
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
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
    FirstLevel,
    SecondLevel
  ]
};

let game = new Phaser.Game(config);

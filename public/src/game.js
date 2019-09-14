let config = {
  type: Phaser.AUTO,
  parent: "game-content",
  width: 320, //644,
  height: 240, //486,
  zoom: 2,
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 0
      }
    }
  },
  scene: [
    LoadingScene,
    MainMenuScene,
    WorldScene
  ],
};

let game = new Phaser.Game(config);

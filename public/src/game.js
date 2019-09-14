let config = {
  type: Phaser.AUTO,
  scale: {
    parent: "game-content",
    mode: Phaser.Scale.FIT,
    width: 500,
    height: 400
  },
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

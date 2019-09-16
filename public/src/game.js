  let config = {
  type: Phaser.AUTO,
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
    LoadingScene,
    MainMenuScene,
    FirstLevel
  ]
};

let game = new Phaser.Game(config);

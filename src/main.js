let gameConfig = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    backgroundColor: '#000000',
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 }
        }
    },
    scene: [SceneMenu,Scene,SceneOptions,SceneGameOver,SceneVictory]
};
let game = new Phaser.Game(gameConfig);
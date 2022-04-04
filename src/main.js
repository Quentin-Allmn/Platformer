let gameConfig = {
    type: Phaser.AUTO,
    width: 2000,
    height: 900,
    backgroundColor: '#000000',
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 }
        }
    },
    scene: new Scene()
};
let game = new Phaser.Game(gameConfig);
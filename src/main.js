let gameConfig = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    backgroundColor: '#000000',
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 700 }
        }
    },
    scene: [SceneMenu,Scene,SceneOptions,SceneGameOver,SceneVictory,SceneUI,ControlScene,introScene]
};
let game = new Phaser.Game(gameConfig);

// Choix du mode de jeu
var diffHard = false;

// Choix de la langue
var langue = "en";

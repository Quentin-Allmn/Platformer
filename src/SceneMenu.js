class SceneMenu extends Phaser.Scene{

    constructor(){
        super("bootGame");
    }

    preload(){
        this.load.image('play', 'assets/images/UI/UI_Play.png');
        this.load.image('options', 'assets/images/UI/UI_Options.png');

    }

    create() {
        this.add.text(20,20,"Loading game...");

        this.add.image(400,400,'play');

        this.scene.start("playGame");
    }

}
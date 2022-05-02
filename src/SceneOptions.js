class SceneOptions extends Phaser.Scene{

    constructor(){
        super("optionsGame");
    }

    preload(){
        this.load.image('play', 'assets/images/UI/UI_Play.png');
        this.load.image('options', 'assets/images/UI/UI_Options.png');

    }

    create() {
        this.add.text(380,120,"A Night In Fire",{ fontFamily: 'Asian', color: '#FFC100', fontSize: '100px' });

        this.add.image(660,340,'play');

        this.add.image(660,540,'options');

        //this.scene.start("playGame");
    }

}
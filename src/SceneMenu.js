class SceneMenu extends Phaser.Scene{

    constructor(){
        super("menuGame");
    }

    preload(){
        this.load.image('play', 'assets/images/UI/UI_Play.png');
        this.load.image('play2', 'assets/images/UI/UI_Play_On.png');
        this.load.image('options', 'assets/images/UI/UI_Options.png');
        this.load.image('options2', 'assets/images/UI/UI_Options_On.png');

    }

    create() {
        this.add.text(380,120,"A Night In Fire",{ fontFamily: 'Asian', color: '#FFC100', fontSize: '100px' });

        let playbutton = this.add.image(660,340,'play');

        let optionsbutton = this.add.image(660,540,'options');

        playbutton.setInteractive();

        playbutton.on("pointerover",()=>{
            console.log("over")
            playbutton.setTexture('play2')
        })

        playbutton.on("pointerout",()=>{
            console.log("out")
            playbutton.setTexture('play')
        })

        playbutton.on("pointerup",()=>{
            console.log("up")
            playbutton.setTexture('play2')
            this.scene.start("playGame")
        })

        optionsbutton.setInteractive();

        optionsbutton.on("pointerover",()=>{
            console.log("over")
            optionsbutton.setTexture('options2')
        })

        optionsbutton.on("pointerout",()=>{
            console.log("out")
            optionsbutton.setTexture('options')
        })

        optionsbutton.on("pointerup",()=>{
            console.log("up")
            optionsbutton.setTexture('options2')
            this.scene.start("optionsGame")
        })

    }

}
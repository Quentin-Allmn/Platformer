class SceneMenu extends Phaser.Scene{

    constructor(){
        super("menuGame");
    }

    preload(){
        this.load.image('play', 'assets/images/UI/UI_Play.png');
        this.load.image('options', 'assets/images/UI/UI_Options.png');

    }

    create() {
        this.add.text(380,120,"A Night In Fire",{ fontFamily: 'Asian', color: '#FFC100', fontSize: '100px' });

        let playbutton = this.add.image(660,340,'play');

        let optionsbutton = this.add.image(660,540,'options');

        this.cursors = this.input.keyboard.createCursorKeys();

        playbutton.setInteractive();

        playbutton.on("pointerover",()=>{
            console.log("over")
        })

        playbutton.on("pointerout",()=>{
            console.log("out")
        })

        playbutton.on("pointerup",()=>{
            console.log("up")
            this.scene.start("playGame")
        })

        optionsbutton.setInteractive();

        optionsbutton.on("pointerover",()=>{
            console.log("over")
        })

        optionsbutton.on("pointerout",()=>{
            console.log("out")
        })

        optionsbutton.on("pointerup",()=>{
            console.log("up")
            this.scene.start("optionsGame")
        })

    }

}
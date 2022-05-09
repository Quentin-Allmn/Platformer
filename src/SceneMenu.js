class SceneMenu extends Phaser.Scene{

    constructor(){
        super("menuGame");
    }

    preload(){
        this.load.image('play', 'assets/images/UI/UI_Play1.png');
        this.load.image('play2', 'assets/images/UI/UI_Play1_On.png');
        this.load.image('options', 'assets/images/UI/UI_Options1.png');
        this.load.image('options2', 'assets/images/UI/UI_Options1_On.png');
        this.load.image('background2','assets/images/background/sky1-C.png')
    }

    create() {

        const MbackgroundImage = this.add.image(0, 0, 'background2').setOrigin(0, 0);
        MbackgroundImage.setScale(0.75, 1);

        this.add.text(450,40,"A Night In Fire",{ fontFamily: 'Asian', color: '#FFC100', fontSize: '80px' });

        let playbutton = this.add.image(660,440,'play');
        playbutton.setScale(1);

        let optionsbutton = this.add.image(660,540,'options');
        optionsbutton.setScale(1);

        playbutton.setInteractive();

        playbutton.on("pointerover",()=>{
            //console.log("over")
            playbutton.setTexture('play2')
        })

        playbutton.on("pointerout",()=>{
            //console.log("out")
            playbutton.setTexture('play')
        })

        playbutton.on("pointerup",()=>{
            //console.log("up")
            playbutton.setTexture('play2')
            this.scene.start("playGame")
        })

        optionsbutton.setInteractive();

        optionsbutton.on("pointerover",()=>{
            //console.log("over")
            optionsbutton.setTexture('options2')
        })

        optionsbutton.on("pointerout",()=>{
            //console.log("out")
            optionsbutton.setTexture('options')
        })

        optionsbutton.on("pointerup",()=>{
            //console.log("up")
            optionsbutton.setTexture('options2')
            this.scene.start("optionsGame")
        })

    }

}
class SceneGameOver extends Phaser.Scene{

    constructor(){
        super("GameOver");
    }

    preload(){
        this.load.image('back', 'assets/images/UI/UI_BackMenu1.png');
        this.load.image('back2', 'assets/images/UI/UI_BackMenu1_On.png');
        this.load.image('playAgain', 'assets/images/UI/UI_PlayAgain1.png');
        this.load.image('playAgain2', 'assets/images/UI/UI_PlayAgain1_On.png');
        this.load.image('background2','assets/images/background/sky1.png')

    }

    create() {

        const MbackgroundImage = this.add.image(0, 0, 'background2').setOrigin(0, 0);
        MbackgroundImage.setScale(0.75, 1);

        this.add.text(380,120,"A Night In Fire",{ fontFamily: 'Asian', color: '#FFC100', fontSize: '100px' });

        this.add.text(380,320,"GAME OVER",{ fontFamily: 'Asian', color: '#FFC100', fontSize: '100px' });

        this.add.text(320,420, "You failed to save your village ",{ fontFamily: 'Asian', color: '#FFC100', fontSize: '60px' });

        let backmbutton = this.add.image(160,60,'back');
        backmbutton.setScale(1)

        backmbutton.setInteractive();

        backmbutton.on("pointerover",()=>{
            //console.log("over")
            backmbutton.setTexture('back2')
        })

        backmbutton.on("pointerout",()=>{
           //console.log("out")
            backmbutton.setTexture('back')
        })

        backmbutton.on("pointerup",()=>{
            //console.log("up")
            backmbutton.setTexture('back2')
            this.scene.start("menuGame")
        })

        let backplaybutton = this.add.image(660,550,'playAgain');
        backplaybutton.setScale(1);

        backplaybutton.setInteractive();

        backplaybutton.on("pointerover",()=>{
            //console.log("over")
            backplaybutton.setTexture('playAgain2')
        })

        backplaybutton.on("pointerout",()=>{
            //console.log("out")
            backplaybutton.setTexture('playAgain')
        })

        backplaybutton.on("pointerup",()=>{
            //console.log("up")
            backplaybutton.setTexture('playAgain2')
            this.scene.start("playGame")
        })

    }


}
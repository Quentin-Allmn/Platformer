class SceneGameOver extends Phaser.Scene{

    constructor(){
        super("GameOver");
    }

    preload(){
        this.load.image('play', 'assets/images/UI/UI_Play.png');
        this.load.image('options', 'assets/images/UI/UI_Options.png');

    }

    create() {
        this.add.text(380,120,"A Night In Fire",{ fontFamily: 'Asian', color: '#FFC100', fontSize: '100px' });

        this.add.text(380,320,"GAME OVER",{ fontFamily: 'Asian', color: '#FFC100', fontSize: '100px' });

        this.add.text(380,420, "You failed to save your village ",{ fontFamily: 'Asian', color: '#FFC100', fontSize: '100px' });

        let backmenubutton = this.add.text(20,20,"Back",{ fontFamily: 'Asian', color: '#FFC100', fontSize: '30px' })

        backmenubutton.setInteractive();

        backmenubutton.on("pointerover",()=>{
            console.log("over")
        })

        backmenubutton.on("pointerout",()=>{
            console.log("out")
        })

        backmenubutton.on("pointerup",()=>{
            console.log("up")
            this.scene.start("menuGame")
        })

        let backplaybutton = this.add.text(20,20,"Play",{ fontFamily: 'Asian', color: '#FFC100', fontSize: '30px' })

        backplaybutton.setInteractive();

        backplaybutton.on("pointerover",()=>{
            console.log("over")
        })

        backplaybutton.on("pointerout",()=>{
            console.log("out")
        })

        backplaybutton.on("pointerup",()=>{
            console.log("up")
            this.scene.start("playGame")
        })

        //this.scene.start("playGame");
    }


}
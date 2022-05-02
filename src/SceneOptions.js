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

        this.add.text(380,320,"Options",{ fontFamily: 'Asian', color: '#FFC100', fontSize: '100px' });

        let backbutton = this.add.text(20,20,"Back",{ fontFamily: 'Asian', color: '#FFC100', fontSize: '30px' })

        backbutton.setInteractive();

        backbutton.on("pointerover",()=>{
            console.log("over")
        })

        backbutton.on("pointerout",()=>{
            console.log("out")
        })

        backbutton.on("pointerup",()=>{
            console.log("up")
            this.scene.start("menuGame")
        })

        //this.scene.start("playGame");
    }

    update(){

    }

}
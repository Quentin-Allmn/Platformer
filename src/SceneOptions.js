class SceneOptions extends Phaser.Scene{

    constructor(){
        super("optionsGame");
    }

    preload(){

        this.load.image('back', 'assets/images/UI/UI_BackMenu1.png');
        this.load.image('back2', 'assets/images/UI/UI_BackMenu1_On.png');
        this.load.image('background2','assets/images/background/sky1.png')

    }

    create() {

        const MbackgroundImage = this.add.image(0, 0, 'background2').setOrigin(0, 0);
        MbackgroundImage.setScale(0.75, 1);

        this.add.text(380,120,"A Night In Fire",{ fontFamily: 'Asian', color: '#FFC100', fontSize: '100px' });

        this.add.text(380,320,"Options",{ fontFamily: 'Asian', color: '#FFC100', fontSize: '100px' });

        let backbutton = this.add.image(160,60,'back');
        backbutton.setScale(1)

        backbutton.setInteractive();

        backbutton.on("pointerover",()=>{
            console.log("over")
            backbutton.setTexture('back2')
        })

        backbutton.on("pointerout",()=>{
            console.log("out")
            backbutton.setTexture('back')
        })

        backbutton.on("pointerup",()=>{
            console.log("up")
            backbutton.setTexture('back2')
            this.scene.start("menuGame")
        })

        //this.scene.start("playGame");
    }

    update(){

    }

}
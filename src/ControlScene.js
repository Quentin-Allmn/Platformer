class ControlScene extends Phaser.Scene{

    constructor() {
        super("ControlScene");
    }

    preload(){
        this.load.image('background2','assets/images/Background/Sky1-min.png');
        this.load.image('CFr','assets/images/UI/Fr/Controls_fr.png');
        this.load.image('CEn','assets/images/UI/Controls_en.png');
        this.load.image('CKr','assets/images/UI/Kr/Controls_kr.png');

        this.load.image('back', 'assets/images/UI/Fr/Menu_fr.png');
        this.load.image('back2', 'assets/images/UI/Fr/Menu_Fr_On.png');
    }
    create(){

        const MbackgroundImage = this.add.image(0, 0, 'background2').setOrigin(0, 0);
        MbackgroundImage.setScale(0.75, 1);

        this.controlI = this.add.image(650,350,'CEn');
        this.controlI.setScale(0.5);

        if (langue === 'fr'){
            this.controlI.setTexture('CFr');
        }
        if (langue === 'kr'){
            this.controlI.setTexture('CKr');
        }
        if (langue === 'en'){
            this.controlI.setTexture('CEn');
        }


        let backbutton2 = this.add.image(160,60,'back');
        backbutton2.setScale(1)

        backbutton2.setInteractive();

        backbutton2.on("pointerover",()=>{
            //console.log("over")
            backbutton2.setTexture('back2')
        })

        backbutton2.on("pointerout",()=>{
            //console.log("out")
            backbutton2.setTexture('back')
        })

        backbutton2.on("pointerup",()=>{
            //console.log("up")
            backbutton2.setTexture('back2')
            this.scene.start("menuGame")
        })

    }

}
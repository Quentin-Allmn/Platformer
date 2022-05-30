class ControlScene extends Phaser.Scene{

    constructor() {
        super("ControlScene");
    }

    preload(){
        this.load.image('background2','assets/images/Background/Sky1-min.png');
    }
    create(){

        const MbackgroundImage = this.add.image(0, 0, 'background2').setOrigin(0, 0);
        MbackgroundImage.setScale(0.75, 1);

        this.add.text(500,500,"gauche => fleche gauche");
        this.add.text(500,550,"droite => fleche droite");
        this.add.text(500,600,"sauter => fleche haut");
        this.add.text(500,650,"Kick => espace");

        this.back = this.add.text(100,100,"back");

        this.back.setInteractive();

        this.back.on("pointerup",()=>{
            this.scene.start("menuGame")
        })

    }

}
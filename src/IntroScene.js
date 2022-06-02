class introScene extends Phaser.Scene{

    constructor(){
        super("Intro");
    }

    preload(){

        for (let i = 1; i <= 3; i++) {
            this.load.image('intro-' + i, 'assets/images/Animations/Intro/intro-' + i + '.png');
        }

    }

    create() {


        this.anims.create({
            key: 'intro',
            frames: [
                {key:'intro-1'},
                {key:'intro-1'},
                {key:'intro-1'},
                {key:'intro-1'},
                {key:'intro-1'},
                {key:'intro-1'},
                {key:'intro-1'},
                {key:'intro-2'},
                {key:'intro-2'},
                {key:'intro-2'},
                {key:'intro-2'},
                {key:'intro-2'},
                {key:'intro-2'},
                {key:'intro-2'},
                {key:'intro-3'},
                {key:'intro-3'},
                {key:'intro-3'},
                {key:'intro-3'},
                {key:'intro-3'},
                {key:'intro-3'},
                {key:'intro-3'},

            ],
            frameRate: 3,
            repeat: 0});
        this.anims = this.add.sprite(0,0,'intro-1').setOrigin(0,0);
        this.anims.setScale(0.68);
        this.anims.play('intro');

        this.timer = this.time.addEvent({
            delay: 7000,
            callback: ()=>{
                this.scene.start("playGame")
            },

            loop: false,
        })

    }


}
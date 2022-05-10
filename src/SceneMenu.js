class SceneMenu extends Phaser.Scene{

    constructor(){
        super("menuGame");
    }

    preload(){
        this.load.image('play', 'assets/images/UI/UI_Play1.png');
        this.load.image('play2', 'assets/images/UI/UI_Play1_On.png');
        this.load.image('options', 'assets/images/UI/UI_Options1.png');
        this.load.image('options2', 'assets/images/UI/UI_Options1_On.png');
        this.load.image('background2','assets/images/background/sky1.png');

        this.load.image('controls','assets/images/UI/Controls.png');
        this.load.image('controls2','assets/images/UI/Controls_On.png');

        for (let i = 1; i <= 9; i++) {
            this.load.image('yellow-' + i, 'assets/images/Fireworks/yellow/yellow-' + i + '.png');
        }

    }

    create() {


        const MbackgroundImage = this.add.image(0, 0, 'background2').setOrigin(0, 0);
        MbackgroundImage.setScale(0.75, 1);

        this.add.text(425,40,"A Night In Fire",{ fontFamily: 'Asian', color: '#FFC100', fontSize: '80px' });

        let playbutton = this.add.image(660,440,'play');
        playbutton.setScale(1);

        let optionsbutton = this.add.image(660,540,'options');
        optionsbutton.setScale(1);

        let controlbutton = this.add.image(660,640,'controls');
        controlbutton.setScale(0.58);

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

        controlbutton.setInteractive();

        controlbutton.on("pointerover",()=>{
            //console.log("over")
            controlbutton.setTexture('controls2')
        })

        controlbutton.on("pointerout",()=>{
            //console.log("out")
            controlbutton.setTexture('controls')
        })

        // controlbutton.on("pointerup",()=>{
        //     //console.log("up")
        //     controlbutton.setTexture('controls')
        //     this.scene.start("optionsGame")
        // })


        this.fireworks();

    }

    fireworks(){
        this.FwYellow = this.add.sprite(200,10, 'yellow-').setOrigin(0, 0);
        this.FwYellow.setScale(1.5)

        this.anims.create({
            key: 'yellow',
            frames: [
                {key: 'yellow-1'},
                {key: 'yellow-2'},
                {key: 'yellow-3'},
                {key: 'yellow-4'},
                {key: 'yellow-5'},
                {key: 'yellow-6'},
                {key: 'yellow-7'},
                {key: 'yellow-8'},
                {key: 'yellow-9'},
            ],
            frameRate: 12,

        });

        // const firework = this.physics.add.group();
        //
        // const fireworksList = ['yellow']
        //
        // const fireworksGen = () => {
        //     const xCoord = Math.random() * 1920
        //     const yCoord = Math.random() * 720
        //     let randomfireworks = fireworksList(Math.random() * 3)
        //     firework.create(xCoord, yCoord, randomfireworks);
        //
        // }
        //
        // const fireworksGenLoop = this.time.addEvent({
        //     delay:  this.fwDelay,
        //     callback: fireworksGen,
        //     loop: true,
        // });

         this.FwYellow.play('yellow')
    }

}
class SceneOptions extends Phaser.Scene{

    constructor(){
        super("optionsGame");
    }

    preload(){

        this.load.image('back', 'assets/images/UI/Fr/Menu_fr.png');
        this.load.image('back2', 'assets/images/UI/Fr/Menu_Fr_On.png');

        this.load.image('hard', 'assets/images/UI/UI_Difficulty_Hard.png');
        this.load.image('normal', 'assets/images/UI/UI_Difficulty_Normal.png');

        this.load.image('Fr', 'assets/images/UI/langueFr.png');
        this.load.image('En', 'assets/images/UI/LangueEn.png');
        this.load.image('Kr', 'assets/images/UI/LangueKr.png');


        this.load.image('background2','assets/images/Background/Sky1.png');
        this.load.image('logo','assets/images/Logo/Logo.png')

        for (let i = 1; i <= 9; i++) {
            this.load.image('yellow-' + i, 'assets/images/Fireworks/yellow/yellow-' + i + '.png');
        }

    }

    create() {

        const MbackgroundImage = this.add.image(0, 0, 'background2').setOrigin(0, 0);
        MbackgroundImage.setScale(0.75, 1);

        //this.add.text(380,120,"A Night In Fire",{ fontFamily: 'Asian', color: '#FFC100', fontSize: '100px' });

        this.add.image(400,10,'logo').setOrigin(0,0).setScale(0.5);

        let backbutton = this.add.image(160,60,'back');
        backbutton.setScale(1)

        backbutton.setInteractive();

        backbutton.on("pointerover",()=>{
            //console.log("over")
            backbutton.setTexture('back2')
        })

        backbutton.on("pointerout",()=>{
            //console.log("out")
            backbutton.setTexture('back')
        })

        backbutton.on("pointerup",()=>{
            //console.log("up")
            backbutton.setTexture('back2')
            this.scene.start("menuGame")
        })

        let diffbutton = this.add.image(700,460,'normal');
        diffbutton.setScale(1)

        if (diffHard === true){
            diffbutton.setTexture('hard')
        }
        else {
            diffbutton.setTexture('normal')
        }

        diffbutton.setInteractive();

        diffbutton.on("pointerup",()=>{

            //console.log("up")
            if (diffHard === false){
                diffbutton.setTexture('hard')
                diffHard = true;
                console.log("Hard")
            }
            else {
                diffbutton.setTexture('normal')
                diffHard = false;
                console.log("Normal")
            }

        })

        let languebutton = this.add.image(700, 600, 'En');

        if (langue === "en"){
            languebutton.setTexture("En")
        }
        else if (langue === "fr"){
            languebutton.setTexture("Fr")
        }
        else {
            languebutton.setTexture("Kr")
        }

        languebutton.setInteractive();

        languebutton.on("pointerup",()=>{
            //console.log("up")

            if (langue === "en"){
                console.log("en")
                languebutton.setTexture("Fr")
                langue = "fr"
                console.log("fr")
            }
            else if (langue === "fr"){
                console.log("fr")
                languebutton.setTexture("Kr")
                langue = "kr"
                console.log("kr")
            }
            else {
                console.log("kr")
                languebutton.setTexture("En")
                langue = "en"
                console.log("en")
            }
        })

        this.FwYellow = this.add.sprite(600,10, 'yellow-').setOrigin(0, 0);
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

        this.FwYellow.play('yellow')

    }

    update(){
        if (diffHard === true){
            console.log("Hard")
        }
        else {
            console.log("Normal")
        }

        if (langue === "en"){
            console.log("en")
        }
        else if (langue === "fr"){
            console.log("fr")
        }
        else {
            console.log("kr")
        }

    }

}
class SceneUI extends Phaser.Scene{

    UI(){

        Phaser.Scene.call(this, {key: 'UIScene', active: true});

    }

    preload(){

        this.load.image('vie1', 'assets/images/UI/Vie/UI-vie2.png');

    }

    create(){

        this.add.image(500,500, 'vie').setOrigin(0,0);

    }

}
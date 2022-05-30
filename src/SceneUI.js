class SceneUI extends Phaser.Scene{

constructor() {
    super("SceneUI");
}

    preload(){

        this.load.image('vie1', 'assets/images/UI/Vie/UI-vie2.png');

    }

    create(){

        this.vie1 = this.add.image(1100,50, 'vie1').setOrigin(0,0);
        this.vie1.setScale(0.5);
        this.vie1.setVisible(true);

        this.vie2 = this.add.image(1155,50, 'vie1').setOrigin(0,0);
        this.vie2.setScale(0.5);
        this.vie2.setVisible(true);

        this.vie3 = this.add.image(1210,50, 'vie1').setOrigin(0,0);
        this.vie3.setScale(0.5);
        this.vie3.setVisible(true);

    }

    update(){
        if (vie === 2){
            this.vie3.setVisible(false);
        }

        if (vie === 1){
            this.vie2.setVisible(false);
        }

        if (vie === 0){
            this.vie1.setVisible(false);
        }
    }

}
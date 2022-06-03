class Player {

    constructor(Scene) {
        this.scene = Scene
        this.player = this.scene.physics.add.sprite(725, 900, 'player');
        this.player.setBounce(0).setVelocityX(0);
        this.player.body.setSize(65,65).setOffset(50,50);
        this.player.setCollideWorldBounds(false);
        this.scene.physics.add.collider(this.player, this.scene.collide);

        this.scene.anims.create({
            key: 'idle',
            frames: [
                {key: 'player'},
            ],
            frameRate: 1,
            repeat: -1
        })

        this.scene.anims.create({
            key: 'run',
            frames: [
                {key:'run-1'},
                {key:'run-2'},
                {key:'run-3'},
                {key:'run-4'},
                {key:'run-5'},
                {key:'run-6'},
                {key:'run-7'},
                {key:'run-8'},
            ],
            frameRate: 6,
            repeat: -1});

        this.scene.anims.create({
            key: 'jump',
            frames: [
                {key:'jump-1'},
                {key:'jump-2'},
                {key:'jump-3'},
                {key:'jump-4'},
                {key:'jump-5'},
                {key:'jump-6'},
                {key:'jump-7'},
            ],
            frameRate: 5,
            repeat: 0});

        this.scene.anims.create({
            key: 'kick',
            frames: [
                {key:'kick-1'},
                {key:'kick-2'},
                {key:'kick-3'},
            ],
            frameRate: 9,
            repeat: 0});

    }

    jump(){
        this.player.setVelocityY(-450);
        //this.player.play('jump', true);
    }

    stop() {
        this.player.setVelocityX(0);
        if (this.player.body.onFloor()) {
            this.player.play('idle', true)
        }
    }
    runRight() {
        this.player.setVelocityX(250);
        this.player.setFlipX(false);
        if (this.player.body.onFloor()) {
            //this.player.play('run', true)
            }
        }

    runLeft()
        {
            this.player.setVelocityX(-450);
            if (this.player.body.onFloor()) {
               // this.player.play('run', true)
            }
            this.player.setFlipX(true);
        }
    kick(){
        //this.player.play('kick',true)
    }

}
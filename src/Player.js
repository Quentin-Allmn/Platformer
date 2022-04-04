class Player {

    constructor(Tableau) {
        this.scene = Tableau
        this.pousse=false
        this.player = this.scene.physics.add.sprite(100, 350, 'player');
        this.player.key=0
        this.player.setBounce(0.1).setVelocityX(0);
        this.scene.physics.add.collider(this.player, this.scene.platforms);
        this.scene.anims.create({
            key: 'walk',
            frames: this.scene.anims.generateFrameNames('player', {
                prefix: 'robo_player_',
                start: 2,
                end: 3,
            }),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'idle',
            frames: [{key: 'player', frame: 'robo_player_0'}],
            frameRate: 10,

        });
        this.scene.anims.create({
            key: 'jump',
            frames: [{key: 'player', frame: 'robo_player_1'}],
            frameRate: 10,
            repeat:-1,

        });

    }

    jump(){
        this.player.setVelocityY(-350);
        this.player.play('jump', true);
        console.log(this.player.key)
    }
    moveRight(){
        this.player.setVelocityX(200);
        this.player.setFlipX(false);
        if (this.player.body.onFloor()) {
            this.player.play('walk', true)}
    }
    moveLeft(){
        this.player.setVelocityX(-200);
        if (this.player.body.onFloor()) {
            this.player.play('walk', true)}
        this.player.setFlipX(true);
    }
    stop(){
        this.player.setVelocityX(0);
        if (this.player.body.onFloor()) {
            this.player.play('idle',true)
        }
    }



}
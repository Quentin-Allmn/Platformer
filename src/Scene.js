class Scene extends Phaser.Scene {

    preload() {

        this.load.image('background', 'assets/images/background.png');

        this.load.atlas('player', 'assets/images/kenney_player.png', 'assets/images/kenney_player_atlas.json');
        this.load.image('tiles', 'assets/tilesets/platformPack_tilesheet.png');

        this.load.tilemapTiledJSON('map', 'assets/tilemaps/level3.json');

        this.load.image('fireworks1','assets/images/fireworks1.png')
        this.load.image('fireworks2','assets/images/fireworks2.png')
        this.load.image('fireworks3','assets/images/fireworks3.png')
    }

    create() {

        const backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0);
        backgroundImage.setScale(4, 2);

        // chargement de la map
        const map = this.add.tilemap('map');
        // chargement du tileset
        const tileset = map.addTilesetImage(
            'platformPack_tilesheet',
            'tiles'
        );

        this.platforms = map.createStaticLayer('Platforms', tileset, 0, 0);
        this.platforms.setCollisionByProperty({collides:true});
        this.platforms.setCollisionByExclusion(-1, true);

        this.player = new Player(this)
        this.fireworks();

        this.cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.setRoundPixels(true);
        this.cameras.main.setBounds(0,0,10000,8000);
        this.cameras.main.startFollow(this.player.player);

        this.gameOver = false;
        this.gameOverText = this.add.text(640,360,'Game Over')
    }

    fireworks() {

        const firework = this.physics.add.group();

        const fireworksList = ['fireworks1', 'fireworks2', 'fireworks3']

        const fireworksGen = () => {
            const xCoord = Math.random() * 3000
            let randomfireworks = fireworksList[Math.floor(Math.random() * 3)]
            firework.create(xCoord, 10, randomfireworks)
        }

        const fireworksGenLoop = this.time.addEvent({
            delay: 500,
            callback: fireworksGen,
            loop: true,
        });


        this.physics.add.collider(firework, this.platforms, function (fireworks){
            fireworks.destroy();

        })

        this.physics.add.collider(this.player.player, firework, () => {
            fireworksGenLoop.destroy();
            this.physics.pause();

            this.add.text(280, 150, 'Game Over', { fontSize: '15px', fill: '#000' })
        })
    }

    update() {

        if ((this.cursors.space.isDown || this.cursors.up.isDown) && this.player.player.body.onFloor()) {
            this.player.jump()
            console.log("oui")
        }
        if (this.cursors.left.isDown ){
            this.player.runLeft();
        }
        else if (this.cursors.right.isDown){
            this.player.runRight();
        }
        else {
            this.player.stop();
        }
    }

}

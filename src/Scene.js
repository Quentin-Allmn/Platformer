class Scene extends Phaser.Scene {

    preload() {

        this.load.image('background', 'assets/images/background.png');

        this.load.atlas('player', 'assets/images/kenney_player.png', 'assets/images/kenney_player_atlas.json');
        this.load.image('tiles', 'assets/tilesets/platformPack_tilesheet.png');

        this.load.tilemapTiledJSON('map', 'assets/tilemaps/level1.json');


        this.load.image('fireworks1','assets/images/fireworks1.png')
        this.load.image('fireworks2','assets/images/fireworks2.png')
        this.load.image('fireworks3','assets/images/fireworks3.png')
    }

    create() {

        const backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0);
        backgroundImage.setScale(2, 0.8);

        // chargement de la map
        const map = this.add.tilemap('map');
        // chargement du tileset
        const tileset = map.addTilesetImage(
            'platformPack_tilesheet',
            'tiles'
        );

        this.platforms = map.createStaticLayer('Platforms', tileset, 0, -1228);
        this.platforms.setCollisionByProperty({collides:true});
        this.platforms.setCollisionByExclusion(-1, true);

        this.player = new Player(this)

        this.cursors = this.input.keyboard.createCursorKeys();
        this.cameras.main.startFollow(this.player.player);

        this.fireworks();

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

        this.physics.add.collider(this.player, firework, () => {
            fireworksGenLoop.destroy();
            this.physics.pause();
        })
    }

    update() {

        if ((this.cursors.space.isDown || this.cursors.up.isDown) && this.player.player.body.onFloor()) {
            this.player.jump()
            console.log("oui")
        }
        if (this.cursors.left.isDown) {
            this.player.moveLeft()
        } else if (this.cursors.right.isDown) {
            this.player.moveRight()
        } else {
          this.player.stop();
        }
        if ((this.cursors.shift.isDown && this.cursors.left.isDown )&& this.player.player.body.onFloor()){
            this.player.runLeft();
        }
        else if ((this.cursors.shift.isDown && this.cursors.right.isDown)&& this.player.player.body.onFloor()){
            this.player.runRight();
        }
    }

}

class Scene extends Phaser.Scene {

    preload() {

        this.load.image('background', 'assets/images/background.png');

        this.load.atlas('player', 'assets/images/kenney_player.png', 'assets/images/kenney_player_atlas.json');
        this.load.image('tiles', 'assets/tilesets/platformPack_tilesheet.png');

        this.load.tilemapTiledJSON('map', 'assets/tilemaps/level3.json');

        this.load.image('fireworks1','assets/images/fireworks1.png')
        this.load.image('fireworks2','assets/images/fireworks2.png')
        this.load.image('fireworks3','assets/images/fireworks3.png')

        this.load.image('destructible','assets/images/destructible.png')
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
        this.platforms.setCollisionByProperty({collides: true});
        this.platforms.setCollisionByExclusion(-1, true);

        this.player = new Player(this)

        this.cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.setRoundPixels(true);
        this.cameras.main.setBounds(0, 0, 10000, 8000);
        this.cameras.main.startFollow(this.player.player);

        this.destructible = this.physics.add.group({
            allowGravity: false,
            immovable: true
        })
        map.getObjectLayer('destructible').objects.forEach((destructible) => {
            const destructibleSprite = this.destructible.create(destructible.x, destructible.y - 200, 'destructible').setOrigin(0).destructible = 1;
        });

        this.physics.add.collider(this.destructible, this.player.player);

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

        this.physics.add.collider(firework, this.destructible,  (un,deux)=>{
            un.destroy();
            deux.destroy();

        })

        this.physics.add.collider(this.player.player, firework, () => {
            fireworksGenLoop.destroy();
            this.physics.pause();

            alert("GAME OVER !!!");
            location.reload();
            this.add.text(280, 150, 'Game Over', { fontSize: '32px', fill: '#000' })
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

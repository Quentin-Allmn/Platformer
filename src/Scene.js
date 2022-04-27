class Scene extends Phaser.Scene {

    preload() {

        this.load.image('background', 'assets/images/background.png');

        this.load.atlas('player', 'assets/images/kenney_player.png', 'assets/images/kenney_player_atlas.json');
        this.load.image('tiles', 'assets/tilesets/platformPack_tilesheet.png');

        this.load.tilemapTiledJSON('map', 'assets/tilemaps/level3.json');

        this.load.image('fireworks1','assets/images/fireworks1.png')
        this.load.image('fireworks2','assets/images/fireworks2.png')
        this.load.image('fireworks3','assets/images/fireworks3.png')

        this.load.image('smoke','assets/images/particles/rising-smoke.png')
        this.load.atlas('flares', 'assets/images/particles/flares.png', 'assets/images/particles/flares.json');

        this.load.image('destructible','assets/images/destructible.png')
        this.load.image('invisible','assets/images/Invisible.png')

    }

    create() {

        // Background

        const backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0);
        backgroundImage.setScale(6, 2);

        // chargement de la map
        const map = this.add.tilemap('map');
        // chargement du tileset
        const tileset = map.addTilesetImage(
            'platformPack_tilesheet',
            'tiles'
        );

        // Troisieme Plan

        const troisiemePlan = map.createLayer('troisiemePlan',tileset, 0, 200);
        troisiemePlan.srollFactorX = 0.55;

        // Second Plan

        const secondPlan = map.createLayer('secondPlan',tileset, 0, 200);
        secondPlan.srollFactorX = 0.65;


        this.platforms = map.createStaticLayer('Platforms', tileset, 0, 100);
        this.platforms.setCollisionByProperty({collides: true});
        this.platforms.setCollisionByExclusion(-1, true);
        this.platforms.srollFactorX = 1;

        this.player = new Player(this)

        this.cursors = this.input.keyboard.createCursorKeys();

        // Platformes Destructibles

        this.destructible = this.physics.add.group({
            allowGravity: false,
            immovable: true
        })
        map.getObjectLayer('destructible').objects.forEach((destructible) => {
            const destructibleSprite = this.destructible.create(destructible.x, destructible.y - 200, 'destructible').setOrigin(0).destructible = 1;
        });

        this.physics.add.collider(this.destructible, this.player.player);


        // Murs Invisibles

        this.invisible = this.physics.add.group({
            allowGravity: false,
            immovable: true
        })

        map.getObjectLayer('invisible').objects.forEach((invisible) => {
            const InvisibleSprite = this.invisible.create(invisible.x, invisible.y, 'invisible').setOrigin(0).visible = false ;
        });
        this.physics.add.collider(this.player.player, this.invisible);

        // Camera

        this.cameras.main.setRoundPixels(true);
        this.cameras.main.setBounds(0, 0, 9000, 1152);
        this.cameras.main.startFollow(this.player.player);
        this.cameras.main.setAngle(-8);

        // Fireworks

        this.particles();

        this.fireworks();

    }

    particles(){

        var particles = this.add.particles('flares');

        var emitter1 = particles.createEmitter({
            frame: 'blue',
            x: 725,
            y: 900,
            speed: 200,
            blendMode: 'ADD',
            lifespan: 150
        });

        var emitter2 = particles.createEmitter({
            frame: 'red',
            x: 725,
            y: 900,
            speed: 200,
            scale: 0.5,
            blendMode: 'ADD',
            lifespan: 250
        });

        var emitter3 = particles.createEmitter({
            frame: 'yellow',
            x: 725,
            y: 900,
            speed: 200,
            scale: { min: 0, max: 1 },
            blendMode: 'ADD',
            lifespan: 450
        });

    }

    fireworks() {

        const firework = this.physics.add.group();

        const fireworksList = ['fireworks1', 'fireworks2', 'fireworks3']

        const fireworksGen = () => {
            const xCoord = Math.random() * 5000
            let randomfireworks = fireworksList[Math.floor(Math.random() * 3)]
            firework.create(xCoord, 10, randomfireworks);

            this.particles = this.add.particles('smoke');

            this.particles.createEmitter({
                alpha: { start: 1, end: 0 },
                scale: { start: 0.5, end: 2.5 },
                //tint: { start: 0xff945e, end: 0xff945e },
                rotate: { min: -180, max: 180 },
                lifespan: { min: 1000, max: 1100 },
                blendMode: 'ADD',
                frequency: 111110,
                maxParticles: 10,
                follow: firework
            });

        }

        const fireworksGenLoop = this.time.addEvent({
            delay: 450,
            callback: fireworksGen,
            loop: true,
        });

        this.physics.add.collider(firework, this.platforms, function (fireworks){
            fireworks.destroy();
        })

        this.physics.add.collider(firework, this.destructible,  (un,deux)=>{
            this.cameras.main.shake(0.05, 500);
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

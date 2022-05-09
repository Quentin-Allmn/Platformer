class Scene extends Phaser.Scene {

    constructor (){
        super("playGame")
    }

    preload() {

        this.load.image('background', 'assets/images/background.png');
        this.load.image('sky2','assets/images/background/Sky2.png');

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
        this.load.image('save', 'assets/images/Save.png');

        this.load.image('enemy','assets/images/player.png');

        for (let i = 1; i <= 8; i++) {
            this.load.image('red-' + i, 'assets/images/Fireworks/red-' + i + '.png');
        }

    }

    create() {

        this.options = new SceneOptions(this);

        if (this.options.diffHard === false){
            console.log("la c'est normal")
        }
        if (this.options.diffHard === true){
            console.log("la c'est Hard")
        }

        // Background

        const backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0);
        backgroundImage.setScale(18, 1.75);

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

        // palyer
        this.player = new Player(this)

        this.cursors = this.input.keyboard.createCursorKeys();

        this.currentSaveX = 0;
        this.currentSaveY = 0;

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

        this.cameras.main.setBounds(0, 0, 17920, 1152);
        this.cameras.main.startFollow(this.player.player);
        this.cameras.main.setAngle(-8);
        this.cameras.main.setRoundPixels(true);

        // Fireworks

        this.fwDelay = 200;
        this.fireworks();

        // Mode Normal

        if ( this.options.diffHard === false ) {
            console.log("Normal")
            this.vie = 3;
            this.add.text(120,40,this.vie,{ color: '#FFC100', fontSize: '20px' });

            while (this.vie > 0) {

                this.saves = this.physics.add.group({
                    allowGravity: false,
                    immovable: true
                });

                map.getObjectLayer('Save').objects.forEach((save) => {
                    const saveSprite = this.saves.create(save.x, save.y , 'save').setOrigin(0);
                });
                this.physics.add.overlap(this.player.player, this.saves, this.sauvegarde, null, this)

                this.cursors = this.input.keyboard.createCursorKeys();
                this.cameras.main.startFollow(this.player.player);

            }
            this.scene.start("GameOver")
        }
        if (this.options.diffHard === true) {
            console.log("Hard")
        }


        //Enemy

        this.Rkick = false;

        this.enemy = this.physics.add.sprite(17800, 500, "enemy")
        //this.enemy.setCollideWorldBounds(true);
        //this.enemy.setDepth(0);
        this.enemy.body.setImmovable(false)
        //this.enemy.hp = 100;
        this.physics.add.collider(this.player.player, this.enemy, () => {
            this.enemy.body.setImmovable(true)
            this.Rkick = true;
        })
        this.physics.add.collider(this.platforms, this.enemy, () => {

        })
        this.physics.add.collider(this.invisible, this.enemy, () => {

        })

}

    sauvegarde(player, saves) {
    console.log("current", this.currentSaveX, this.currentSaveY)
    this.currentSaveX = player.x
      this.currentSaveY = player.y
      saves.body.enable = false;
      this.currentKey = player.key
    }

    checkFw(player){
        if (player < 900){
            this.fwDelay = 300;
        }
        if (player > 900){
            this.fwDelay = 200;
        }
        if (player > 10240){
            this.fwDelay = this.fwDelay - 50;
        }
        if (player > 14080){
            this.fwDelay = this.fwDelay - 50;
        }
    }

    fireworks() {

        const firework = this.physics.add.group();

        const fireworksList = ['fireworks1', 'fireworks2', 'fireworks3']

        const fireworksGen = () => {
            const xCoord = Math.random() * 17920
            let randomfireworks = fireworksList[Math.floor(Math.random() * 3)]
            firework.create(xCoord, 10, randomfireworks);

        }

        const fireworksGenLoop = this.time.addEvent({
            delay:  this.fwDelay,
            callback: fireworksGen,
            loop: true,
        });

        this.physics.add.collider(firework, this.platforms, function (fireworks){
            //console.log(fireworks.body.x,fireworks.body.y)
            //
            // this.FwRed = this.add.sprite(fireworks.body.x,fireworks.body.y, 'red-').setOrigin(0, 0);
            //
            // this.anims.create({
            //     key: 'Red',
            //     frames: [
            //         {key: 'red-1'},
            //         {key: 'red-2'},
            //         {key: 'red-3'},
            //         {key: 'red-4'},
            //         {key: 'red-5'},
            //         {key: 'red-6'},
            //         {key: 'red-7'},
            //         {key: 'red-8'},
            //     ],
            //     frameRate: 12,
            //     // repeat: -1
            // });
            // this.FwRed.play('Red')

            fireworks.destroy();
            //this.fX = fireworks.body.x;
            //this.fY = fireworks.body.y;
           // this.particles();
        })

        this.physics.add.collider(firework, this.destructible,  (un,deux)=>{
            this.cameras.main.shake(1000, 0.005);
            console.log("shake")
            //console.log(un.body.x,un.body.y)
            un.destroy();
            deux.destroy();
        })

        this.physics.add.collider(this.player.player, firework, () => {
            //fireworksGenLoop.destroy();
            //this.physics.pause();

            this.scene.start("GameOver")

            this.vie -= 1;
            console.log("Game Over")

            if (this.options.diffHard === true) {
                this.scene.start("GameOver")
            }
            //alert("GAME OVER !!!");
           // location.reload();
            //this.add.text(280, 150, 'Game Over', { fontSize: '32px', fill: '#000' })
        })

    }

    update() {

        console.log("player",this.player.player.x,"y",this.player.player.y)

        this.checkFw(this.player.player.x)

        if (this.cursors.up.isDown && this.player.player.body.onFloor()) {
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
        if (this.cursors.down.isDown){
            this.cameras.main.shake(0.05, 500);
        }
        if (this.cursors.space.isDown && this.Rkick === true){
            console.log("Kick");
            this.enemy.destroy();
            this.scene.start("Victory");
        }
       //   console.log("Delay",this.fwDelay)
    }

}

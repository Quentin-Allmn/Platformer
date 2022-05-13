class Scene extends Phaser.Scene {

    constructor (){
        super("playGame")
    }

    preload() {

        this.load.image('background', 'assets/images/backgroundN.png');
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

        // Fireworks

        for (let i = 1; i <= 9; i++) {
            this.load.image('yellow-' + i, 'assets/images/Fireworks/yellow/yellow-' + i + '.png');
        }

        for (let i = 1; i <= 9; i++) {
            this.load.image('red-' + i, 'assets/images/Fireworks/red/red-' + i + '.png');
        }

        for (let i = 1; i <= 9; i++) {
            this.load.image('blue-' + i, 'assets/images/Fireworks/blue/blue-' + i + '.png');
        }

        for (let i = 1; i <= 9; i++) {
            this.load.image('green-' + i, 'assets/images/Fireworks/green/green-' + i + '.png');
        }

        for (let i = 1; i <= 9; i++) {
            this.load.image('pink-' + i, 'assets/images/Fireworks/pink/pink-' + i + '.png');
        }

    }

    create() {

        let me = this;

        console.log(diffHard)

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

        this.currentSaveX = 720;
        this.currentSaveY = 200;

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
        this.vie = 3;

        if (diffHard === false ) {
            console.log("Normal")
            this.add.text(120,40,this.vie,{ color: '#FFC100', fontSize: '20px' });


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

        if (this.diffHard === true) {
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

        this.FwYellow = this.add.sprite(10,10, 'yellow-');
        this.FwYellow.setScale(2);

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

        this.anims.create({
            key: 'red',
            frames: [
                {key: 'red-1'},
                {key: 'red-2'},
                {key: 'red-3'},
                {key: 'red-4'},
                {key: 'red-5'},
                {key: 'red-6'},
                {key: 'red-7'},
                {key: 'red-8'},
                {key: 'red-9'},
            ],
            frameRate: 12,
        });

        this.anims.create({
            key: 'blue',
            frames: [
                {key: 'blue-1'},
                {key: 'blue-2'},
                {key: 'blue-3'},
                {key: 'blue-4'},
                {key: 'blue-5'},
                {key: 'blue-6'},
                {key: 'blue-7'},
                {key: 'blue-8'},
                {key: 'blue-9'},
            ],
            frameRate: 12,
        });

        this.anims.create({
            key: 'green',
            frames: [
                {key: 'green-1'},
                {key: 'green-2'},
                {key: 'green-3'},
                {key: 'green-4'},
                {key: 'green-5'},
                {key: 'green-6'},
                {key: 'green-7'},
                {key: 'green-8'},
                {key: 'green-9'},
            ],
            frameRate: 12,
        });

        this.anims.create({
            key: 'pink',
            frames: [
                {key: 'pink-1'},
                {key: 'pink-2'},
                {key: 'pink-3'},
                {key: 'pink-4'},
                {key: 'pink-5'},
                {key: 'pink-6'},
                {key: 'pink-7'},
                {key: 'pink-8'},
                {key: 'pink-9'},
            ],
            frameRate: 12,
        });

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

        let me = this;

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
            console.log(fireworks.body.x,fireworks.body.y)
            me.FwYellow.setPosition(fireworks.body.x - 32,fireworks.body.y + 64);

            var randomColor = Phaser.Math.Between(1, 5);

            switch (randomColor) {
                case 1:
                    me.FwYellow.setTexture('yellow')
                    me.FwYellow.play('yellow')
                    break
                case 2:
                    me.FwYellow.setTexture('blue')
                    me.FwYellow.play('blue')
                    console.log('blue')
                    break
                case 3:
                    me.FwYellow.setTexture('pink')
                    me.FwYellow.play('pink')
                    console.log('pink')
                    break
                case 4:
                    me.FwYellow.setTexture('red')
                    me.FwYellow.play('red')
                    console.log('red')
                    break
                case 5:
                    me.FwYellow.setTexture('green')
                    me.FwYellow.play('green')
                    console.log('green')
                    break
            }
            //me.FwYellow.play('red')

            fireworks.destroy();
        })

        this.physics.add.collider(firework, this.destructible,  (un,deux)=>{
            this.cameras.main.shake(1000, 0.005);
            console.log("shake")
            me.FwYellow.setPosition(un.body.x,un.body.y);

            me.FwYellow.play('yellow')
            //console.log(un.body.x,un.body.y)
            un.destroy();
            deux.destroy();
        })

        this.physics.add.collider(this.player.player, firework, (player,firework) => {
            firework.destroy();
            this.vie -= 1;

            this.player.player.x = this.currentSaveX;
            this.player.player.y = this.currentSaveY;

            if (this.vie < 0){
                this.scene.start("GameOver")
            }

            if (diffHard === true) {
                this.scene.start("GameOver")
            }
            //alert("GAME OVER !!!");
           // location.reload();
            //this.add.text(280, 150, 'Game Over', { fontSize: '32px', fill: '#000' })
        })

    }

    update() {

        //console.log("player",this.player.player.x,"y",this.player.player.y)

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

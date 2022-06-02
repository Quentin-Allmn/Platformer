class Scene extends Phaser.Scene {

    constructor (){
        super("playGame")
    }

    preload() {

        this.load.image('background', 'assets/images/backgroundN.png');
        this.load.image('sky2','assets/images/Background/Sky4.png');

        this.load.atlas('player', 'assets/images/kenney_player.png', 'assets/images/kenney_player_atlas.json');
        this.load.image('tiles', 'assets/tilesets/Tileset_test.png');
        this.load.image('tilesSky', 'assets/tilesets/Sky4.png');

        this.load.tilemapTiledJSON('carte', 'assets/tilemaps/level3.json');

        this.load.image('fireworks1','assets/images/fireworks1.png')
        this.load.image('fireworks2','assets/images/fireworks2.png')
        this.load.image('fireworks3','assets/images/fireworks3.png')

        this.load.image('smoke','assets/images/particles/cloud.png')
        this.load.image('blue','assets/images/particles/blue.png')
        this.load.atlas('flares', 'assets/images/particles/flares.png', 'assets/images/particles/flares.json');

        this.load.image('destructible','assets/images/destructible.png')
        this.load.image('invisible','assets/images/Invisible.png')
        this.load.image('save', 'assets/images/Save.png');

        this.load.image('vie', 'assets/images/UI/Vie/UI-Vie2.png');

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

        this.load.image('spark', 'assets/images/particles/blue.png');

    }

    create() {

        let me = this;

        this.saut = false;

        console.log(diffHard)

        // Background

        // const backgroundImage = this.add.image(0, 40, 'sky2').setOrigin(0, 0).setDepth(-2);
        // backgroundImage.setScale(1, 1);
        // //backgroundImage.setAngle(8);


        // chargement de la map
        const map = this.add.tilemap('carte');
        console.log("map")
        // chargement du tileset
        const tileset = map.addTilesetImage(
            'Tileset_test',
            'tiles'
        );
        const tilesetSky = map.addTilesetImage(
            'Sky4',
            'tilesSky'
        );

        this.Sky = map.createLayer('Sky', tilesetSky, 0, 100).setDepth(-2);
        this.Sky.srollFactorX = 1;

        this.platforms = map.createStaticLayer('Platforms', tileset, 0, 100);
        // this.platforms.setCollisionByProperty({collides: true});
        // this.platforms.setCollisionByExclusion(-1, true);
        this.platforms.srollFactorX = 1;

        this.platforms3 = map.createStaticLayer('Platforms3', tileset, 0, 100);
        // this.platforms3.setCollisionByProperty({collides: true});
        // this.platforms3.setCollisionByExclusion(-1, true);
        this.platforms3.srollFactorX = 1;

        this.platforms2 = map.createStaticLayer('Platforms2', tileset, 0, 100);
        // this.platforms2.setCollisionByProperty({collides: true});
        // this.platforms2.setCollisionByExclusion(-1, true);
        this.platforms2.srollFactorX = 1;

        this.bois = map.createStaticLayer('Bois', tileset, 0, 100);
        // this.bois.setCollisionByProperty({collides: true});
        // this.bois.setCollisionByExclusion(-1, true);
        this.bois.srollFactorX = 1;

        this.bois2 = map.createStaticLayer('Bois2', tileset, 0, 100);
        // this.bois2.setCollisionByProperty({collides: true});
        // this.bois2.setCollisionByExclusion(-1, true);
        this.bois2.srollFactorX = 1;

        this.arbre = map.createLayer('Arbre', tileset, 0, 100);
        // this.bois2.setCollisionByProperty({collides: true});
        // this.bois2.setCollisionByExclusion(-1, true);

        // player
        this.player = new Player(this)

        this.cursors = this.input.keyboard.createCursorKeys();

        this.currentSaveX = 720;
        this.currentSaveY = 900;

        this.kick = false;

        this.collide = this.physics.add.group({
            allowGravity: false,
            immovable: true,
        });
        map.getObjectLayer('Collider').objects.forEach((col) => {
            this.collideSprite = this.collide.create(col.x, col.y+90, col.height).setOrigin(0,0).setDisplaySize(col.width,col.height).visible=false;
            this.physics.add.collider(this.collide, this.collideSprite)
        });

        this.physics.add.collider(this.collide, this.player.player);

        // Platformes Destructibles

        this.destructible = this.physics.add.group({
            allowGravity: false,
            immovable: true
        })
        map.getObjectLayer('destructible').objects.forEach((destructible) => {
            const destructibleSprite = this.destructible.create(destructible.x, destructible.y - 200, 'destructible').setOrigin(0).destructible = 1;
        });

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

        this.cameras.main.setBounds(0, 0, 35840, 1152);
        this.cameras.main.startFollow(this.player.player);
        this.cameras.main.setAngle(-8);
        this.cameras.main.setRoundPixels(true);

        // Fireworks

        this.fwDelay = 250;
        this.fireworks();

        // Mode Normal
        window.vie = 3;

        if (diffHard === false ) {
            this.scene.setActive(true,'SceneUI');
            console.log("Normal")
           // this.add.text(120,40,this.vie,{ color: '#FFC100', fontSize: '20px' });

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

                this.scene.launch("SceneUI");

            }

        if (this.diffHard === true) {
            console.log("Hard")
        }

        //Enemy

        this.Rkick = false;

        this.enemy = this.physics.add.sprite(35700, 500, "enemy")
        //this.enemy.setCollideWorldBounds(true);
        //this.enemy.setDepth(0);
        this.enemy.body.setImmovable(false)
        //this.enemy.hp = 100;
        this.physics.add.collider(this.player.player, this.enemy, () => {
            if(me.kick === true)
            {
                me.enemy.body.setImmovable(true)
                me.enemy.body.setVelocityY(150);
                me.Rkick = true;
            }
        })
        this.physics.add.collider(this.collide, this.enemy, () => {

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

        var particleJump = this.add.particles('smoke')

        particleJump.createEmitter({
            //x: this.player.player.x - 64,
            y: this.player.player.y + 32,
            speed: {min: 0, max: 170},
            angle: {min: 0, max: 190},
            gravityY: 300,
            scale: {start : 0.1, end: 0.4, ease: 'Back.easeln'},
            alpha: {start: 0.8, end: 0},
            lifespan: 500,
            //follow : this.player.player,
        })

        //particleJump.pause();


        this.physics.add.collider(this.player.player, this.destructible, (player,destructible) => {
            console.log("collide")
            if (this.kick === true){
                destructible.destroy()
            }
        })
}

    sauvegarde(player, saves) {
    console.log("current", this.currentSaveX, this.currentSaveY)
    this.currentSaveX = player.x
      this.currentSaveY = player.y
      saves.body.enable = true;
      this.currentKey = player.key
    }

    fireworks() {

        let me = this;

        const firework = this.physics.add.group();

        const fireworksList = ['fireworks1', 'fireworks2', 'fireworks3']

        const fireworksGen = () => {
            const xCoord = Math.random(this.player.player.x - 10) * (this.player.player.x + 1000)
            let randomfireworks = fireworksList[Math.floor(Math.random() * 3)]
            var monfirework = firework.create(xCoord, 1500, randomfireworks).setDepth(-1);

            // firework.create(xCoord, 900, randomfireworks);
            // monfirework.setVelocityY(Math.random() * 1000 - 500);
            // monfirework.setGravity(0);
            monfirework.setVelocityY(-1250);
            monfirework.setFlipY(true);
            monfirework.setAlpha(0.5);
            monfirework.setScale(0.75);

            var particleSmoke = this.add.particles('smoke').setDepth(-1);

            particleSmoke.createEmitter({
                speed: {max: 0, min: 0},
                rotate:{max : -360, min : 360},
                frequency: 0.05,
                scale: {start : 0.2, end: 0.05},
                lifespan: 500,
                alpha: {start: 0.5,end: 0.2},
                follow : monfirework,
                blendMode: "ADD",
                //tint: 0xffffff,
                life: 1000,

            })

            var particleFire = this.add.particles('blue').setDepth(-1)

            particleFire.createEmitter({
                speed: {max: 0, min: 0},
                frequency: 1,
                scale: {start : 0.2, end: 0.1},
                lifespan: 75,
                alpha: {start: 1,end: 0.5},
                tint: {start: 0xff8000,end: 0xff7000},
                life: 1000,
                follow : monfirework,
            })

            //monfirework.body.setAllowGravity(false);
            this.time.delayedCall(2000,()=>{
                //monfirework.setVelocityY(1150);
                monfirework.setFlipY(false);
                monfirework.setAlpha(1);
                monfirework.setScale(1);
                this.physics.add.collider(monfirework, this.collide,  (fire)=>{
                            //console.log(fireworks.body.x,fireworks.body.y)

                            this.FwYellow.setPosition(fire.x - 32,fire.y + 64);
                            fire.destroy();
                            particleSmoke.destroy();
                            particleFire.destroy();

                            var randomColor = Phaser.Math.Between(1, 5);

                            switch (randomColor) {
                                case 1:
                                    this.FwYellow.setTexture('yellow')
                                    this.FwYellow.play('yellow')
                                    break
                                case 2:
                                    this.FwYellow.setTexture('blue')
                                    this.FwYellow.play('blue')
                                    console.log('blue')
                                    break
                                case 3:
                                    this.FwYellow.setTexture('pink')
                                    this.FwYellow.play('pink')
                                    console.log('pink')
                                    break
                                case 4:
                                    this.FwYellow.setTexture('red')
                                    this.FwYellow.play('red')
                                    console.log('red')
                                    break
                                case 5:
                                    this.FwYellow.setTexture('green')
                                    this.FwYellow.play('green')
                                    console.log('green')
                                    break
                            }
                })
                this.physics.add.collider(monfirework, this.player.player, (fire) => {

                                console.log("Hu")
                                vie -= 1;

                                particleSmoke.destroy();
                                particleFire.destroy();
                                fire.destroy();

                                this.player.player.x = this.currentSaveX;
                                this.player.player.y = this.currentSaveY;

                                // Flash player red
                                let tintTween = this.tweens.add({
                                    targets: this.player.player,
                                    duration: 200,
                                    tint: 0xff0000,
                                    callbackScope: this,
                                    loop : 2,
                                    onComplete: function(tween, sprites) {
                                        // Return to original color
                                        this.player.player.clearTint();
                                    }
                                });
                                if (vie <= 0){
                                    this.scene.start("GameOver")
                                }
                                if (diffHard === true) {
                                    this.scene.start("GameOver")
                                }
                            })
                this.physics.add.collider(monfirework, this.destructible,  (un,deux)=>{
                                this.cameras.main.shake(1000, 0.004);
                                console.log("shake")

                                this.FWred = this.add.sprite(un.x,un.y, 'red-');
                                this.FWred.setScale(2);
                                this.FWred.play('red')

                                //console.log(un.body.x,un.body.y)
                                un.destroy();
                                deux.destroy();
                                particleSmoke.destroy();
                                particleFire.destroy();
                            })
            });
        }

        const fireworksGenLoop = this.time.addEvent({
            delay : 1000,
            callback: fireworksGen,
            loop: true,
        });

        var delay = fireworksGenLoop.delay;

        console.log(delay)

        //fireworksGenLoop.timer.timerEvent.delay = this.fwDelay;

        var particles = this.add.particles('rising-smoke.png');

    }

    update() {

            if (this.player.player.x < 900){
                this.fwDelay = 40000;
            }
            if (this.player.player.x > 900){
                this.fwDelay = 4000;
            }
            if (this.player.player.x > 10240){
                this.fwDelay = this.fwDelay - 1000;
            }
            if (this.player.player.x > 14080){
                this.fwDelay = this.fwDelay - 2000;
            }
            if (this.player.player.x > 17920){
                this.fwDelay = this.fwDelay - 550;
            }
            if (this.player.player.x > 26780){
                this.fwDelay = this.fwDelay - 550;
            }

        if (this.cursors.up.isDown && this.player.player.body.onFloor() && this.saut === false) {
            this.player.jump()
            console.log("oui")
            this.saut = true;
            //particleJump.play();
        }

        if (this.cursors.up.isUp){
            this.saut = false;
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
        if (this.cursors.space.isDown){
            console.log(this.kick)
            this.kick = true;
        }

        if (this.cursors.space.isUp){
            console.log(this.kick)
            this.kick = false;
        }

        if (this.player.player.x <= 725){
            this.player.player.setX(725)
        }

        console.log("delay",this.fwDelay)
    }

}
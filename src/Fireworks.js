class Fireworks {

    preload(){
        this.load.image('fireworks1','assets/images/fireworks1.png')
        this.load.image('fireworks2','assets/images/fireworks2.png')
        this.load.image('fireworks3','assets/images/fireworks3.png')
    }

    fireworks() {

        // Fireworks à mettre dans une classe
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

}
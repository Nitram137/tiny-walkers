class Game extends Phaser.Scene {

    constructor () {
        super();
    }

    preload () {
        this.load.spritesheet("midget", "assets/sprites/midget.png", 
        {frameWidth: 390, frameHeight: 429});
    }
    
    create () {
        
        const midget = this.add.sprite(300, 400, 'midget').setScale(1);
    
        this.anims.create({
            key: "walk",
            frames: "midget",
            frameRate: 6,
            repeat: -1
        });
    
        midget.play("walk");
    }
    

}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: 0xccca3d,
    scene: [Game]
}

const game = new Phaser.Game(config);

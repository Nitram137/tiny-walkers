const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: 0x87ceeb,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 500 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}

var midget;
var platforms;

const game = new Phaser.Game(config);

function preload() {
    this.load.image("grass", "assets/sprites/grass.png")
    this.load.image("cloud", "assets/sprites/cloud.png")
    this.load.spritesheet("midget", "assets/sprites/midget.png", 
    {frameWidth: 390, frameHeight: 429});
}

function create() {

    platforms = this.physics.add.staticGroup();

    for (let i=0;i<4;i++) {
        platforms.create(100 + i * 200, 575, 'grass');
    }

    platforms.create(200, 150, 'cloud');
    platforms.create(430, 300, 'cloud');
    platforms.create(600, 220, 'cloud');
    platforms.create(50, 500, 'cloud');
    platforms.create(750, 500, 'cloud');
    
    midget = this.physics.add.sprite(150, 50, 'midget').setScale(0.15);

    this.physics.add.collider(midget, platforms)
    
    this.anims.create({
        key: "walk",
        frames: "midget",
        frameRate: 10,
        repeat: -1
    });

}

function update() {
    if (midget.body.touching.down) midget.anims.play("walk", true);
    else midget.anims.play("walk", false)

    if (midget.body.velocity.x === 0) midget.body.velocity.x = 100;

    if (midget.body.touching.left) {
        midget.body.velocity.x = 100;
        midget.flipX = false;
    }
    if (midget.body.touching.right) {
        midget.body.velocity.x = -100;
        midget.flipX = true;
    }
}

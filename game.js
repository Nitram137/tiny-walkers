const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: 0x87ceeb,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 300 }
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
    this.load.spritesheet("midget", "assets/sprites/midget.png", 
    {frameWidth: 390, frameHeight: 429});
}

function create() {

    platforms = this.physics.add.staticGroup();

    for (let i=0;i<4;i++) {
        platforms.create(100 + i * 200, 575, 'grass');
    }
    
    midget = this.physics.add.sprite(50, 500, 'midget').setScale(0.2);
    midget.setCollideWorldBounds(true);

    this.physics.add.collider(midget, platforms)

    this.anims.create({
        key: "walk",
        frames: "midget",
        frameRate: 10,
        repeat: -1
    });
}

function update() {
    midget.anims.play("walk", true);
    console.log(midget.body.left);
    if (midget.body.velocity.x === 0) midget.body.velocity.x = 100;
    if(midget.body.right >= config.width-1 || midget.body.left <= 1) {
        midget.body.velocity.x = -midget.body.velocity.x;
        midget.flipX = !midget.flipX;
    }
}

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

var midgets;
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

    platforms.create(50, 150, 'cloud');
    platforms.create(200, 150, 'cloud');
    platforms.create(430, 300, 'cloud');
    platforms.create(600, 220, 'cloud');
    platforms.create(50, 500, 'cloud');
    platforms.create(750, 500, 'cloud');

    midgets = this.physics.add.group();
    
    midgets.create(10, 50, 'midget').setScale(0.15);
    midgets.create(60, 50, 'midget').setScale(0.15);
    midgets.create(110, 50, 'midget').setScale(0.15);

    this.physics.add.collider(midgets, platforms)
    
    this.anims.create({
        key: "walk",
        frames: "midget",
        frameRate: 10,
        repeat: -1
    });

    console.log(midgets)
    for (let midget of midgets.children.entries) midget.setVelocityX(100);
}

function update() {
    for (let midget of midgets.children.entries){
        if (midget.body.touching.down) midget.anims.play("walk", true);
        else midget.anims.play("walk", false);

        if (midget.body.touching.left) {
            midget.body.velocity.x = 100;
            midget.flipX = false;
        }
        if (midget.body.touching.right) {
            midget.body.velocity.x = -100;
            midget.flipX = true;
        }
    }
}

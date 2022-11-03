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
var playBtn;
var secretBtn;
var tween;

const game = new Phaser.Game(config);

function preload() {
    this.load.image("grass", "assets/sprites/grass.png");
    this.load.image("cloud", "assets/sprites/cloud.png");
    this.load.image("play", "assets/sprites/play.png");
    this.load.image("title", "assets/sprites/title.png");
    this.load.spritesheet("midget", "assets/sprites/midget.png", 
    {frameWidth: 390, frameHeight: 429});
}

function create() {

    platforms = this.physics.add.staticGroup();

    spawnPlatforms();

    this.add.sprite(150, 150, 'title');

    playBtn = this.add.sprite(430, 300, 'play').setInteractive({cursor: 'pointer'});

    secretBtn = this.add.sprite(600, 220, 'cloud').setInteractive({cursor: 'pointer'});

    tween = this.tweens.add({
        targets: [playBtn],
        scaleX: 1.1,
        scaleY: 1.1,
        duration: 100,
        callbackScope: this,
    }).pause();
    
    playBtn.on('pointerover', () => {
        tween.play();
    })

    playBtn.on('pointerout', () => {
        tween.seek(0).pause();
    })

    playBtn.on('pointerup', () => {
        // load 1st level
    })

    secretBtn.on('pointerup', () => {
        spawnMidgets();
    })

    midgets = this.physics.add.group();

    spawnMidgets();

    this.physics.add.collider(midgets, platforms);

    this.time.addEvent({
        delay: 3000,
        callback: () => {
            spawnMidgets();
        },
        loop: true
    })
}

function update() {
    handleMidgetBehaviour();
}

function spawnPlatforms() {
    platforms.create(0, 485, 'grass');
    platforms.create(800, 485, 'grass');
    platforms.create(50, 530, 'grass');
    platforms.create(750, 530, 'grass');

    for (let i=0;i<4;i++) {
        if(i !== 2) platforms.create(100 + i * 200, 575, 'grass');
    }

    platforms.create(80, 150, 'cloud');
    platforms.create(230, 150, 'cloud');
    platforms.create(430, 300, 'cloud');
    platforms.create(600, 220, 'cloud');
}

function spawnMidgets() {
    midgets.create(5, 10, 'midget').setScale(0.1);

    for (let midget of midgets.children.entries) {
        if (midget.body.velocity.x === 0) midget.setVelocityX(100);
    }
}

function handleMidgetBehaviour() {
    game.anims.create({
        key: "walk",
        frames: "midget",
        frameRate: 10,
        repeat: -1
    });

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

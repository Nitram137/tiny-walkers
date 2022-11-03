class Level1 extends Phaser.Scene {

    constructor() {
        super({
            key: "Level1"
        });
    }

    preload() {
        this.load.image("grass", "assets/sprites/grass.png");
        this.load.image("cloud", "assets/sprites/cloud.png");
        this.load.spritesheet("midget", "assets/sprites/midget.png", 
        {frameWidth: 390, frameHeight: 429});
    }

    create() {
        this.platforms = this.physics.add.staticGroup();
        this.spawnPlatforms();

        this.midgets = this.physics.add.group();
    
        this.spawnMidgets();
    
        this.physics.add.collider(this.midgets, this.platforms);
    
        this.time.addEvent({
            delay: 3000,
            callback: () => {
                this.spawnMidgets();
            },
            loop: true
        })
        console.log(this.platforms);
    }

    update() {
        this.handleMidgetBehaviour();
    }

    spawnPlatforms() {
        for (let i=0;i<5;i++) {
            this.platforms.create(0, 60 + i * 120, 'grass');
            this.platforms.create(800, 60 + i * 120, 'grass');
            this.platforms.create(100 + i * 200, 575, 'grass').setDepth(1);
            for (let j=0;j<4;j++) {
                this.platforms.create(130 + i * 140, 110 + j * 120, 'cloud').setDepth(1);
            }
        }
    }

    spawnMidgets() {
        if (this.midgets.children.entries.length < 10)
        this.midgets.create(5, 10, 'midget').setScale(0.1);
    
        for (let midget of this.midgets.children.entries) {
            if (midget.body.velocity.x === 0) midget.setVelocityX(100);
        }
    }
    
    handleMidgetBehaviour() {
        this.anims.create({
            key: "walk",
            frames: "midget",
            frameRate: 10,
            repeat: -1
        });
    
        for (let midget of this.midgets.children.entries){
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
    
}

export default Level1;

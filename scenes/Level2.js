class Level2 extends Phaser.Scene {

    constructor() {
        super({
            key: "Level2"
        });
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
    }

    update() {
        this.handleMidgetBehaviour();
    }

    spawnPlatforms() {
        for (let i=0;i<3;i++){
            this.platforms.create(-20 + i * 90, 470, 'stone');
            this.platforms.create(230 + i * 90, 590, 'stone');
            this.platforms.create(500 + i * 90, 540, 'stone');
            this.platforms.create(500 + i * 90, 580, 'stone');
            this.platforms.create(770, 580 - i * 40, 'stone');
            this.platforms.create(810, 480 - i * 40, 'stone');
            this.platforms.create(810, 360 - i * 40, 'stone');
            this.platforms.create(400 + i * 90, 350, 'stone');
            this.platforms.create(210 + i * 90, 305, 'stone');
            this.platforms.create(0, 250 - i * 40, 'stone');
            this.platforms.create(40, 130 - i * 30, 'stone');
            this.platforms.create(40, 30 - i * 30, 'stone');
            this.platforms.create(80, 30 - i * 30, 'stone');
            this.platforms.create(80 + i * 90, 0, 'stone');
            this.platforms.create(350 + i * 90, 0, 'stone');
            this.platforms.create(580 + i * 90, 185, 'stone');
            this.platforms.create(800 - i * 20, 90 + i * 30, 'stone');
            this.platforms.create(760 + i * 20, 180 + i * 30, 'stone');
        }
    }

    spawnMidgets() {
        if (this.midgets.children.entries.length < 10)
        this.midgets.create(5, 420, 'midget').setScale(0.1);
    
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

export default Level2;

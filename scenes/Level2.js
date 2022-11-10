import { goToNextLevel, midgetCount } from "../utility/common.js";

class Level2 extends Phaser.Scene {

    constructor() {
        super({
            key: "Level2"
        });
        this.midgetsPassed = 0;
        this.midgetsFell = 0;
    }

    create() {
        this.platforms = this.physics.add.staticGroup();

        this.jellys = this.physics.add.staticGroup();

        this.spawnPlatforms();

        this.midgets = this.physics.add.group();
    
        this.spawnMidgets();

        this.handleArrow();
    
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
        goToNextLevel(this, 'Level3');
    }

    spawnPlatforms() {
        for (let i=0;i<3;i++){
            this.platforms.create(-20 + i * 90, 460 + i * 10, 'stone');
            this.platforms.create(230 + i * 90, 590, 'stone');
            this.platforms.create(500, 600 - i * 40, 'stone');
            this.platforms.create(580 + i * 90, 540, 'stone');
            this.platforms.create(580 + i * 90, 580, 'stone');
            this.platforms.create(770, 500 - i * 40, 'stone');
            this.platforms.create(820, 360 - i * 40, 'stone');
            this.platforms.create(400 + i * 90, 360 - i * 10, 'stone');
            this.platforms.create(190 + i * 90, 320, 'stone');
            this.platforms.create(0, 340 - i * 40, 'stone');
            this.platforms.create(0, 250 - i * 40, 'stone');
            this.platforms.create(40, 130 - i * 30, 'stone');
            this.platforms.create(40, 30 - i * 30, 'stone');
            this.platforms.create(80, 30 - i * 30, 'stone');
            this.platforms.create(80 + i * 90, 0, 'stone');
            this.platforms.create(350 + i * 90, 0 + i * 10, 'stone');
            this.platforms.create(580 + i * 90, 185, 'stone');
            this.platforms.create(800 - i * 20, 90 + i * 30, 'stone');
            this.platforms.create(760 + i * 20, 180 + i * 30, 'stone');
        }

        this.jellys.create(375, 585, 'jelly').setInteractive();
        this.jellys.create(650, 535, 'jelly').setInteractive();
        this.jellys.create(770, 400, 'jelly').setInteractive();
        this.jellys.create(385, 315, 'jelly').setInteractive();
        this.jellys.create(430, 345, 'jelly').setInteractive();
        this.jellys.create(210, 315, 'jelly').setInteractive();
        this.jellys.create(650, 180, 'jelly').setInteractive();
    }

    spawnMidgets() {
        if (this.midgets.children.entries.length < midgetCount)
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
    
        for (let midget of this.midgets.children.entries) {
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

            for (let jelly of this.jellys.children.entries) {
                jelly.on('pointerup', () => {
                    if(jelly.x - 50 < midget.x && jelly.x + 50 > midget.x && jelly.y - 50 < midget.y && jelly.y + 25 > midget.y) {
                        midget.body.velocity.y = -400;
                    }
                });
            }
        }
    }

    handleArrow() {
        this.arrow = this.physics.add.staticSprite(750, 30, 'arrow').setScale(0.1);

        this.tweens.add({
            targets: [this.arrow],
            x: 760,
            duration: 500,
            yoyo: true,
            repeat: -1,
            callbackScope: this,
        })
    }
}

export default Level2;

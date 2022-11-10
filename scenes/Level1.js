import { refreshMidgetCounter, goToNextLevel, midgetCount } from "../utility/common.js";

class Level1 extends Phaser.Scene {

    constructor() {
        super({
            key: "Level1"
        });
        this.midgetsPassed = 0;
        this.midgetsFell = 0;
    }

    create() {
        this.game.sound.stopAll();

        this.platforms = this.physics.add.staticGroup();
        this.clouds = this.physics.add.staticGroup();
        this.spawnPlatforms();

        this.handleArrow();

        this.midgets = this.physics.add.group();
    
        this.spawnMidgets();
    
        this.physics.add.collider(this.midgets, this.platforms);
        
        this.handleClouds();
    
        this.time.addEvent({
            delay: 2000,
            callback: () => {
                this.spawnMidgets();
            },
            loop: true
        })

    }

    update() {
        this.handleMidgetBehaviour();
        refreshMidgetCounter(this);
        goToNextLevel(this, 'Level2');
    }

    spawnPlatforms() {
        for (let i=0;i<5;i++) {
            if (i > 0) this.platforms.create(-40 + i * 15, -60 + i * 130, 'grass').setDepth(i);
            if (i > 0) this.platforms.create(-40 + i * 15, -15 + i * 130, 'grass').setDepth(i);
            if (i > 0) this.platforms.create(-40 + i * 15, 30 + i * 130, 'grass').setDepth(i);

            if (i < 4) this.platforms.create(755 + i * 15, 20 + i * 115, 'stone').setDepth(i);
            if (i < 4) this.platforms.create(755 + i * 15, 60 + i * 115, 'stone').setDepth(i);
            if (i < 4) this.platforms.create(755 + i * 15, 100 + i * 115, 'stone').setDepth(i);

            if (i !== 1 && i < 4) this.platforms.create(50 + i * 200, 575, 'grass').setDepth(6);
            if (i < 4) {
                for (let j=0;j<3;j++) {
                    if(i === 0 || i === 3) this.clouds.create(165 + i * 150 + 15 * j, 110 + j * 140, 'cloud').setInteractive();
                    else this.clouds.create(165 + i * 150 + 15 * j, 130 + j * 140, 'cloud').setInteractive();
                }
            }
        }
        this.platforms.create(480, 540, 'grass');
        this.platforms.create(795, 580, 'stone');
    }

    spawnMidgets() {
        if (this.midgets.children.entries.length < midgetCount)
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

    handleClouds() {
        this.cloudColliders = [];
        this.cloudFades = [];
        this.cloudAppears = [];

        this.clouds.children.entries.forEach((cloud, i) => {

            this.cloudColliders[i] = this.physics.add.collider(this.midgets, cloud);

            this.cloudFades[i] = this.tweens.add({
                targets: [cloud],
                alpha: 0,
                duration: 500,
                callBackScope: this,
            }).pause();

            this.cloudAppears[i] = this.tweens.add({
                targets: [cloud],
                alpha: 1,
                duration: 500,
                callBackScope: this,
            }).pause();
            
            cloud.on('pointermove', () => {
                this.cloudFades[i].play();
                this.cloudColliders[i].active = false;
            });
        
            cloud.on('pointerout', () => {
                this.cloudFades[i].pause();
                this.cloudAppears[i].play();
                this.cloudColliders[i].active = true;
            });
        })
    }

    handleArrow() {
        this.arrow = this.physics.add.staticSprite(750, 520, 'arrow').setScale(0.1);

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

export default Level1;

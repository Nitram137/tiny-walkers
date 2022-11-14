import { refreshMidgetCounter, goToNextLevel, spawnMidgets, handleArrow, handleMidgetBehaviour } from "../utility/common.js";

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
    
        spawnMidgets(this, 5, 420);

        handleArrow(this, 750, 30);
    
        this.physics.add.collider(this.midgets, this.platforms);

        this.time.addEvent({
            delay: 3000,
            callback: () => {
                spawnMidgets(this, 5, 420);
            },
            loop: true
        })
    }

    update() {
        handleMidgetBehaviour(this);
        refreshMidgetCounter(this);
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
}

export default Level2;

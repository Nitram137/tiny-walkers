import { goToNextLevel, spawnMidgets, handleArrow, handleMidgetBehaviour, handleCamera } from "../utility/common.js";

// TODO: particle effects, sound, dragon, magic
class Level5 extends Phaser.Scene {

    constructor() {
        super({
            key: "Level5"
        });
        this.midgetsPassed = 0;
        this.midgetsFell = 0;
    }

    create() {
        this.add.image(0, 0, 'tower_background').setOrigin(0, 0);

        this.camera = this.cameras.main;
        this.map = this.make.tilemap({ key: "tower" });
        
        this.camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.camera.setScroll(0, this.map.heightInPixels);

        this.tileset = this.map.addTilesetImage("dungeon_tiles");

        this.walls = this.map.createLayer("Walls", this.tileset, 0, 0);

        this.spawnClouds();

        this.midgets = this.physics.add.group();
    
        spawnMidgets(this, 8 * 50 , 63 * 50, 2000);
        
        this.walls.setCollisionByProperty({ collides: true });

        this.physics.add.collider(this.midgets, this.walls);

        this.physics.add.collider(this.midgets, this.clouds);

        handleCamera(this);

        this.purpleFume = this.add.particles("purple").createEmitter({
            x: 0,
            y: 0,
            speed: { min: 0, max: 50 },
            angle: { min: 0, max: 360 },
            scale: { start: 0, end: 1.5 },
            alpha: { start: 0.5, end: 0 },
            lifespan: 1000
        });
        this.purpleFume.reserve(1000);

        this.whiteStar = this.add.particles("star").createEmitter({
            x: 0,
            y: 0,
            speed: { min: -100, max: 100 },
            angle: { min: 0, max: 360 },
            scale: { min: 0.1, max: 0 },
            alpha: { min: 1, max: 0 },
            lifespan: 1000
        });
        this.whiteStar.reserve(1000);

        this.input.on('pointermove', (pointer) => {
            this.purpleFume.setPosition(pointer.worldX, pointer.worldY);
            this.whiteStar.setPosition(pointer.worldX, pointer.worldY);
        });
    }

    update() {
        handleMidgetBehaviour(this);
        for (let midget of this.midgets.children.entries) {
            if(!midget.input) {
                midget.setInteractive();
                midget.on('pointerover', () => {
                    midget.body.velocity.y = -300;
                })
            }
        }
    }

    spawnClouds() {
        this.clouds = this.physics.add.staticGroup();
        this.clouds.create(23 * 50, 44 * 50, 'dark_cloud');
        this.clouds.create(25 * 50, 43 * 50, 'dark_cloud');
        this.clouds.create(7 * 50, 36 * 50, 'dark_cloud');
        this.clouds.create(5 * 50, 35 * 50, 'dark_cloud');
        this.clouds.create(10 * 50, 35 * 50, 'dark_cloud');
        this.clouds.create(23 * 50, 26 * 50, 'dark_cloud');
        this.clouds.create(25 * 50, 25 * 50, 'dark_cloud');
        this.clouds.create(5 * 50, 14 * 50, 'dark_cloud');
        this.clouds.create(3 * 50, 13 * 50, 'dark_cloud');
        
    }

}

export default Level5;
import { goToNextLevel, spawnMidgets, handleArrow, handleMidgetBehaviour, handleCamera } from "../utility/common.js";

class Level5 extends Phaser.Scene {

    constructor() {
        super({
            key: "Level5"
        });
        this.midgetsPassed = 0;
        this.midgetsFell = 0;
    }

    create() {
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
    }

    update() {
        handleMidgetBehaviour(this);
    }

    spawnClouds() {
        this.clouds = this.physics.add.staticGroup();
        this.clouds.create(23 * 50, 44 * 50, 'dark_cloud').setInteractive();
        this.clouds.create(25 * 50, 43 * 50, 'dark_cloud').setInteractive();
        this.clouds.create(7 * 50, 40 * 50, 'dark_cloud').setInteractive();
        this.clouds.create(5 * 50, 39 * 50, 'dark_cloud').setInteractive();
        this.clouds.create(23 * 50, 26 * 50, 'dark_cloud').setInteractive();
        this.clouds.create(25 * 50, 25 * 50, 'dark_cloud').setInteractive();
        this.clouds.create(4 * 50, 9 * 50, 'dark_cloud').setInteractive();
        this.clouds.create(2 * 50, 8 * 50, 'dark_cloud').setInteractive();
        
    }

}

export default Level5;
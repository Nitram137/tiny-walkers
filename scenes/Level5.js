import { goToNextLevel, spawnMidgets, handleArrow, handleMidgetBehaviour, handleCamera } from "../utility/common.js";

class Level5 extends Phaser.Scene {

    constructor() {
        super({
            key: "Level5"
        });
        this.midgetsPassed = 0;
        this.midgetsFell = 0;
    }

    preload() {
        this.load.image("dungeon_tiles", "assets/tilemaps/dungeon.png");
        this.load.tilemapTiledJSON("tower", "assets/tilemaps/tower.json");
    }

    create() {
        this.camera = this.cameras.main;
        this.map = this.make.tilemap({ key: "tower" });
        
        this.camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.camera.setScroll(0, this.map.heightInPixels);

        this.tileset = this.map.addTilesetImage("dungeon_tiles");

        this.walls = this.map.createLayer("Walls", this.tileset, 0, 0);

        this.midgets = this.physics.add.group();
    
        spawnMidgets(this, 8 * 50 , 63 * 50, 2000);
        
        this.walls.setCollisionByProperty({ collides: true });

        this.physics.add.collider(this.midgets, this.walls);

        handleCamera(this);
    }

    update() {
        handleMidgetBehaviour(this);
    }

}

export default Level5;
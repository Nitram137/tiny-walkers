import { handleCamera, handleMidgetBehaviour, spawnMidgets } from "../utility/common.js";

class Won extends Phaser.Scene {

    constructor() {
        super({
            key: "Won"
        });
        this.midgetsPassed = 0;
        this.midgetsFell = 0;
    }

    create() {
        this.camera = this.cameras.main;
        this.map = this.make.tilemap({ key: "dinner" });
        
        this.camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        this.tileset = this.map.addTilesetImage("dungeon_tiles");

        this.walls = this.map.createLayer("Walls", this.tileset, 0, 0);

        this.midgets = this.physics.add.group();
    
        spawnMidgets(this, 0, 490, 2000);
        
        this.walls.setCollisionByProperty({ collides: true });

        this.physics.add.collider(this.midgets, this.walls);

        handleCamera(this);

    }

    update() {
        handleMidgetBehaviour(this);
    }

}

export default Won;
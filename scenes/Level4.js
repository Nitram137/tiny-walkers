import { goToNextLevel, spawnMidgets, handleArrow, handleMidgetBehaviour } from "../utility/common.js";

class Level4 extends Phaser.Scene {

    constructor() {
        super({
            key: "Level4"
        });
        this.midgetsPassed = 0;
        this.midgetsFell = 0;
    }

    preload() {
        this.load.image("dungeon_tiles", "assets/tilemaps/dungeon.png");
        this.load.tilemapTiledJSON("dungeon", "assets/tilemaps/dungeon.json");
    }

    create() {
        this.camera = this.cameras.main;
        this.map = this.make.tilemap({ key: "dungeon" });
        console.log(this);
        this.camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        this.tileset = this.map.addTilesetImage("dungeon_tiles");

        this.walls = this.map.createLayer("Walls", this.tileset, 0, 0);
        this.doors = this.map.createLayer("Doors", this.tileset, 0, 0);

        this.midgets = this.physics.add.group();
    
        spawnMidgets(this, 5, 100, 2000);
        
        this.walls.setCollisionByProperty({ collides: true });

        this.physics.add.collider(this.midgets, this.walls);

        this.input.on("pointermove", (pointer) => {
            if (!pointer.isDown) return;
        
            this.camera.scrollX -= (pointer.x - pointer.prevPosition.x) / this.camera.zoom;
            this.camera.scrollY -= (pointer.y - pointer.prevPosition.y) / this.camera.zoom;
        });

        this.input.on("wheel",  (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
            if (deltaY > 0) {
                var newZoom = this.camera.zoom - .05;
                if (newZoom > 0.6) {
                    this.camera.zoom = newZoom;     
                }
            }
          
            if (deltaY < 0) {
                var newZoom = this.camera.zoom + .05;
                if (newZoom < 1) {
                    this.camera.zoom = newZoom;     
                }
            }
          });
    }

    update() {
        handleMidgetBehaviour(this);
    }
}

export default Level4;
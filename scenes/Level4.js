import { refreshMidgetCounter, goToNextLevel, spawnMidgets, handleArrow, handleMidgetBehaviour } from "../utility/common.js";

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

        this.map = this.make.tilemap({ key: "dungeon" });

        this.tileset = this.map.addTilesetImage("dungeon_tiles");

        this.walls = this.map.createLayer("Walls", this.tileset, 0, 0);
        this.doors = this.map.createLayer("Doors", this.tileset, 0, 0);

        this.midgets = this.physics.add.group();
    
        spawnMidgets(this, 5, 100, 2000);
        console.log(this.walls)
        this.walls.setCollisionByProperty({ collides: true });

        this.physics.add.collider(this.midgets, this.walls);
    }

    update() {
        handleMidgetBehaviour(this);
        refreshMidgetCounter(this);
    }
}

export default Level4;
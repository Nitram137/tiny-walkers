import { handleMidgetBehaviour, refreshMidgetCounter, spawnMidgets } from "../utility/common.js";

class Level3 extends Phaser.Scene {

    constructor() {
        super({
            key: "Level3"
        });
    }

    preload() {
        this.load.image("tiles", "assets/tilemaps/tiles.png");
        this.load.tilemapTiledJSON("map", "assets/tilemaps/falls.json");
    }

    create() {

        const map = this.make.tilemap({ key: "map" });

        const tileset = map.addTilesetImage("tiles", "tiles");

        this.platforms = map.createLayer("Platforms", tileset, 0, 0);
        const waterfall = map.createLayer("Waterfall", tileset, 0, 0);

        this.midgets = this.physics.add.group();

        spawnMidgets(this, 5, 10);

        this.platforms.setCollisionByProperty({ collides: true });

        this.physics.add.collider(this.midgets, this.platforms);
    }

    update() {
        handleMidgetBehaviour(this);
        refreshMidgetCounter(this);
    }

}

export default Level3;
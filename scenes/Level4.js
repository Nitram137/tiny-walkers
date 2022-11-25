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

        this.add.image(0, 0, 'dungeon_background').setOrigin(0, 0);

        this.doorSound = this.sound.add('unlock');

        this.camera = this.cameras.main;
        this.map = this.make.tilemap({ key: "dungeon" });
        
        this.camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        this.tileset = this.map.addTilesetImage("dungeon_tiles");

        this.walls = this.map.createLayer("Walls", this.tileset, 0, 0);
        this.doors = this.map.createLayer("Doors", this.tileset, 0, 0);

        this.midgets = this.physics.add.group();
    
        spawnMidgets(this, 5, 100, 2000);
        
        this.walls.setCollisionByProperty({ collides: true });
        this.doors.setCollisionByProperty({ collides: true });

        this.physics.add.collider(this.midgets, this.walls);
        this.physics.add.collider(this.midgets, this.doors);

        // open doors randomly at start
        this.doors.forEachTile((door) => {
            if (door.properties.collides && Phaser.Math.Between(0, 1)) this.toggleDoor(door);
        })

        this.input.on('pointerup', function (pointer) {
            let clickedDoor = this.map.getTileAtWorldXY(pointer.worldX, pointer.worldY);
            if (clickedDoor) {
                this.doors.forEachTile((door) => {
                    if (door.properties.collides && (clickedDoor.x !== door.x || clickedDoor.y !== door.y) && Phaser.Math.Between(0, 1)) this.toggleDoor(door);
                })
                this.toggleDoor(clickedDoor);
                this.doorSound.play();
            }
        }, this);

        this.handleCamera();

        handleArrow(this, 1380, 1350);
    }

    update() {
        handleMidgetBehaviour(this);
        goToNextLevel(this, 'MainMenu');
    }

    handleCamera() {
        this.input.on("pointermove", (pointer) => {
            if (!pointer.isDown) return;
        
            this.camera.scrollX -= (pointer.x - pointer.prevPosition.x) / this.camera.zoom;
            this.camera.scrollY -= (pointer.y - pointer.prevPosition.y) / this.camera.zoom;
        });

        this.input.on("wheel", (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
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

    toggleDoor(door) {
        if (door.alpha === 1) door.alpha = 0.5;
        else door.alpha = 1;
        door.collideUp = !door.collideUp;
    }
}

export default Level4;
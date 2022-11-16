import { goToNextLevel, handleMidgetBehaviour, refreshMidgetCounter, spawnMidgets } from "../utility/common.js";

class Level3 extends Phaser.Scene {

    constructor() {
        super({
            key: "Level3"
        });
    }

    preload() {
        this.load.image("tiles", "assets/tilemaps/tiles.png");
        this.load.tilemapTiledJSON("map", "assets/tilemaps/falls.json");
        this.load.audio("waterfall", "assets/sounds/waterfall.mp3");
        this.load.image("lilypads", "assets/sprites/lilypads.png");
    }

    create() {

        this.ambience = this.sound.add('waterfall');
        this.ambience.loop = true;

        this.map = this.make.tilemap({ key: "map" });

        this.tileset = this.map.addTilesetImage("tiles");

        this.platforms = this.map.createLayer("Platforms", this.tileset, 0, 0);
        this.waterfall = this.map.createLayer("Waterfall", this.tileset, 0, 0);

        this.lilypads = this.physics.add.staticGroup();

        this.midgets = this.physics.add.group();

        spawnMidgets(this, 5, 10, 1000);

        this.platforms.setCollisionByProperty({ collides: true });

        this.physics.add.collider(this.midgets, this.platforms);

        // waterfall effect
        this.time.addEvent({
            delay: 200,
            callback: () => {
                this.waterfall.culledTiles.forEach(tile => {
                    tile.flipX = !tile.flipX;
                });
            },
            loop: true
        })

        this.ambience.play();
        this.handleLilypads();
    }

    update() {
        handleMidgetBehaviour(this);
        refreshMidgetCounter(this);
        goToNextLevel(this, 'MainMenu');
    }

    handleLilypads() {
        this.lilypads.create(250, 125, "lilypads").setInteractive().setAlpha(0.5);
        this.lilypads.create(550, 125, "lilypads").setInteractive().setAlpha(0.5);
        this.lilypads.create(150, 375, "lilypads").setInteractive().setAlpha(0.5);
        this.lilypads.create(450, 375, "lilypads").setInteractive().setAlpha(0.5);

        this.padColliders = [];

        this.lilypads.children.entries.forEach((lilypad, i) => {

            this.padColliders[i] = this.physics.add.collider(this.midgets, lilypad);
            this.padColliders[i].active = false;

            lilypad.on('pointerdown', () => {
                lilypad.alpha = 1;
                this.padColliders[i].active = true;
            });

            lilypad.on('pointerup', () => {
                lilypad.alpha = 0.5;
                this.padColliders[i].active = false;
            });
        })
    }

}

export default Level3;
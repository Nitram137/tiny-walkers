import { goToNextLevel, handleArrow, handleMidgetBehaviour, spawnMidgets } from "../utility/common.js";

class Level3 extends Phaser.Scene {

    constructor() {
        super({
            key: "Level3"
        });
        this.midgetsPassed = 0;
        this.midgetsFell = 0;
    }

    create() {

        this.add.image(400, 300, 'waterfall_background');

        this.ambience = this.sound.add('waterfall');
        this.ambience.loop = true;

        this.map = this.make.tilemap({ key: "falls" });

        this.tileset = this.map.addTilesetImage("falls_tiles");

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
        handleArrow(this, 760, 470);
    }

    update() {
        handleMidgetBehaviour(this);
        goToNextLevel(this, 'Level4');
    }

    handleLilypads() {
        this.lilypads.create(250, 125, "lilypads").setInteractive().setAlpha(0.5);
        this.lilypads.create(550, 125, "lilypads").setInteractive().setAlpha(0.5);
        this.lilypads.create(150, 325, "lilypads").setInteractive().setAlpha(0.5);
        this.lilypads.create(350, 325, "lilypads").setInteractive().setAlpha(0.5);
        this.lilypads.create(650, 325, "lilypads").setInteractive().setAlpha(0.5);
        this.lilypads.create(150, 525, "lilypads").setInteractive().setAlpha(0.5);
        this.lilypads.create(650, 525, "lilypads").setInteractive().setAlpha(0.5);


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

            lilypad.on('pointerout', () => {
                lilypad.alpha = 0.5;
                this.padColliders[i].active = false;
            });
        })
    }

}

export default Level3;
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

        this.add.image(0, 0, 'dinner_background').setOrigin(0, 0);
        this.dinnerSong = this.sound.add('dinner_song');

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

        this.dinnerSong.play();

        this.dragon = this.add.image(2800, 470, 'dragon').setScale(1.5).setDepth(3);

        this.dragonMouth = this.add.image(2800, 470, 'dragon_mouth').setScale(1.5).setDepth(1);

        this.tweens.add({
            targets: [this.dragon, this.dragonMouth],
            y: this.dragon.y + 20,
            duration: 500,
            yoyo: true,
            repeat: -1,
            callbackScope: this,
        })

        this.candle = this.add.image(1100, 0, 'candle').setOrigin(0, 0).setScale(1.25);
        this.tablecloth = this.add.image(230, 500, 'tablecloth').setOrigin(0, 0);
    }

    update() {
        handleMidgetBehaviour(this);
    }

}

export default Won;
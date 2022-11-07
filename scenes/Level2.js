class Level2 extends Phaser.Scene {

    constructor() {
        super({
            key: "Level2"
        });
    }

    create() {
        this.physics.add.staticSprite(400, 300, 'grass');
    }
}

export default Level2;

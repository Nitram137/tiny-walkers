import { refreshMidgetCounter } from "../utility/common.js";

class Level3 extends Phaser.Scene {

    constructor() {
        super({
            key: "Level3"
        });
    }

    create() {

        this.add.text(400, 300, 'To be continued...', {
			fontFamily: 'sans',
			fontSize: '64px',
			color: '#fff',
			fontStyle: 'normal',
            stroke: '#000000',
			strokeThickness: 5,
            shadow: { color: '#000000', fill: true, blur: 5, offsetX: 5, offsetY: 5 }
		}).setOrigin(0.5);
    }

    update() {
        refreshMidgetCounter(this);
    }

}

export default Level3;
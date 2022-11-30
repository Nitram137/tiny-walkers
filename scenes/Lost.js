
class Lost extends Phaser.Scene {

    constructor() {
        super({
            key: "Lost"
        });
    }

    create() {

        this.add.text(400, 350, 'Instead of delivering the midgets to their new\n evil overlord, you have set them free.', {
			fontFamily: 'sans',
			fontSize: '24px',
			color: '#fff',
			fontStyle: 'normal',
            stroke: '#000000',
			strokeThickness: 5,
            shadow: { color: '#000000', fill: true, blur: 5, offsetX: 5, offsetY: 5 }
		}).setOrigin(0.5);

        this.add.text(400, 250, 'Congratulations!', {
			fontFamily: 'sans',
			fontSize: '32px',
			color: '#fff',
			fontStyle: 'normal',
            stroke: '#000000',
			strokeThickness: 5,
            shadow: { color: '#000000', fill: true, blur: 5, offsetX: 5, offsetY: 5 }
		}).setOrigin(0.5);
    }

}

export default Lost;
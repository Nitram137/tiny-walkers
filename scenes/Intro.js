class Intro extends Phaser.Scene {

    constructor() {
        super({
            key: "Intro"
        });
    }

    preload() {
        this.load.image("splash", "assets/sprites/midget.png");

        this.load.image("grass", "assets/sprites/grass.png");
        this.load.image("cloud", "assets/sprites/cloud.png");
        this.load.image("play", "assets/sprites/play.png");
        this.load.image("title", "assets/sprites/title.png");
        this.load.spritesheet("midget", "assets/sprites/midget.png", 
        {frameWidth: 390, frameHeight: 429});  
        this.load.audio("intro", "assets/sounds/intro.mp3");
        this.load.audio("loop", "assets/sounds/loop.mp3");

        this.load.image("arrow", "assets/sprites/arrow.png");
        this.load.image("stone", "assets/sprites/stone.png");

        this.load.image("jelly", "assets/sprites/jelly.png")
    }

    create() {

        this.splash = this.add.sprite(400, 300, 'splash').setScale(0.3);
        this.splash.setInteractive({cursor: 'pointer'});
        this.splash.alpha = 0;

        this.tweens.add({
            targets: [this.splash],
            alpha: 1,
            duration: 1000,
            callBackScope: this,
        });

        this.tween = this.tweens.add({
            targets: [this.splash],
            scaleX: 0.35,
            scaleY: 0.35,
            duration: 100,
            callbackScope: this,
        }).pause();
        
        this.splash.on('pointerover', () => {
            this.tween.play();
            
        });
    
        this.splash.on('pointerout', () => {
            this.tween.seek(0).pause();
            
        });

        this.splash.on('pointerup', () => {
            this.scene.start('MainMenu');
        });
    }
}

export default Intro;
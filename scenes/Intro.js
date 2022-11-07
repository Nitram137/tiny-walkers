class Intro extends Phaser.Scene {

    constructor() {
        super({
            key: "Intro"
        });
    }

    preload() {
        this.load.image("splash", "assets/sprites/midget.png");
        this.load.audio("theme", "assets/sounds/main_theme.mp3");
    }

    create() {
        
        this.theme = this.sound.add('theme');
        this.theme.loop = true;

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
            this.theme.play();
            this.scene.start('MainMenu');
        });
    }
}

export default Intro;
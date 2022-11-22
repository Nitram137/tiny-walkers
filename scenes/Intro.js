class Intro extends Phaser.Scene {

    constructor() {
        super({
            key: "Intro"
        });
    }

    preload() {

        this.load.image("intro_background", "assets/sprites/intro_background.png");
        this.load.image("menu_background", "assets/sprites/menu_background.png");
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

        this.load.image("cave_background", "assets/sprites/cave_background.png");
        this.load.image("jelly", "assets/sprites/jelly.png");
        this.load.audio("boing1", "assets/sounds/boing1.mp3");
        this.load.audio("boing2", "assets/sounds/boing2.mp3");

        this.load.audio("waterfall", "assets/sounds/waterfall.mp3");
        this.load.image("waterfall_background", "assets/sprites/waterfall_background.png");
        this.load.image("lilypads", "assets/sprites/lilypads.png");
    }

    create() {

        this.add.image(400, 300, 'intro_background');

        this.midgetButton = this.add.sprite(400, 400, 'midget').setScale(0.4);
        this.midgetButton.setInteractive({cursor: 'pointer'});
        this.midgetButton.alpha = 0;

        this.anims.create({
            key: "waddle",
            frames: "midget",
            frameRate: 5,
            repeat: -1
        });

        this.tweens.add({
            targets: [this.midgetButton],
            alpha: 1,
            duration: 1000,
            callBackScope: this,
        });

        this.tween = this.tweens.add({
            targets: [this.midgetButton],
            scaleX: 0.5,
            scaleY: 0.5,
            duration: 100,
            callbackScope: this,
        }).pause();

        this.time.addEvent({
            delay: 1500,
            callback: () => {
                this.midgetButton.anims.play("waddle", true);
            }
        })
        
        this.midgetButton.on('pointerover', () => {
            this.tween.play();
            
        });
    
        this.midgetButton.on('pointerout', () => {
            this.tween.seek(0).pause();
            
        });

        this.midgetButton.on('pointerup', () => {
            this.scene.start('MainMenu');
        });

    }
}

export default Intro;
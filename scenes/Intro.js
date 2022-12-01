class Intro extends Phaser.Scene {

    constructor() {
        super({
            key: "Intro"
        });
    }

    preload() {

        this.load.image("intro_background", "assets/backgrounds/intro.png");
        this.load.image("menu_background", "assets/backgrounds/menu.png");
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
        this.load.audio("level1_intro", "assets/sounds/level1_intro.mp3");
        this.load.audio("midget_fallen", "assets/sounds/midget_fallen.mp3");
        this.load.audio("midget_passed", "assets/sounds/midget_passed.mp3");
        this.load.audio("tump", "assets/sounds/tump.mp3");
        

        this.load.image("cave_background", "assets/backgrounds/cave.png");
        this.load.image("jelly", "assets/sprites/jelly.png");
        this.load.audio("boing1", "assets/sounds/boing1.mp3");
        this.load.audio("boing2", "assets/sounds/boing2.mp3");

        this.load.image("falls_tiles", "assets/tilemaps/falls.png");
        this.load.tilemapTiledJSON("falls", "assets/tilemaps/falls.json");
        this.load.audio("waterfall", "assets/sounds/waterfall.mp3");
        this.load.image("waterfall_background", "assets/backgrounds/waterfall.png");
        this.load.image("lilypads", "assets/sprites/lilypads.png");

        this.load.image("dungeon_tiles", "assets/tilemaps/dungeon.png");
        this.load.tilemapTiledJSON("dungeon", "assets/tilemaps/dungeon.json");
        this.load.image("dungeon_background", "assets/backgrounds/dungeon.png");
        this.load.audio("unlock", "assets/sounds/unlock.mp3");

        this.load.tilemapTiledJSON("tower", "assets/tilemaps/tower.json");
        this.load.image("tower_background", "assets/backgrounds/tower.png");
        this.load.image("dark_cloud", "assets/sprites/dark_cloud.png");
        this.load.image('purple', 'assets/particles/purple.png');
        this.load.image('star', 'assets/particles/star.png');
        this.load.audio("level5_intro", "assets/sounds/level5_intro.mp3");
        this.load.audio("hah", "assets/sounds/hah.mp3");
        this.load.audio("magic", "assets/sounds/magic.mp3");
        

        this.load.tilemapTiledJSON("dinner", "assets/tilemaps/dinner.json");
        this.load.image("dinner_background", "assets/backgrounds/dinner.png");
        this.load.audio("dinner_song", "assets/sounds/Happy-Day-in-Paris.mp3");
        this.load.image("dragon", "assets/sprites/dragon.png");
        this.load.image("dragon_mouth", "assets/sprites/dragon_mouth.png");
        this.load.image("dragon_tongue", "assets/sprites/dragon_tongue.png");
        this.load.image("dragon_eye", "assets/sprites/dragon_eye.png");
        this.load.image("tablecloth", "assets/sprites/tablecloth.png");
        this.load.image("candle", "assets/sprites/candle.png");
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
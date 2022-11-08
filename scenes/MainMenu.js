class MainMenu extends Phaser.Scene {

    constructor() {
        super({
            key: "MainMenu"
        });
    }

    create() {

        this.intro = this.sound.add('intro');

        this.theme = this.sound.add('loop');
        this.theme.loop = true;
        
        this.platforms = this.physics.add.staticGroup();
    
        this.spawnPlatforms();
    
        this.add.sprite(150, 150, 'title');
    
        this.playBtn = this.add.sprite(430, 300, 'play').setInteractive({cursor: 'pointer'});
    
        this.secretBtn = this.add.sprite(600, 220, 'cloud').setInteractive({cursor: 'pointer'});
    
        this.tween = this.tweens.add({
            targets: [this.playBtn],
            scaleX: 1.1,
            scaleY: 1.1,
            duration: 100,
            callbackScope: this,
        }).pause();
        
        this.playBtn.on('pointerover', () => {
            this.tween.play();
        });
    
        this.playBtn.on('pointerout', () => {
            this.tween.seek(0).pause();
            
        });
    
        this.playBtn.on('pointerup', () => {
            this.scene.start('Level1');
        });
    
        this.secretBtn.on('pointerup', () => {
            this.spawnMidgets();
        });
    
        this.midgets = this.physics.add.group();
    
        this.spawnMidgets();
    
        this.physics.add.collider(this.midgets, this.platforms);
    
        this.time.addEvent({
            delay: 3000,
            callback: () => {
                this.spawnMidgets();
            },
            loop: true
        })

        this.loopStarted = false;
        this.intro.play();
    }

    update() {
        this.handleMidgetBehaviour();
        if (!this.intro.isPlaying && !this.loopStarted) {
            this.loopStarted = true;
            this.theme.play();
        }
    }
    
    spawnPlatforms() {
        this.platforms.create(0, 485, 'grass');
        this.platforms.create(800, 485, 'grass');
        this.platforms.create(50, 530, 'grass');
        this.platforms.create(750, 530, 'grass');
    
        for (let i=0;i<4;i++) {
            if(i !== 2) this.platforms.create(100 + i * 200, 575, 'grass');
        }
    
        this.platforms.create(80, 150, 'cloud');
        this.platforms.create(230, 150, 'cloud');
        this.platforms.create(430, 300, 'cloud');
        this.platforms.create(600, 220, 'cloud');
    }
    
    spawnMidgets() {
        this.midgets.create(5, 10, 'midget').setScale(0.1);
    
        for (let midget of this.midgets.children.entries) {
            if (midget.body.velocity.x === 0) midget.setVelocityX(100);
        }
    }
    
    handleMidgetBehaviour() {
        this.anims.create({
            key: "walk",
            frames: "midget",
            frameRate: 10,
            repeat: -1
        });
    
        for (let midget of this.midgets.children.entries){
            if (midget.body.touching.down) midget.anims.play("walk", true);
            else midget.anims.play("walk", false);
    
            if (midget.body.touching.left) {
                midget.body.velocity.x = 100;
                midget.flipX = false;
            }
            if (midget.body.touching.right) {
                midget.body.velocity.x = -100;
                midget.flipX = true;
            }
        }
    }
}

export default MainMenu;


let allMidgets = 5;
let midgetCount = 5;

let midgetCounterText;

export class MidgetCounter extends Phaser.Scene {

    constructor() {
        super({
            key: "MidgetCounter"
        });
    }

    create() {
        this.midgetCounterText = this.add.text(0, 565, `${allMidgets} / ${midgetCount}`, {
            fontFamily: 'sans',
            fontSize: '24px',
            color: '#fff',
            fontStyle: 'normal',
            stroke: '#000000',
            strokeThickness: 5,
            shadow: { color: '#000000', fill: true, blur: 5, offsetX: 5, offsetY: 5 }
        });
    }

    update() {
        this.midgetCounterText.setText(`${allMidgets} / ${midgetCount}`);
    }

}

export const goToNextLevel = (currentScene, nextLevel) => {
    for (let midget of currentScene.midgets.children.entries){
        if (!midget.out){
            if ((midget.x > 800 && currentScene.scene.key !== "Level4") || (midget.y < 0 && currentScene.scene.key === "Level4")) {
                ++currentScene.midgetsPassed;
                midget.out = true;
            }
            if ((midget.y > 600 && currentScene.scene.key !== "Level4") || (midget.y > 1800 && currentScene.scene.key === "Level4")) {
                ++currentScene.midgetsFell;
                midget.out = true;
                midgetCount--;
            }
        }
    }

    if(midgetCount === 0) {
        currentScene.scene.start('End');
    } else if (currentScene.midgetsPassed + currentScene.midgetsFell === currentScene.midgets.children.entries.length) {
        allMidgets = midgetCount;
        currentScene.game.sound.stopAll();
        currentScene.scene.start(nextLevel);
    }
}

export const spawnMidgets = (currentScene, x, y, delay) => {
    spawnMidget(currentScene, x, y);

    currentScene.time.addEvent({
        delay: delay,
        callback: () => {
            spawnMidget(currentScene, x, y);
        },
        loop: true
    })
}

const spawnMidget = (currentScene, x, y) => {
    if (currentScene.midgets.children.entries.length < allMidgets)
        currentScene.midgets.create(x, y, 'midget').setScale(0.1);

    for (let midget of currentScene.midgets.children.entries) {
        if (midget.body.velocity.x === 0) midget.setVelocityX(100);

        if (currentScene.scene.key === "Level5") {
            midget.setInteractive();
            midget.on('pointerover', () => {
                midget.body.velocity.y = -300;
            })
        }
    }
}

export const handleMidgetBehaviour = (currentScene) => {
    currentScene.anims.create({
        key: "walk",
        frames: "midget",
        frameRate: 10,
        repeat: -1
    });

    for (let midget of currentScene.midgets.children.entries) {
        if (midget.body.blocked.down) {
            midget.anims.play("walk", true);
            midget.angle = 0;
        }
        else {
            midget.anims.play("walk", false);
            if (midget.body.velocity.x !== 0) midget.angle += (midget.body.velocity.x / 50);
        }
        
        if (midget.body.blocked.left) {
            midget.body.velocity.x = 100;
            midget.flipX = false;
        }
        if (midget.body.blocked.right) {
            midget.body.velocity.x = -100;
            midget.flipX = true;
        }
        if ((midget.x > 1400 && currentScene.scene.key === "Level4") || (midget.x > 7 * 50 && midget.x < 10 * 50 && midget.y > 54 * 50 && currentScene.scene.key === "Level5")) {
            midget.body.velocity.y = -300;
        }
        
        if (currentScene.jellys){
            for (let jelly of currentScene.jellys.children.entries) {
                jelly.on('pointerup', () => {
                    if(jelly.x - 50 < midget.x && jelly.x + 50 > midget.x && jelly.y - 50 < midget.y && jelly.y + 25 > midget.y) {
                        midget.body.velocity.y = -400;
                    }
                });
            }
        }
    }
}

export const handleArrow = (currentScene, x, y)  => {
    currentScene.arrow = currentScene.physics.add.staticSprite(x, y, 'arrow').setScale(0.1);

    currentScene.tweens.add({
        targets: [currentScene.arrow],
        x: x + 10,
        duration: 500,
        yoyo: true,
        repeat: -1,
        callbackScope: currentScene,
    })
}

export const handleCamera = currentScene => {
    currentScene.input.on("pointermove", (pointer) => {
        if (!pointer.isDown) return;
    
        currentScene.camera.scrollX -= (pointer.x - pointer.prevPosition.x) / currentScene.camera.zoom;
        currentScene.camera.scrollY -= (pointer.y - pointer.prevPosition.y) / currentScene.camera.zoom;
    });

    currentScene.input.on("wheel", (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
        if (deltaY > 0) {
            var newZoom = currentScene.camera.zoom - .05;
            if (newZoom > 0.6) {
                currentScene.camera.zoom = newZoom;     
            }
        }
      
        if (deltaY < 0) {
            var newZoom = currentScene.camera.zoom + .05;
            if (newZoom < 1) {
                currentScene.camera.zoom = newZoom;     
            }
        }
    });
}


let allMidgets = 5;
let midgetCount = 5;

let midgetCounterText;

export const refreshMidgetCounter = currentScene => {
    if (midgetCounterText) midgetCounterText.destroy();
    midgetCounterText = currentScene.add.text(0, 565, `${allMidgets} / ${midgetCount}`, {
        fontFamily: 'sans',
        fontSize: '24px',
        color: '#fff',
        fontStyle: 'normal',
        stroke: '#000000',
        strokeThickness: 5,
        shadow: { color: '#000000', fill: true, blur: 5, offsetX: 5, offsetY: 5 }
    }).setDepth(10);
}

export const goToNextLevel = (currentScene, nextLevel) => {
    for (let midget of currentScene.midgets.children.entries){
        if (!midget.out){
            if (midget.x > 800) {
                ++currentScene.midgetsPassed;
                midget.out = true;
            }
            if (midget.y > 600) {
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
        if (midget.body.blocked.down) midget.anims.play("walk", true);
        else midget.anims.play("walk", false);
        
        if (midget.body.blocked.left) {
            midget.body.velocity.x = 100;
            midget.flipX = false;
        }
        if (midget.body.blocked.right) {
            midget.body.velocity.x = -100;
            midget.flipX = true;
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

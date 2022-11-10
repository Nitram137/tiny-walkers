
const allMidgets = 5;
export let midgetCount = 5;

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
        currentScene.scene.start(nextLevel);
    }
}

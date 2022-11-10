
export let midgetCount = 2;

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

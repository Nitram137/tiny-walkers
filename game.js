import Intro from './scenes/Intro.js';
import MainMenu from './scenes/MainMenu.js';
import Level1 from './scenes/Level1.js';
import Level2 from './scenes/Level2.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: 0x87ceeb,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 500 }
        }
    },
    scene: [Intro, MainMenu, Level1, Level2]
}

const game = new Phaser.Game(config);

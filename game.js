import Intro from './scenes/Intro.js';
import MainMenu from './scenes/MainMenu.js';
import Level1 from './scenes/Level1.js';
import Level2 from './scenes/Level2.js';
import Level3 from './scenes/Level3.js';
import Level4 from './scenes/Level4.js';
import Level5 from './scenes/Level5.js';
import Lost from './scenes/Lost.js';
import Won from './scenes/Won.js';
import { MidgetCounter } from './utility/common.js';

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
    scene: [Intro, MainMenu, Level1, Level2, Level3, Level4, Level5, Lost, Won, MidgetCounter]
}

const game = new Phaser.Game(config);

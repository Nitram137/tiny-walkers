import MainMenu from './scenes/MainMenu.js';
import Level1 from './scenes/Level1.js';

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
    scene: [MainMenu, Level1]
}

const game = new Phaser.Game(config);

import Phaser from 'phaser'
import config from './configs/config';
import Boot from './scene/boot';
import GameScene from './scene/game';

class Game extends Phaser.Game {
    constructor() {
        super(config);
        this.scene.add('Boot', Boot);
        this.scene.add('GameScene', GameScene);
        this.scene.start('Boot');
    }

}
window.onload = e => {
    document.fonts.load('1rem "LingLengLang" ').then(() => { new Game() })
};
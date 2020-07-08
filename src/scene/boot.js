import Phaser from 'phaser'
import uiElements from '../helpers/uiElements';

export default class Boot extends Phaser.Scene {

    constructor() {
        super('Boot');

    }

    preload() {
        this.load.image('rocket', 'assets/rocket.png');
        this.load.image('rocket_top', 'assets/rocket_top.png');
        this.load.image('rocket_bottom', 'assets/rocket_bottom.png');
        this.load.image('thrust', 'assets/thrust.png');
        this.load.image('planet', 'assets/planet.png');
        this.load.image('background', 'assets/bg.jpg');
        this.load.image('btn', 'assets/btn.png');

    }
    create() {
        this.scene.scene.events.on('nextScene', _ => {
            this.scene.start('GameScene')
        }, this)

        this.bg = this.add.sprite(0, 0, 'background');
        this.bg.setOrigin(0, 0);
        this.bg.setDisplaySize(this.game.config.width, this.game.config.height);

        this.add.text(this.game.config.width / 2 - 180, 100, 'Space Race', {
            fontFamily: 'LingLengLang',
            fontSize: '110px',
            align: "center"
        });
        this.planet = this.add.sprite(this.game.config.width / 2, this.game.config.height, 'planet');
        this.planet.setOrigin(0.5, 0.5);
        this.rocket = this.add.sprite(0, 0, 'rocket');
        this.rocket.setOrigin(0.5, 0.5);
        let container = this.add.container(this.game.config.width / 2, this.game.config.height - 250, this.rocket);
        let btn = new uiElements(this, 0, 0);
        btn.createButton('Start!', 'btn', this.game.config.width / 2, this.game.config.height / 2 - 50, 'start', container);
    }
}
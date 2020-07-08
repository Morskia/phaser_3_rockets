import 'phaser';

export default class uiElements extends Phaser.GameObjects.Image {

    constructor(scene, x, y) {
        super(scene, x, y, 'uiElements');
        this.scene = scene;
    }
    createButton(...params) {
        let thrustersOff = true;
        const [text, image, locX, locY, action, extras] = params;
        let gameButton = this.scene.add.sprite(locX, locY, image).setInteractive({ cursor: 'pointer' }).setOrigin(0.5, 0.5);;

        this.gameText = this.scene.add.text(0, 0, text, { fontSize: '32px', fill: '#fff', fontWeight: 'bolder', fontFamily: 'LingLengLang' });
        Phaser.Display.Align.In.Center(
            this.gameText,
            gameButton
        );
        switch (action) {
            case 'start':
                gameButton.on('pointerover', event => {
                    this.thrusters = this.scene.add.sprite(0, 90, 'thrust');
                    if (thrustersOff) {
                        this.thrusters.setVisible(true);
                        extras.add(this.thrusters)
                        thrustersOff = false;
                        this.burning = this.scene.add.tween({
                            targets: this.thrusters,
                            scaleX: 1.05,
                            scaleY: 1.05,
                            ease: 'Linear',
                            duration: 50,
                            yoyo: true,
                            repeat: -1,
                        });
                    }
                });
                gameButton.on('pointerout', event => {
                    if (!thrustersOff) {
                        extras.remove(this.thrusters);
                        this.thrusters.destroy();
                        thrustersOff = true;
                        this.burning.remove()
                    }
                });
                gameButton.on('pointerdown', event => {
                    this.scene.add.tween({
                        targets: extras,
                        y: -200,
                        duration: 1000,
                        ease: 'Power2',
                        onComplete: function() {
                            this.scene.events.emit('nextScene')
                        }.bind(this)
                    });
                });
                break;
            case 'restart':
                gameButton.on('pointerdown', event => {
                    this.scene.scene.restart();
                })
                break;
        }

    }

}
export default {
    type: Phaser.AUTO,
    parent: 'phaser',
    width: 1024,
    height: 786,
    pixelArt: true,
    roundPixels: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 0 }
        }
    }
};
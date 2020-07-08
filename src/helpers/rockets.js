import 'phaser';

export default class Rocket extends Phaser.GameObjects.Image {
    constructor(scene, x, y, position, single, idx) {
        super(scene);
        this.initialFuel = single.first_stage.fuel_amount_tons;
        this.initialBarHeight = 100;
        this.x = x;
        this.y = y;
        this.idx = idx
        this.scene = scene;
        this.postionX = position;
        this.speed = -50;
        this.fuel = single.first_stage.fuel_amount_tons;
        this.single = single;
        this.deployShip()
    }
    deployShip() {
        this.rocket_top = this.scene.add.sprite(0, 0, 'rocket_top');
        this.rocket_top.setOrigin(0.5, 0.5);
        this.rocket_bottom = this.scene.add.sprite(0, 47, 'rocket_bottom');
        this.rocket_bottom.setOrigin(0.5, 0.5);
        this.stage = 1;
        this.thrust = this.scene.add.sprite(0, 100, 'thrust');
        this.thrust.setOrigin(0.5, 0.5);
        this.holder = new Phaser.GameObjects.Graphics(this.scene);
        this.holder.fillStyle(0x000000);
        this.holder.fillRect(40, -30, 10, 100);
        this.bar = new Phaser.GameObjects.Graphics(this.scene);
        this.bar.fillStyle(0xFFF);
        this.bar.fillRect(41, 75, 8, -this.initialBarHeight);
        this.container = this.scene.add.container(this.postionX, 600, [this.rocket_top, this.rocket_bottom, this.thrust, this.holder, this.bar]);
        this.scene.physics.world.enable(this.container);
        this.container.body.setVelocity(0, this.speed)
        this.scene.add.tween({
            targets: this.thrust,
            scaleX: 1.05,
            scaleY: 1.05,
            ease: 'Linear',
            duration: 50,
            yoyo: true,
            repeat: -1,
        });
        if (this.idx === 3) {
            this.scene.cameras.main.startFollow(this.container, null, 0.5, 0.5, 290, 0)
        }
        this.burnFuel = setInterval(_ => {
            //NOTE: I made fuel to burn faster(50 points / sec), otherwise game example is too slow
            this.fuel -= 50
            this.leftFuel = (this.fuel / this.initialFuel) * this.initialBarHeight;
            if (this.fuel <= 0 && this.stage === 1) {
                this.initialBarHeight = 60;
                this.holder.clear();
                this.holder.fillStyle(0x000000);
                this.holder.fillRect(40, -30, 10, this.initialBarHeight);

                this.bar.clear();
                this.container.remove([this.rocket_bottom, this.thrust]);
                this.fuel = this.single.second_stage.fuel_amount_tons;
                this.initialFuel = this.single.second_stage.fuel_amount_tons;
                this.stage = 2;
                this.leftFuel = (this.fuel / this.initialFuel) * this.initialBarHeight;
            }
            if (this.stage == 1) {
                this.bar.clear();
                this.bar.fillStyle(0xfff);
                this.bar.fillRect(41, 75, 8, -this.leftFuel);
            } else {
                this.bar.clear();
                this.bar.fillStyle(0xff0000);
                this.bar.fillRect(41, 35, 8, -this.leftFuel);
            }
            if (this.fuel <= 0 && this.stage === 2) {
                this.holder.clear();
                clearInterval(this.burnFuel)
                this.endAnimation = this.scene.add.tween({
                    targets: this.rocket_top,
                    angle: { from: 360, to: 0 },
                    ease: 'Linear',
                    alpha: { from: 1, to: 0 },
                    duration: 2000,
                    yoyo: false,
                    repeat: 0,
                    onComplete: this.destroyShip()
                });
            }
        }, 1000);
    }
    destroyShip() {
        this.container.remove(this.bar);
        setTimeout(_ => {
            this.container.remove(this.rocket_top);
            this.container.destroy()
        }, 2000)
        this.scene.events.emit('shipInAir');
    }
}
class Character extends MovableObject {
    y = 150;
    x = 50;
    height = 210;
    width = 150;
    speed = 3;
    images_idle = [
        'img/1.Sharkie/3.Swim/1.png',
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/4.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png',
    ];
    world;

    constructor() {
        super().loadImage('img/1.Sharkie/1.IDLE/1.png');
        this.loadImages(this.images_idle);

        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT) {
                this.x += this.speed;
            } if (this.world.keyboard.LEFT) {
                this.x -= this.speed;
            } if (this.world.keyboard.UP) {
                this.y -= this.speed;
            } if (this.world.keyboard.DOWN) {
                this.y += this.speed;
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {

                // walk animation
                let i = this.currentImage % this.images_idle.length;
                let path = this.images_idle[i];
                this.img = this.imgCache[path];
                this.currentImage++;
            }
        }, 1000 / 6);
    }

    jump() {

    }
}
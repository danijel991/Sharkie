class Character extends MovableObject {
    y = 150;
    x = 0;
    height = 210;
    width = 150;
    speed = 3;
    IMAGES_SWIMMING = [
        'img/1.Sharkie/3.Swim/1.png',
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/4.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png',
    ];
    world;
    swimming_sound = new Audio('audio/char_swim.mp3');

    constructor() {
        super().loadImage('img/1.Sharkie/1.IDLE/1.png');
        this.loadImages(this.IMAGES_SWIMMING);

        this.animate();
    }

    animate() {
        setInterval(() => {
            this.swimming_sound.pause();
            this.swimming_sound.volume = .5;
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
                this.swimming_sound.play();
            } if (this.world.keyboard.LEFT && this.x > -100) {
                this.x -= this.speed;
                this.otherDirection = true;
                this.swimming_sound.play();
            } if (this.world.keyboard.UP && this.y > 0) {
                this.y -= this.speed;
                this.swimming_sound.play();
            } if (this.world.keyboard.DOWN && this.y < 250) {
                this.y += this.speed;
                this.swimming_sound.play();
            } 
            this.world.camera_x = -this.x + 50;
        }, 1000 / 60);

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {

                // swim animation
                this.playAnimation(this.IMAGES_SWIMMING);
            }
        }, 1000 / 6);
    }
}
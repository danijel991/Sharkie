class Coin extends MovableObject {
    width = 50;
    height = 50;
    img;
    currentImage = 0;
    imgCache = {};
    x = 100;
    y = 100;

    IMAGES_ANIMATED_COINS = [
        'img/4.Marks/coins/1.png',
        'img/4.Marks/coins/2.png',
        'img/4.Marks/coins/3.png',
        'img/4.Marks/coins/4.png'
    ];

    constructor(x, y) {
        super().loadImage('img/4.Marks/coins/1.png');
        this.x = x;
        this.y = y;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_ANIMATED_COINS);
        }, 100);
    }

    collect() {
        // Collect coin logic here
    }
}

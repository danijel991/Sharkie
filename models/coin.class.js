class Coin extends MovableObject {
    width = 50;
    height = 50;
    img;
    currentImage = 0;
    imgCache = {};

    constructor(x, y) {
        super().loadImage('img/coin/coin1.png');
        this.x = x;
        this.y = y;
        this.applyGravity();
        this.animateCoin();
    }

    animateCoin() {
        setInterval(() => {
            this.playAnimation(['img/coin/coin1.png', 'img/coin/coin2.png', 'img/coin/coin3.png', 'img/coin/coin4.png']);
        }, 100);
    }

    collect() {
        // Collect coin logic here
    }
}

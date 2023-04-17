class Coins extends MovableObject {
    height = 130;
    width = 130;
    img;
    currentImage = 0;
    imgCache = {};
    offset = {
        top: 40,
        bottom: 40,
        left: 40,
        right: 40
      }

    IMAGES_ANIMATED_COINS = [
        'img/4.Marks/coins/1.png',
        'img/4.Marks/coins/2.png',
        'img/4.Marks/coins/3.png',
        'img/4.Marks/coins/4.png'
    ];

    constructor() {
        super().loadImage('img/4.Marks/coins/1.png');
        this.x = 400 + Math.random() * 2500;
        this.y = 350 - Math.random() * 220;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_ANIMATED_COINS);
        }, 100);
    }
}

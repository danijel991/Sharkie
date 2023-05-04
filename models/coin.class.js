class Coins extends MovableObject {
    height = 50;
    width = 50;
    img;
    currentImage = 0;
    imgCache = {};
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

    IMAGES_ANIMATED_COINS = [
        './img/4.Marks/coins/1.png',
        './img/4.Marks/coins/2.png',
        './img/4.Marks/coins/3.png',
        './img/4.Marks/coins/4.png'
    ];

    constructor(x, y) {
        super().loadImage('./img/4.Marks/coins/1.png');
        this.loadImages(this.IMAGES_ANIMATED_COINS);
        this.x = x;
        this.y = y;
        this.speed = 0.15 + Math.random() * 0.15;
        this.animate();
    }

    animate() {
        this.animateCollectables();
        setInterval(() => {
            this.playAnimation(this.IMAGES_ANIMATED_COINS);
        }, 1000);
    }
    
    coinSound() {
        coin_sound.play();
    }
   
}

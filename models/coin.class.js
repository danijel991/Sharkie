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
        this.coin_sound = new Audio('./audio/coin.mp3');
        this.loadImages(this.IMAGES_ANIMATED_COINS);
        // this.x = 200 + Math.random() * 1500 - 1; //immer Zahl zwischen 200 und 700
        // this.y = 0 + Math.random() * 400 - 1;
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
        this.coin_sound.play();
    }
   
}

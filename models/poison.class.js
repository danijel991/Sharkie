/**
 * Class representing poison objects.
 * @extends MovableObject
 */
class Poisons extends MovableObject {
    height = 35;
    width = 35;
    img;
    currentImage = 0;
    imgCache = {};
    offset = {
        top: 0,
        bottom: 0,
        left: 5,
        right: 5
    }

    IMAGES_ANIMATED_POISONS = [
        './img/4.Marks/poison/animated/1.png',
        './img/4.Marks/poison/animated/2.png',
        './img/4.Marks/poison/animated/3.png',
        './img/4.Marks/poison/animated/4.png',
        './img/4.Marks/poison/animated/5.png',
        './img/4.Marks/poison/animated/6.png',
        './img/4.Marks/poison/animated/7.png',
        './img/4.Marks/poison/animated/8.png'
    ];

    /**
     * Creates a new Poison object.
     * @param {*} x - The x coordinate of the poison object.
     * @param {*} y - The y coordinate of the poison object.
     */
    constructor(x, y) {
        super().loadImage('./img/4.Marks/poison/animated/1.png');
        this.loadImages(this.IMAGES_ANIMATED_POISONS);
        this.x = x;
        this.y = y;
        this.speed = 0.15 + Math.random() * 0.15;
    }

    /**
     * Animates the poison object.
     */
    animate() {
        this.animateCollectables();
        setInterval(() => {
            this.playAnimation(this.IMAGES_ANIMATED_POISONS);
        }, 1000);
    }
}

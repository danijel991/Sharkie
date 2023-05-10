/**
 * Class for coins
 */
class Coins extends MovableObject {
    height = 35;
    width = 35;
    img;
    currentImage = 0;
    imgCache = {};
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

    /**
* An array of image URLs for the Coins.
* @type {string[]}
*/
    IMAGES_ANIMATED_COINS = [
        './img/4.Marks/coins/1.png',
        './img/4.Marks/coins/2.png',
        './img/4.Marks/coins/3.png',
        './img/4.Marks/coins/4.png'
    ];

    /**
     * 
     * Loads the resources, parameters,... for the respective object
     * @param {*} x - Coordinates of the x axis
     * @param {*} y - Coordinates of the y axis
     */
    constructor(x, y) {
        super().loadImage('./img/4.Marks/coins/1.png');
        this.loadImages(this.IMAGES_ANIMATED_COINS);
        this.x = x;
        this.y = y;
        this.speed = 0.15 + Math.random() * 0.15;
    }

    /**
     * This function animates the coins
     */
    animate() {
        this.animateCollectables();
        setInterval(() => {
            this.playAnimation(this.IMAGES_ANIMATED_COINS);
        }, 1000);
    }
}

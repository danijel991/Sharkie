/**
 * Creates a new Poisonbar object.
 */
class PufferFish extends MovableObject {
    height = 80;
    width = 85;

    /**
    * An array of image URLs for the Coins.
    * @type {string[]}
    */
    IMAGES_PUFFERFISH_SWIM = [
        './img/2.Enemy/1_Pufferfish/1.Swim/1.swim1.png',
        './img/2.Enemy/1_Pufferfish/1.Swim/1.swim2.png',
        './img/2.Enemy/1_Pufferfish/1.Swim/1.swim3.png',
        './img/2.Enemy/1_Pufferfish/1.Swim/1.swim4.png',
        './img/2.Enemy/1_Pufferfish/1.Swim/1.swim5.png'
    ]

    IMAGES_PUFFERFISH_TRANSITION = [
        './img/2.Enemy/1_Pufferfish/2.transition/1.transition1.png',
        './img/2.Enemy/1_Pufferfish/2.transition/1.transition2.png',
        './img/2.Enemy/1_Pufferfish/2.transition/1.transition3.png',
        './img/2.Enemy/1_Pufferfish/2.transition/1.transition4.png',
        './img/2.Enemy/1_Pufferfish/2.transition/1.transition5.png',
    ]

    IMAGES_PUFFERFISH_BUBBLESWIM = [
        './img/2.Enemy/1_Pufferfish/3.Bubbleeswim/1.bubbleswim1.png',
        './img/2.Enemy/1_Pufferfish/3.Bubbleeswim/1.bubbleswim2.png',
        './img/2.Enemy/1_Pufferfish/3.Bubbleeswim/1.bubbleswim3.png',
        './img/2.Enemy/1_Pufferfish/3.Bubbleeswim/1.bubbleswim4.png',
        './img/2.Enemy/1_Pufferfish/3.Bubbleeswim/1.bubbleswim5.png'
    ]

    IMAGES_PUFFERFISH_DEAD = [
        './img/2.Enemy/1_Pufferfish/4.DIE/1.png',
        './img/2.Enemy/1_Pufferfish/4.DIE/2.png',
        './img/2.Enemy/1_Pufferfish/4.DIE/3.png'
    ]

    offset = {
        top: 10,
        bottom: 20,
        left: 0,
        right: 5
    }

    /**
     * Creates a new PufferFish object.
     * @constructor
     * @param {*} x The x coordinate of the fish.
     * @param {*} y The y coordinate of the fish.
     */
    constructor(x, y) {
        super().loadImage(this.IMAGES_PUFFERFISH_SWIM[0]);
        this.loadImages(this.IMAGES_PUFFERFISH_SWIM);
        this.loadImages(this.IMAGES_PUFFERFISH_DEAD);
        this.x = x;
        this.y = y;
        this.speed = 0.15 + Math.random() * 0.15;
        this.puffFishDead = false;
    }

    /**
     * Animates the PufferFish object by moving it left and playing the swimming animation.
     */
    animate() {
        this.fishMotionInterval = setInterval(() => {
            this.moveLeft();
            this.playAnimation(this.IMAGES_PUFFERFISH_SWIM);
        }, 1000 / 60);

        this.fishMotionIntervalDead = setInterval(() => {
            if (this.puffFishDead)
                this.deadFish();
        }, 1000);
    }

    /**
     * Plays the animation for a dead PufferFish object and stops its motion.
     */
    deadFish() {
        clearInterval(this.fishMotionInterval);
        this.playAnimation(this.IMAGES_PUFFERFISH_DEAD);
    }
}
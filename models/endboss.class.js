class Endboss extends MovableObject {

    height = 500;
    width = 600;

      /**
   * An array of image URLs for the Endboss.
   * @type {string[]}
   */
    IMAGES_BOSS_INTRO = [
        './img/2.Enemy/3_Final_Enemy/1.Introduce/1.png',
        './img/2.Enemy/3_Final_Enemy/1.Introduce/2.png',
        './img/2.Enemy/3_Final_Enemy/1.Introduce/3.png',
        './img/2.Enemy/3_Final_Enemy/1.Introduce/4.png',
        './img/2.Enemy/3_Final_Enemy/1.Introduce/5.png',
        './img/2.Enemy/3_Final_Enemy/1.Introduce/6.png',
        './img/2.Enemy/3_Final_Enemy/1.Introduce/7.png',
        './img/2.Enemy/3_Final_Enemy/1.Introduce/8.png',
        './img/2.Enemy/3_Final_Enemy/1.Introduce/9.png',
        './img/2.Enemy/3_Final_Enemy/1.Introduce/10.png'
    ];
    IMAGES_BOSS_SWIM = [
        './img/2.Enemy/3_Final_Enemy/2.floating/1.png',
        './img/2.Enemy/3_Final_Enemy/2.floating/2.png',
        './img/2.Enemy/3_Final_Enemy/2.floating/3.png',
        './img/2.Enemy/3_Final_Enemy/2.floating/4.png',
        './img/2.Enemy/3_Final_Enemy/2.floating/5.png',
        './img/2.Enemy/3_Final_Enemy/2.floating/6.png',
        './img/2.Enemy/3_Final_Enemy/2.floating/7.png',
        './img/2.Enemy/3_Final_Enemy/2.floating/8.png',
        './img/2.Enemy/3_Final_Enemy/2.floating/9.png',
        './img/2.Enemy/3_Final_Enemy/2.floating/10.png',
        './img/2.Enemy/3_Final_Enemy/2.floating/11.png',
        './img/2.Enemy/3_Final_Enemy/2.floating/12.png',
        './img/2.Enemy/3_Final_Enemy/2.floating/13.png'
    ];
    IMAGES_BOSS_ATTACK = [
        './img/2.Enemy/3_Final_Enemy/Attack/1.png',
        './img/2.Enemy/3_Final_Enemy/Attack/2.png',
        './img/2.Enemy/3_Final_Enemy/Attack/3.png',
        './img/2.Enemy/3_Final_Enemy/Attack/4.png',
        './img/2.Enemy/3_Final_Enemy/Attack/5.png',
        './img/2.Enemy/3_Final_Enemy/Attack/6.png'
    ];
    IMAGES_BOSS_DEAD = [
        './img/2.Enemy/3_Final_Enemy/Dead/1.png',
        './img/2.Enemy/3_Final_Enemy/Dead/2.png',
        './img/2.Enemy/3_Final_Enemy/Dead/3.png',
        './img/2.Enemy/3_Final_Enemy/Dead/4.png',
        './img/2.Enemy/3_Final_Enemy/Dead/5.png',
        './img/2.Enemy/3_Final_Enemy/Dead/6.png'
    ];
    IMAGES_BOSS_HURT = [
        './img/2.Enemy/3_Final_Enemy/Hurt/1.png',
        './img/2.Enemy/3_Final_Enemy/Hurt/2.png',
        './img/2.Enemy/3_Final_Enemy/Hurt/3.png',
        './img/2.Enemy/3_Final_Enemy/Hurt/4.png'
    ];

    offset = {
        top: 150,
        bottom: 70,
        left: 37,
        right: 37
    }

    /**
     * The world where the boss exists.
     */
    world;
    /**
     * Indicates whether the boss is currently hurt or not.
     */
    bossIsHurt = false;
    /**
     * Indicates whether the boss is dead or not.
     */
    bossDead = false;
    /**
     * Indicates whether the boss is currently attacking or not.
     */
    attacking = false;
    /**
     * Indicates whether the player has had first contact with the boss or not.
     */
    hadFirstContact = false;

    /**
     * Boss class constructor
     * @constructor
     */
    constructor() {
        super().loadImage(this.IMAGES_BOSS_INTRO[0]);
        this.loadImages(this.IMAGES_BOSS_INTRO);
        this.loadImages(this.IMAGES_BOSS_SWIM);
        this.loadImages(this.IMAGES_BOSS_ATTACK);
        this.loadImages(this.IMAGES_BOSS_HURT);
        this.loadImages(this.IMAGES_BOSS_DEAD);
        this.x = 2000;
        this.y = -100;
        this.angle = 0; // Initialize angle and radius
        this.radius = 100;
        this.centerX = 2000;
        this.centerY = -100;
        this.energy = 100;
        this.introListener();
    }

    /**
     * Listens for the character's first contact with the boss during the intro sequence.
     * If the character's x position is greater than 1450 and there hasn't been any previous contact,
     * the boss starts the intro animation.
     */
    introListener() {
        setInterval(() => {
            if (world.character.x > 1450 && !this.hadFirstContact) {
                this.hadFirstContact = true;
                this.animate();
            }
        }, 100);
    }

    /**
     * Starts the animation loop for the boss character, playing the appropriate
     * animation based on the boss's current state.
     */
    animate() {
        let i = 0;
        let endbossAnimation = setInterval(() => {
            if (i < 10) {
                // do nothing, wait for 1 sec
            } else if (i >= 10 && i < 20)
                this.playBossIntro()
            else if (world.character.attackedByBoss)
                this.playBossAttack();
            else if (this.bossIsHurt)
                this.playBossHurt();
            else if (this.bossDead || this.energy <= 0) {
                this.playBossDead(endbossAnimation);
            } else {
                this.playAnimation(this.IMAGES_BOSS_SWIM);
                this.playBossSwim();
            }
            i++;
        }, 100);
    }

    /**
     * Plays the introductory animation for the boss character.
     */
    playBossIntro() {
        this.playAnimation(this.IMAGES_BOSS_INTRO)
    }

    /**
     * Animates the boss character swimming in a circular path.
     */
    playBossSwim() {
        this.angle += 0.05;
        let newX = this.centerX + Math.cos(this.angle) * this.radius;
        let newY = this.centerY + Math.sin(this.angle) * this.radius;
        this.x = newX;
        this.y = newY;
    }

    /**
     * Plays the boss hurt animation.
     */
    playBossHurt() {
        this.currentImage = 0;
        let hurt = setInterval(() => {
            this.playAnimation(this.IMAGES_BOSS_HURT);
        }, 100)
        setTimeout(() => {
            this.bossIsHurt = false;
            clearInterval(hurt);
            i++;
        }, 200)
    }

    /**
     * Plays the boss attack animation.
     */
    playBossAttack() {
        this.currentImage = 0;
        if (!this.attacking) {
            let attack = setInterval(() => {
                this.attacking = true;
                this.playAnimation(this.IMAGES_BOSS_ATTACK);
            }, 100)
            setTimeout(() => {
                this.attacking = false;
                clearInterval(attack);
                i++;
            }, 100)
        }
    }

    /**
     * Plays the boss dead animation and stops the game after a delay.
     * @param {number} endbossAnimation The ID of the interval to stop.
     */
    playBossDead(endbossAnimation) {
        this.playAnimation(this.IMAGES_BOSS_DEAD);
        this.loadImage(this.IMAGES_BOSS_DEAD[4]);
        clearInterval(endbossAnimation);
        setTimeout(() => {
            stopGame(1);
        }, 4000);
    }
}

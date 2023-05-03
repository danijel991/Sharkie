class Endboss extends MovableObject {

    height = 500;
    width = 600;
    y = -25;
    x = 2500;
    world;
    bossIsHurt = false;
    bossDead = false;

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

    boss_intro = new Audio('./audio/boss_intro.mp3');
    hadFirstContact = false;
    attackImgIndex = 0;


    constructor() { //super wird geschrieben, wenn Methoden vom übergeordneten obejkt aufgerufen werden sollen
        super().loadImage(this.IMAGES_BOSS_INTRO[0]);
        this.loadImages(this.IMAGES_BOSS_INTRO);
        this.loadImages(this.IMAGES_BOSS_SWIM);
        this.loadImages(this.IMAGES_BOSS_ATTACK);
        this.loadImages(this.IMAGES_BOSS_HURT);
        this.loadImages(this.IMAGES_BOSS_DEAD);
        this.speed = 1.5;
        this.animate();
    }

    animate() {
        setTimeout(() => {
            let i = 0;
            this.endbossAnimation = setInterval(() => {
                if (this.bossDead == true || this.energy <= 0) {
                    this.playAnimation(this.IMAGES_BOSS_DEAD);
                    stopGame(1);
                    console.log('stop this interval');
                } else if (i < 10) {
                    this.x = 2200;
                    this.playAnimation(this.IMAGES_BOSS_INTRO);
                } else if (world.character.attackedByBoss == true) {
                    this.playAnimation(this.IMAGES_BOSS_ATTACK);

                } else if (this.bossIsHurt == true) {
                    this.playAnimation(this.IMAGES_BOSS_HURT);
                    this.bossIsHurt = false;
                } else {
                    this.playAnimation(this.IMAGES_BOSS_SWIM);
                };
                i++;
                if (world.character.x > 1450 && !this.hadFirstContact) {
                    i = 0;
                    this.hadFirstContact = true;
                }
            }, 10000 / 60);
        }, 2500);
    }
}

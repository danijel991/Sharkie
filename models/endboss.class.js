class Endboss extends MovableObject {

    height = 500;
    width = 600;
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

    constructor() {
        super().loadImage('./img/2.Enemy/3_Final_Enemy/1.Introduce/1.png');
        this.loadImages(this.IMAGES_BOSS_INTRO);
        this.loadImages(this.IMAGES_BOSS_SWIM);
        this.loadImages(this.IMAGES_BOSS_ATTACK);
        this.loadImages(this.IMAGES_BOSS_HURT);
        this.loadImages(this.IMAGES_BOSS_DEAD);
        this.hadFirstContact = false;
        this.bossIsIdle = false;
        this.speed = 1.5;
        this.x = 400;
        this.y = 0;
        this.angle = 0; // Initialize angle and radius
        this.radius = 100;
        this.centerX = 1900;
        this.centerY = -100;
        this.attacking = false;
        this.bossDead = false; // Initialize bossDead and energy
        this.energy = 100;
        this.animate();
    }

    animate() {

        let endbossAnimation = setInterval(() => {
            if (this.bossDead || this.energy <= 0) {
                this.playBossDead();
                clearInterval(endbossAnimation);
            } else if (i < 10 && this.hadFirstContact)
                this.playBossIntro();
            else if (world.character.attackedByBoss)
                this.playBossAttack();
            else if (this.bossIsHurt)
                this.playBossHurt();
            else this.playBossSwim();
            i++;

            if (world.character.x > 1300 && !this.hadFirstContact) {
                this.hadFirstContact = true;
                this.currentImage = 0;
                i = 0;
            }
        }, 100);
    }

    playBossIntro() {
        this.currentImage = 0;
        setTimeout(() => {
            this.x = 1200; // neue X-Position
            this.y = 0;
            this.playAnimation(this.IMAGES_BOSS_INTRO);
            this.hadFirstContact = true;
        }, 1500); // erhöhte Verzögerung
        this.playBossSwim();
    }

    playBossSwim() {
        this.playAnimation(this.IMAGES_BOSS_SWIM);
        this.angle += 0.05;
        let newX = this.centerX + Math.cos(this.angle) * this.radius;
        let newY = this.centerY + Math.sin(this.angle) * this.radius;
        this.x = newX;
        this.y = newY;
    }

    playBossHurt() {
        this.currentImage = 0;
        let hurt = setInterval(() => {
            this.playAnimation(this.IMAGES_BOSS_HURT);
        }, 100)
        setTimeout(() => {
            this.bossIsHurt = false;
            clearInterval(hurt)
        }, 200)
    }

    playBossAttack() {
        this.currentImage = 0;
        if (!this.attacking) {
            let attack = setInterval(() => {
                this.attacking = true;
                this.playAnimation(this.IMAGES_BOSS_ATTACK);
            }, 100)
            setTimeout(() => {
                this.attacking = false;
                clearInterval(attack)
            }, 600)
        }

    }
    playBossDead() {
        this.playAnimation(this.IMAGES_BOSS_DEAD);
        this.loadImage(this.IMAGES_BOSS_DEAD[4]);
        setTimeout(() => {
            stopGame(1);
        }, 4000);
    }
}
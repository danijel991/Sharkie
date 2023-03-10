class Endboss extends MovableObject {

    height = 500;
    width = 600;
    y = -25;

    IMAGES_BOSS_INTRO = [
        'img/2.Enemy/3 Final_Enemy/1.Introduce/1.png',
        'img/2.Enemy/3 Final_Enemy/1.Introduce/2.png',
        'img/2.Enemy/3 Final_Enemy/1.Introduce/3.png',
        'img/2.Enemy/3 Final_Enemy/1.Introduce/4.png',
        'img/2.Enemy/3 Final_Enemy/1.Introduce/5.png',
        'img/2.Enemy/3 Final_Enemy/1.Introduce/6.png',
        'img/2.Enemy/3 Final_Enemy/1.Introduce/7.png',
        'img/2.Enemy/3 Final_Enemy/1.Introduce/8.png',
        'img/2.Enemy/3 Final_Enemy/1.Introduce/9.png',
        'img/2.Enemy/3 Final_Enemy/1.Introduce/10.png'
    ];

    IMAGES_BOSS_SWIM = [
        'img/2.Enemy/3 Final_Enemy/2.floating/1.png',
        'img/2.Enemy/3 Final_Enemy/2.floating/2.png',
        'img/2.Enemy/3 Final_Enemy/2.floating/3.png',
        'img/2.Enemy/3 Final_Enemy/2.floating/4.png',
        'img/2.Enemy/3 Final_Enemy/2.floating/5.png',
        'img/2.Enemy/3 Final_Enemy/2.floating/6.png',
        'img/2.Enemy/3 Final_Enemy/2.floating/7.png',
        'img/2.Enemy/3 Final_Enemy/2.floating/8.png',
        'img/2.Enemy/3 Final_Enemy/2.floating/9.png',
        'img/2.Enemy/3 Final_Enemy/2.floating/10.png',
        'img/2.Enemy/3 Final_Enemy/2.floating/11.png',
        'img/2.Enemy/3 Final_Enemy/2.floating/12.png',
        'img/2.Enemy/3 Final_Enemy/2.floating/13.png'
    ];

    IMAGES_BOSS_ATTACK = [
        'img/2.Enemy/3 Final_Enemy/Attack/1.png',
        'img/2.Enemy/3 Final_Enemy/Attack/2.png',
        'img/2.Enemy/3 Final_Enemy/Attack/3.png',
        'img/2.Enemy/3 Final_Enemy/Attack/4.png',
        'img/2.Enemy/3 Final_Enemy/Attack/5.png',
        'img/2.Enemy/3 Final_Enemy/Attack/6.png'
    ];

    IMAGES_BOSS_DEAD = [
        'img/2.Enemy/3 Final_Enemy/Dead/1.png',
        'img/2.Enemy/3 Final_Enemy/Dead/2.png',
        'img/2.Enemy/3 Final_Enemy/Dead/3.png',
        'img/2.Enemy/3 Final_Enemy/Dead/4.png',
        'img/2.Enemy/3 Final_Enemy/Dead/5.png',
        'img/2.Enemy/3 Final_Enemy/Dead/6.png'
    ];

    IMAGES_BOSS_HURT = [
        'img/2.Enemy/3 Final_Enemy/Hurt/1.png',
        'img/2.Enemy/3 Final_Enemy/Hurt/2.png',
        'img/2.Enemy/3 Final_Enemy/Hurt/3.png',
        'img/2.Enemy/3 Final_Enemy/Hurt/4.png'
    ];

    constructor() { //super wird geschrieben, wenn Methoden vom ??bergeordneten obejkt aufgerufen werden sollen
        super().loadImage(this.IMAGES_BOSS_SWIM[0]);
        this.loadImages(this.IMAGES_BOSS_SWIM);
        this.x = 700;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOSS_SWIM);
        }, 1000);
    };
}
class JellyFish extends MovableObject {

    height = 120;
    width = 130;

    IMAGES_JELLYFISH_LILA = [
        './img/2.Enemy/2_Jellyfish/Regular_damage/Lila_1.png',
        './img/2.Enemy/2_Jellyfish/Regular_damage/Lila_2.png',
        './img/2.Enemy/2_Jellyfish/Regular_damage/Lila_3.png',
        './img/2.Enemy/2_Jellyfish/Regular_damage/Lila_4.png'
    ];

    IMAGES_JELLYFISH_LILA_DEAD = [
        './img/2.Enemy/2_Jellyfish/Dead/Lila/L1.png',
        './img/2.Enemy/2_Jellyfish/Dead/Lila/L2.png',
        './img/2.Enemy/2_Jellyfish/Dead/Lila/L3.png',
        './img/2.Enemy/2_Jellyfish/Dead/Lila/L4.png'
    ];

    offset = {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
    }

    constructor(x, y) {
        super().loadImage(this.IMAGES_JELLYFISH_LILA[0]);
        this.loadImages(this.IMAGES_JELLYFISH_LILA);
        this.loadImages(this.IMAGES_JELLYFISH_LILA_DEAD);
        this.x = x;
        this.y = y;
        this.speed = 0.15 + Math.random() * 0.15;
        this.animate();
        this.jellyDead = false;
    }

    animate() {
        this.animateJellyFish();
        this.animatedJellyFishId = setInterval(() => {
            this.playAnimation(this.IMAGES_JELLYFISH_LILA);
        }, 1000);

        this.animatedJellyFishIdDead = setInterval(() => {
            if (this.jellyDead) 
                this.deadJelly();
        }, 1000);
    }

    animateJellyFish() {
        let startY = this.y;
        let time = 0;
        this.animatedJellyFishIdMotion = setInterval(() => {
            time += 1;
            this.y = startY + Math.sin(time / 50) * 20;
        }, 1000 / 60);
    }

    deadJelly() {
        clearInterval(this.animatedJellyFishId);
        this.playAnimation(this.IMAGES_JELLYFISH_LILA_DEAD);
    }
}
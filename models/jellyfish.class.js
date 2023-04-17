class JellyFish extends MovableObject {

    height = 120;
    width = 130;

    //Jellyfish

    IMAGES_JELLYFISH_YELLOW = [
        'img/2.Enemy/2_Jellyfish/Regular_damage/Yellow_1.png',
        'img/2.Enemy/2_Jellyfish/Regular_damage/Yellow_2.png',
        'img/2.Enemy/2_Jellyfish/Regular_damage/Yellow_3.png',
        'img/2.Enemy/2_Jellyfish/Regular_damage/Yellow_4.png'
    ];

    IMAGES_JELLYFISH_LILA = [
        'img/2.Enemy/2_Jellyfish/Regular_damage/Lila_1.png',
        'img/2.Enemy/2_Jellyfish/Regular_damage/Lila_2.png',
        'img/2.Enemy/2_Jellyfish/Regular_damage/Lila_3.png',
        'img/2.Enemy/2_Jellyfish/Regular_damage/Lila_4.png'
    ];

    IMAGES_JELLYFISH_GREEN = [
        'img/2.Enemy/2_Jellyfish/dangerous/Green1.png',
        'img/2.Enemy/2_Jellyfish/dangerous/Green2.png',
        'img/2.Enemy/2_Jellyfish/dangerous/Green3.png',
        'img/2.Enemy/2_Jellyfish/dangerous/Green4.png'
    ];

    IMAGES_JELLYFISH_PINK = [
        'img/2.Enemy/2_Jellyfish/dangerous/Pink1.png',
        'img/2.Enemy/2_Jellyfish/dangerous/Pink2.png',
        'img/2.Enemy/2_Jellyfish/dangerous/Pink3.png',
        'img/2.Enemy/2_Jellyfish/dangerous/Pink4.png'
    ];

    IMAGES_JELLYFISH_YELLOW_DEAD = [
        'img/2.Enemy/2_Jellyfish/Dead/Yellow/y1.png',
        'img/2.Enemy/2_Jellyfish/Dead/Yellow/y2.png',
        'img/2.Enemy/2_Jellyfish/Dead/Yellow/y3.png',
        'img/2.Enemy/2_Jellyfish/Dead/Yellow/y4.png'
    ];

    IMAGES_JELLYFISH_LILA_DEAD = [
        'img/2.Enemy/2_Jellyfish/Dead/Lila/L1.png',
        'img/2.Enemy/2_Jellyfish/Dead/Lila/L2.png',
        'img/2.Enemy/2_Jellyfish/Dead/Lila/L3.png',
        'img/2.Enemy/2_Jellyfish/Dead/Lila/L4.png'
    ];

    IMAGES_JELLYFISH_GREEN_DEAD = [
        'img/2.Enemy/2_Jellyfish/Dead/green/g1.png',
        'img/2.Enemy/2_Jellyfish/Dead/green/g2.png',
        'img/2.Enemy/2_Jellyfish/Dead/green/g3.png',
        'img/2.Enemy/2_Jellyfish/Dead/green/g4.png'
    ];

    IMAGES_JELLYFISH_PINK_DEAD = [
        'img/2.Enemy/2_Jellyfish/Dead/Pink/P1.png',
        'img/2.Enemy/2_Jellyfish/Dead/Pink/P2.png',
        'img/2.Enemy/2_Jellyfish/Dead/Pink/P3.png',
        'img/2.Enemy/2_Jellyfish/Dead/Pink/P4.png'
    ];

    constructor() { //super wird geschrieben, wenn Methoden vom übergeordneten obejkt aufgerufen werden sollen
        super().loadImage('img/2.Enemy/2_Jellyfish/Regular_damage/Lila_1.png');
        this.loadImages(this.IMAGES_JELLYFISH_LILA);
        this.x = 200 + Math.random() * 400 - 1; //immer Zahl zwischen 200 und 700
        this.y = 200 + Math.random() * 200 - 1;
        this.speed = 0.15 + Math.random() * 0.15;
        this.animate();
    }

    animate() {
        this.animateJellyFish();
        setInterval(() => {
            this.playAnimation(this.IMAGES_JELLYFISH_LILA);
        }, 1000);
    }
}
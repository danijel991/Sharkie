class Fish extends MovableObject {

    height = 120;
    width = 130;
    y = 250;

    //Pufferfish

    IMAGES_PUFFERFISH_SWIM = [
        'img/2.Enemy/1.Pufferfish/1.Swim/1.swim1.png',
        'img/2.Enemy/1.Pufferfish/1.Swim/1.swim2.png',
        'img/2.Enemy/1.Pufferfish/1.Swim/1.swim3.png',
        'img/2.Enemy/1.Pufferfish/1.Swim/1.swim4.png',
        'img/2.Enemy/1.Pufferfish/1.Swim/1.swim5.png'
    ];

    IMAGES_PUFFERFISH_TRANSITION = [
        'img/2.Enemy/1.Pufferfish/2.transition/1.transition1.png',
        'img/2.Enemy/1.Pufferfish/2.transition/1.transition2.png',
        'img/2.Enemy/1.Pufferfish/2.transition/1.transition3.png',
        'img/2.Enemy/1.Pufferfish/2.transition/1.transition4.png',
        'img/2.Enemy/1.Pufferfish/2.transition/1.transition5.png',
    ]

    IMAGES_PUFFERFISH_BUBBLESWIM = [
        'img/2.Enemy/1.Pufferfish/3.Bubbleeswim/1.bubbleswim1.png',
        'img/2.Enemy/1.Pufferfish/3.Bubbleeswim/1.bubbleswim2.png',
        'img/2.Enemy/1.Pufferfish/3.Bubbleeswim/1.bubbleswim3.png',
        'img/2.Enemy/1.Pufferfish/3.Bubbleeswim/1.bubbleswim4.png',
        'img/2.Enemy/1.Pufferfish/3.Bubbleeswim/1.bubbleswim5.png'
    ];

    IMAGES_PUFFERFISH_DEAD = [
        'img/2.Enemy/1.Pufferfish/4.DIE/1.png',
        'img/2.Enemy/1.Pufferfish/4.DIE/2.png',
        'img/2.Enemy/1.Pufferfish/4.DIE/3.png'
    ];

    //Jellyfish

    IMAGES_JELLYFISH_YELLOW = [
        'img/2.Enemy/2 Jellyfish/Regular damage/Yellow 1.png',
        'img/2.Enemy/2 Jellyfish/Regular damage/Yellow 2.png',
        'img/2.Enemy/2 Jellyfish/Regular damage/Yellow 3.png',
        'img/2.Enemy/2 Jellyfish/Regular damage/Yellow 4.png'
    ];

    IMAGES_JELLYFISH_LILA = [
        'img/2.Enemy/2 Jellyfish/Regular damage/Lila 1.png',
        'img/2.Enemy/2 Jellyfish/Regular damage/Lila 2.png',
        'img/2.Enemy/2 Jellyfish/Regular damage/Lila 3.png',
        'img/2.Enemy/2 Jellyfish/Regular damage/Lila 4.png'
    ];

    IMAGES_JELLYFISH_GREEN = [
        'img/2.Enemy/2 Jellyfish/Sгper dangerous/Green 1.png',
        'img/2.Enemy/2 Jellyfish/Sгper dangerous/Green 2.png',
        'img/2.Enemy/2 Jellyfish/Sгper dangerous/Green 3.png',
        'img/2.Enemy/2 Jellyfish/Sгper dangerous/Green 4.png'
    ];

    IMAGES_JELLYFISH_PINK = [
        'img/2.Enemy/2 Jellyfish/Sгper dangerous/Pink 1.png',
        'img/2.Enemy/2 Jellyfish/Sгper dangerous/Pink 2.png',
        'img/2.Enemy/2 Jellyfish/Sгper dangerous/Pink 3.png',
        'img/2.Enemy/2 Jellyfish/Sгper dangerous/Pink 4.png'
    ];

    IMAGES_JELLYFISH_YELLOW_DEAD = [
        'img/2.Enemy/2 Jellyfish/Dead/Yellow/y1.png',
        'img/2.Enemy/2 Jellyfish/Dead/Yellow/y2.png',
        'img/2.Enemy/2 Jellyfish/Dead/Yellow/y3.png',
        'img/2.Enemy/2 Jellyfish/Dead/Yellow/y4.png'
    ];

    IMAGES_JELLYFISH_LILA_DEAD = [
        'img/2.Enemy/2 Jellyfish/Dead/Lila/L1.png',
        'img/2.Enemy/2 Jellyfish/Dead/Lila/L2.png',
        'img/2.Enemy/2 Jellyfish/Dead/Lila/L3.png',
        'img/2.Enemy/2 Jellyfish/Dead/Lila/L4.png'
    ];

    IMAGES_JELLYFISH_GREEN_DEAD = [
        'img/2.Enemy/2 Jellyfish/Dead/green/g1.png',
        'img/2.Enemy/2 Jellyfish/Dead/green/g2.png',
        'img/2.Enemy/2 Jellyfish/Dead/green/g3.png',
        'img/2.Enemy/2 Jellyfish/Dead/green/g4.png'
    ];

    IMAGES_JELLYFISH_PINK_DEAD = [
        'img/2.Enemy/2 Jellyfish/Dead/Pink/P1.png',
        'img/2.Enemy/2 Jellyfish/Dead/Pink/P2.png',
        'img/2.Enemy/2 Jellyfish/Dead/Pink/P3.png',
        'img/2.Enemy/2 Jellyfish/Dead/Pink/P4.png'
    ];


    constructor() { //super wird geschrieben, wenn Methoden vom übergeordneten obejkt aufgerufen werden sollen
        super().loadImage('img/2.Enemy/1.Pufferfish/1.Swim/1.swim1.png');
        this.loadImages(this.IMAGES_PUFFERFISH_SWIM);
        this.x = 200 + Math.random() * 400 - 1; //immer Zahl zwischen 200 und 700
        this.speed = 0.15 + Math.random() * 0.15;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_PUFFERFISH_SWIM);
        }, 1000);
    }
}
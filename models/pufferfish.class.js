class PufferFish extends MovableObject {

    height = 120;
    width = 130;

    //Pufferfish

    IMAGES_PUFFERFISH_SWIM = [
        './img/2.Enemy/1_Pufferfish/1.Swim/1.swim1.png',
        './img/2.Enemy/1_Pufferfish/1.Swim/1.swim2.png',
        './img/2.Enemy/1_Pufferfish/1.Swim/1.swim3.png',
        './img/2.Enemy/1_Pufferfish/1.Swim/1.swim4.png',
        './img/2.Enemy/1_Pufferfish/1.Swim/1.swim5.png'
    ];

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
    ];

    IMAGES_PUFFERFISH_DEAD = [
        './img/2.Enemy/1_Pufferfish/4.DIE/1.png',
        './img/2.Enemy/1_Pufferfish/4.DIE/2.png',
        './img/2.Enemy/1_Pufferfish/4.DIE/3.png'
    ];

    offset = {
        top: 10,
        bottom: 30,
        left: 10,
        right: 10
    }


    constructor(x,y) { //super wird geschrieben, wenn Methoden vom übergeordneten obejkt aufgerufen werden sollen
        super().loadImage('./img/2.Enemy/1_Pufferfish/1.Swim/1.swim1.png');
        this.loadImages(this.IMAGES_PUFFERFISH_SWIM);
        // this.x = 200 + Math.random() * 1500 - 1; //immer Zahl zwischen 200 und 700
        // this.y = 200 + Math.random() * 200 - 1;
        this.x=x;
        this.y=y;
        this.speed = 0.15 + Math.random() * 0.15;
        this.animate();
    }

    animate() {
        this.animatedPuffFisLefthId = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        this.animatedPuffFishId = setInterval(() => {
            this.playAnimation(this.IMAGES_PUFFERFISH_SWIM);
        }, 1000);
    }
}
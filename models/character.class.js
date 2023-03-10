class Character extends MovableObject {
    y = 50;
    x = 0;
    height = 210;
    width = 150;
    speed = 3;

    //images of character
    IMAGES_SWIMMING = [
        'img/1.Sharkie/3.Swim/1.png',
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/4.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png'
    ];

    IMAGES_IDLE = [
        'img/1.Sharkie/1.IDLE/1.png',
        'img/1.Sharkie/1.IDLE/2.png',
        'img/1.Sharkie/1.IDLE/3.png',
        'img/1.Sharkie/1.IDLE/4.png',
        'img/1.Sharkie/1.IDLE/5.png',
        'img/1.Sharkie/1.IDLE/6.png',
        'img/1.Sharkie/1.IDLE/7.png',
        'img/1.Sharkie/1.IDLE/8.png',
        'img/1.Sharkie/1.IDLE/9.png',
        'img/1.Sharkie/1.IDLE/10.png',
        'img/1.Sharkie/1.IDLE/11.png',
        'img/1.Sharkie/1.IDLE/12.png',
        'img/1.Sharkie/1.IDLE/13.png',
        'img/1.Sharkie/1.IDLE/14.png',
        'img/1.Sharkie/1.IDLE/15.png',
        'img/1.Sharkie/1.IDLE/16.png',
        'img/1.Sharkie/1.IDLE/17.png',
        'img/1.Sharkie/1.IDLE/18.png'
    ];
    IMAGES_LONG_IDLE = [
        'img/1.Sharkie/2.Long_IDLE/i1.png',
        'img/1.Sharkie/2.Long_IDLE/i2.png',
        'img/1.Sharkie/2.Long_IDLE/i3.png',
        'img/1.Sharkie/2.Long_IDLE/i4.png',
        'img/1.Sharkie/2.Long_IDLE/i5.png',
        'img/1.Sharkie/2.Long_IDLE/i6.png',
        'img/1.Sharkie/2.Long_IDLE/i7.png',
        'img/1.Sharkie/2.Long_IDLE/i8.png',
        'img/1.Sharkie/2.Long_IDLE/i9.png',
        'img/1.Sharkie/2.Long_IDLE/i10.png',
        'img/1.Sharkie/2.Long_IDLE/i11.png',
        'img/1.Sharkie/2.Long_IDLE/i12.png',
        'img/1.Sharkie/2.Long_IDLE/i13.png',
        'img/1.Sharkie/2.Long_IDLE/i14.png'
    ];

    IMAGES_ATTACK_BUBBLE = [
        'img/1.Sharkie/4.Attack/Bubble_trap/op1_(with_bubble_formation)/1.png',
        'img/1.Sharkie/4.Attack/Bubble_trap/op1_(with_bubble_formation)/2.png',
        'img/1.Sharkie/4.Attack/Bubble_trap/op1_(with_bubble_formation)/3.png',
        'img/1.Sharkie/4.Attack/Bubble_trap/op1_(with_bubble_formation)/4.png',
        'img/1.Sharkie/4.Attack/Bubble_trap/op1_(with_bubble_formation)/5.png',
        'img/1.Sharkie/4.Attack/Bubble_trap/op1_(with_bubble_formation)/6.png',
        'img/1.Sharkie/4.Attack/Bubble_trap/op1_(with_bubble_formation)/7.png',
        'img/1.Sharkie/4.Attack/Bubble_trap/op1_(with_bubble_formation)/8.png'
    ];

    IMAGES_ATTACK_FIN_SLAP = [
        'img/1.Sharkie/4.Attack/Fin_slap/1.png',
        'img/1.Sharkie/4.Attack/Fin_slap/2.png',
        'img/1.Sharkie/4.Attack/Fin_slap/3.png',
        'img/1.Sharkie/4.Attack/Fin_slap/4.png',
        'img/1.Sharkie/4.Attack/Fin_slap/5.png',
        'img/1.Sharkie/4.Attack/Fin_slap/6.png',
        'img/1.Sharkie/4.Attack/Fin_slap/7.png',
        'img/1.Sharkie/4.Attack/Fin_slap/8.png'
    ];

    IMAGES_HURT_POISONED = [

    ];
    IMAGES_HURT_ELECTRIC_SHOCK = [

    ];

    IMAGES_DEAD_POISONED = [
      'img/1.Sharkie/6.dead/1.Poisoned/1.png',
      'img/1.Sharkie/6.dead/1.Poisoned/2.png',
      'img/1.Sharkie/6.dead/1.Poisoned/3.png',
      'img/1.Sharkie/6.dead/1.Poisoned/4.png',
      'img/1.Sharkie/6.dead/1.Poisoned/5.png',
      'img/1.Sharkie/6.dead/1.Poisoned/6.png',
      'img/1.Sharkie/6.dead/1.Poisoned/7.png',
      'img/1.Sharkie/6.dead/1.Poisoned/8.png',
      'img/1.Sharkie/6.dead/1.Poisoned/9.png',
      'img/1.Sharkie/6.dead/1.Poisoned/10.png',
      'img/1.Sharkie/6.dead/1.Poisoned/11.png',
      'img/1.Sharkie/6.dead/1.Poisoned/12.png',
      'img/1.Sharkie/6.dead/1.Poisoned/1.png'
    ];
    IMAGES_DEAD_ELECTRIC_SHOCK = [
        'img/1.Sharkie/6.dead/2.Electro_shock/1.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/2.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/3.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/4.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/5.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/6.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/7.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/8.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/9.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/10.png'

    ];

    world;
    swimming_sound = new Audio('audio/char_swim.mp3');

    constructor() {
        super().loadImage('img/1.Sharkie/1.IDLE/1.png');
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_ATTACK_BUBBLE);
        this.loadImages(this.IMAGES_ATTACK_FIN_SLAP);
        this.loadImages(this.IMAGES_HURT_POISONED);
        this.loadImages(this.IMAGES_HURT_ELECTRIC_SHOCK);
        this.loadImages(this.IMAGES_DEAD_POISONED);
        this.loadImages(this.IMAGES_DEAD_ELECTRIC_SHOCK);
        this.applyGravity();
        this.animate();
    }

    animate() {
        setInterval(() => {
            // this.swimming_sound.pause();
            this.swimming_sound.volume = .5;
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.swimming_sound.play();
            } if (this.world.keyboard.LEFT && this.x > -100) {
                this.otherDirection = true;
                this.moveLeft();
                this.swimming_sound.play();
            } if (this.world.keyboard.UP && this.y > 0) {
                this.y -= this.speed;
                this.swimming_sound.play();
            } if (this.world.keyboard.DOWN && this.y < 250) {
                this.y += this.speed;
                this.swimming_sound.play();
            }
            this.world.camera_x = -this.x + 50;
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD_POISONED);
            } else if (this.world.keyboard.SPACE) {
                this.playAnimation(this.IMAGES_ATTACK_BUBBLE);
            }

            else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {
                // swim animation
                this.playAnimation(this.IMAGES_SWIMMING);
            }
        }, 1000 / 6);
    }
}
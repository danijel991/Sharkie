class Character extends MovableObject {
    y = 80;
    x = 1400;
    height = 210;
    width = 150;
    speed = 3;
    attack = 0;

    //images of character
    IMAGES_SWIMMING = [
        './img/1.Sharkie/3.Swim/1.png',
        './img/1.Sharkie/3.Swim/2.png',
        './img/1.Sharkie/3.Swim/3.png',
        './img/1.Sharkie/3.Swim/4.png',
        './img/1.Sharkie/3.Swim/5.png',
        './img/1.Sharkie/3.Swim/6.png'
    ];
    IMAGES_IDLE = [
        './img/1.Sharkie/1.IDLE/1.png',
        './img/1.Sharkie/1.IDLE/2.png',
        './img/1.Sharkie/1.IDLE/3.png',
        './img/1.Sharkie/1.IDLE/4.png',
        './img/1.Sharkie/1.IDLE/5.png',
        './img/1.Sharkie/1.IDLE/6.png',
        './img/1.Sharkie/1.IDLE/7.png',
        './img/1.Sharkie/1.IDLE/8.png',
        './img/1.Sharkie/1.IDLE/9.png',
        './img/1.Sharkie/1.IDLE/10.png',
        './img/1.Sharkie/1.IDLE/11.png',
        './img/1.Sharkie/1.IDLE/12.png',
        './img/1.Sharkie/1.IDLE/13.png',
        './img/1.Sharkie/1.IDLE/14.png',
        './img/1.Sharkie/1.IDLE/15.png',
        './img/1.Sharkie/1.IDLE/16.png',
        './img/1.Sharkie/1.IDLE/17.png',
        './img/1.Sharkie/1.IDLE/18.png'
    ];
    IMAGES_LONG_IDLE = [
        './img/1.Sharkie/2.Long_IDLE/i1.png',
        './img/1.Sharkie/2.Long_IDLE/i2.png',
        './img/1.Sharkie/2.Long_IDLE/i3.png',
        './img/1.Sharkie/2.Long_IDLE/i4.png',
        './img/1.Sharkie/2.Long_IDLE/i5.png',
        './img/1.Sharkie/2.Long_IDLE/i6.png',
        './img/1.Sharkie/2.Long_IDLE/i7.png',
        './img/1.Sharkie/2.Long_IDLE/i8.png',
        './img/1.Sharkie/2.Long_IDLE/i9.png',
        './img/1.Sharkie/2.Long_IDLE/i10.png',
        './img/1.Sharkie/2.Long_IDLE/i11.png',
        './img/1.Sharkie/2.Long_IDLE/i12.png',
        './img/1.Sharkie/2.Long_IDLE/i13.png',
        './img/1.Sharkie/2.Long_IDLE/i14.png'
    ];
    IMAGES_ATTACK_BUBBLE = [
        './img/1.Sharkie/4.Attack/Bubble_trap/op1_(with_bubble_formation)/1.png',
        './img/1.Sharkie/4.Attack/Bubble_trap/op1_(with_bubble_formation)/2.png',
        './img/1.Sharkie/4.Attack/Bubble_trap/op1_(with_bubble_formation)/3.png',
        './img/1.Sharkie/4.Attack/Bubble_trap/op1_(with_bubble_formation)/4.png',
        './img/1.Sharkie/4.Attack/Bubble_trap/op1_(with_bubble_formation)/5.png',
        './img/1.Sharkie/4.Attack/Bubble_trap/op1_(with_bubble_formation)/6.png',
        './img/1.Sharkie/4.Attack/Bubble_trap/op1_(with_bubble_formation)/7.png',
        './img/1.Sharkie/4.Attack/Bubble_trap/op1_(with_bubble_formation)/8.png'
    ];
    IMAGES_ATTACK_FIN_SLAP = [
        './img/1.Sharkie/4.Attack/Fin_slap/1.png',
        './img/1.Sharkie/4.Attack/Fin_slap/2.png',
        './img/1.Sharkie/4.Attack/Fin_slap/3.png',
        './img/1.Sharkie/4.Attack/Fin_slap/4.png',
        './img/1.Sharkie/4.Attack/Fin_slap/5.png',
        './img/1.Sharkie/4.Attack/Fin_slap/6.png',
        './img/1.Sharkie/4.Attack/Fin_slap/7.png',
        './img/1.Sharkie/4.Attack/Fin_slap/8.png'
    ];
    IMAGES_HURT_POISONED = [
        './img/1.Sharkie/5.Hurt/1.Poisoned/1.png',
        './img/1.Sharkie/5.Hurt/1.Poisoned/2.png',
        './img/1.Sharkie/5.Hurt/1.Poisoned/3.png',
        './img/1.Sharkie/5.Hurt/1.Poisoned/4.png',
        './img/1.Sharkie/5.Hurt/1.Poisoned/5.png'
    ];
    IMAGES_HURT_ELECTRIC_SHOCK = [
        'img/1.Sharkie/5.Hurt/2.Electric_shock/1.png',
        'img/1.Sharkie/5.Hurt/2.Electric_shock/2.png',
        'img/1.Sharkie/5.Hurt/2.Electric_shock/3.png'
    ];
    IMAGES_DEAD_POISONED = [
        './img/1.Sharkie/6.dead/1.Poisoned/1.png',
        './img/1.Sharkie/6.dead/1.Poisoned/2.png',
        './img/1.Sharkie/6.dead/1.Poisoned/3.png',
        './img/1.Sharkie/6.dead/1.Poisoned/4.png',
        './img/1.Sharkie/6.dead/1.Poisoned/5.png',
        './img/1.Sharkie/6.dead/1.Poisoned/6.png',
        './img/1.Sharkie/6.dead/1.Poisoned/7.png',
        './img/1.Sharkie/6.dead/1.Poisoned/8.png',
        './img/1.Sharkie/6.dead/1.Poisoned/9.png',
        './img/1.Sharkie/6.dead/1.Poisoned/10.png',
        './img/1.Sharkie/6.dead/1.Poisoned/11.png',
        './img/1.Sharkie/6.dead/1.Poisoned/12.png',
        './img/1.Sharkie/6.dead/1.Poisoned/1.png'
    ];
    IMAGES_DEAD_ELECTRIC_SHOCK = [
        './img/1.Sharkie/6.dead/2.Electro_shock/1.png',
        './img/1.Sharkie/6.dead/2.Electro_shock/2.png',
        './img/1.Sharkie/6.dead/2.Electro_shock/3.png',
        './img/1.Sharkie/6.dead/2.Electro_shock/4.png',
        './img/1.Sharkie/6.dead/2.Electro_shock/5.png',
        './img/1.Sharkie/6.dead/2.Electro_shock/6.png',
        './img/1.Sharkie/6.dead/2.Electro_shock/7.png',
        './img/1.Sharkie/6.dead/2.Electro_shock/8.png',
        './img/1.Sharkie/6.dead/2.Electro_shock/9.png',
        './img/1.Sharkie/6.dead/2.Electro_shock/10.png'
    ];

    offset = {
        top: 100,
        bottom: 45,
        left: 25,
        right: 25
    }

    world;
    endboss = new Endboss();
    pufferfish = new PufferFish();
    jellyfish = new JellyFish();
    swimming_sound = new Audio('./audio/char_swim.mp3');
    hurt_sfx = new Audio('./audio/hurt.mp3');
    hurt_shocked_sfx = new Audio('./audio/shocked.mp3');
    bubble_sfx = new Audio('./audio/bubble_shot.mp3');
    characterIsHurt = false;
    characterIsHurtByJelly = false;
    attackedByBoss = false;
    electrized = false;


    constructor() {
        super().loadImage('./img/1.Sharkie/1.IDLE/1.png');
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_ATTACK_BUBBLE);
        this.loadImages(this.IMAGES_ATTACK_FIN_SLAP);
        this.loadImages(this.IMAGES_HURT_POISONED);
        this.loadImages(this.IMAGES_HURT_ELECTRIC_SHOCK);
        this.loadImages(this.IMAGES_DEAD_POISONED);
        this.loadImages(this.IMAGES_DEAD_ELECTRIC_SHOCK);
        this.animate();
    }

    animate() {

        this.swimming_sound.volume = .5;
        this.bubble_sfx.volume = .3;
        this.hurt_shocked_sfx.volume = .3;

        this.animateIntervalId = setInterval(() => {

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

        this.keyboardIntervalId = setInterval(() => {

            if (this.electrized == true && this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD_ELECTRIC_SHOCK);
                this.stopGame();

            } else if (this.electrized == false && this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD_POISONED);
                this.stopGame();

            } else if (this.characterIsHurt == true) {
                this.playAnimation(this.IMAGES_HURT_POISONED);
                this.hurt_sfx.play();
                this.characterIsHurt = false;

            } else if (this.characterIsHurtByJelly == true) {
                this.playAnimation(this.IMAGES_HURT_ELECTRIC_SHOCK);
                this.hurt_shocked_sfx.play();
                this.characterIsHurtByJelly = false;

            } else if (this.attackedByBoss == true) {
                this.playAnimation(this.IMAGES_HURT_POISONED);

                this.hurt_sfx.play();
                this.attackedByBoss = false;

            } else if (this.world.keyboard.SPACE) {
                this.playAnimation(this.IMAGES_ATTACK_FIN_SLAP);

            } else if (this.world.keyboard.D && this.poisonsAmount >= 1 && this.otherDirection == false && this.energy >= 1) {
                this.playAnimation(this.IMAGES_ATTACK_BUBBLE);
                setTimeout(() => {
                    this.bubble_sfx.play();
                }, 150);
            }

            else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {

                this.playAnimation(this.IMAGES_SWIMMING);

            } else
                this.checkIdle();

        }, 500);
    }

    checkIdle() {
        // setTimeout(this.animateIdle(), 3000);
        this.animateIdle();

    }
    checkIdleLong() {
        this.animateIdleLong();
        // setTimeout(this.animateIdleLong(), 5000);
    }

    animateIdle() {
        console.log('Idle');
        this.playAnimation(this.IMAGES_IDLE);
    }
    animateIdleLong() {
        console.log('IdleLong');
        this.playAnimation(this.IMAGES_LONG_IDLE);
    }

    stopGame() {
        setTimeout(() => {
            console.log("GAME OVER");
            clearInterval(this.animateIntervalId);
            clearInterval(this.keyboardIntervalId);
            clearInterval(this.jellyfish.animatedJellyFishId); //need to be fixed
            clearInterval(this.pufferfish.animatedPuffFishId); //need to be fixed
            clearInterval(this.pufferfish.animatedPuffFisLefthId); //need to be fixed
        }, 1000);
    }
}
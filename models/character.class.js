class Character extends MovableObject {
    y = 80;
    x = 1000;
    height = 210;
    width = 150;
    speed = 3;
    attack = 0;

    offset = {
        top: 100,
        bottom: 45,
        left: 25,
        right: 25
    }

    world;
    assets;
    characterIsHurt = false;
    characterIsHurtByJelly = false;
    attackedByBoss = false;
    electrized = false;
    slap = false;
    checkAlreadyRunning = false;
    spaceAlreadyPressed = false;

    constructor(world, assets) {
        super().loadImage('./img/1.Sharkie/2.Long_IDLE/idle_long_(1).png');
        this.world = world;
        this.assets = assets;
        this.loadImages(this.assets.IMAGES_SWIMMING);
        this.loadImages(this.assets.IMAGES_IDLE);
        this.loadImages(this.assets.IMAGES_LONG_IDLE);
        this.loadImages(this.assets.IMAGES_ATTACK_BUBBLE);
        this.loadImages(this.assets.IMAGES_ATTACK_FIN_SLAP);
        this.loadImages(this.assets.IMAGES_HURT_POISONED);
        this.loadImages(this.assets.IMAGES_HURT_ELECTRIC_SHOCK);
        this.loadImages(this.assets.IMAGES_DEAD_POISONED);
        this.loadImages(this.assets.IMAGES_DEAD_ELECTRIC_SHOCK);
        this.animate();
    }

    animate() {
        this.animateIntervalId = setInterval(() => this.characterMotion(), 1000 / 60);
        this.keyboardIntervalId = setInterval(() => this.characterAnimation(), 225);
    }

    characterMotion() {
        if (this.canMoveRight())
            this.moveRight();
        if (this.canMoveLeft())
            this.moveLeft();
        if (this.canMoveUp())
            this.moveUp();
        if (this.canMoveDown())
            this.moveDown();

        this.world.camera_x = -this.x + 100;
    }

    moveRight() {
        super.moveRight();
        swimming_sound.play();
        this.otherDirection = false;
    }
    moveLeft() {
        super.moveLeft();
        swimming_sound.play();
        this.otherDirection = true;
    }
    moveUp() {
        this.y -= this.speed;
        swimming_sound.play();
    }
    moveDown() {
        this.y += this.speed;
        swimming_sound.play();
    }

    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > -100;
    }
    canMoveUp() {
        return this.world.keyboard.UP && this.y > 0;
    }
    canMoveDown() {
        return this.world.keyboard.DOWN && this.y < 250;
    }

    characterAnimation() {
        if (this.isCharacterDeadElectrized()) {
            this.playDead();
        } else if (this.isCharacterDead()) {
            this.playDeadPoisoned();
        } else if (this.isCharacterHurt()) {
            this.playHurtAnimation();
        } else if (this.characterIsHurtByJelly == true) {
            this.playHurtAnimationJelly();
        } else if (this.attackedByBoss == true) {
            this.playHurtByBoss();
        } else if (this.world.keyboard.SPACE) {
            this.playAttackFinSlap();
        } else if (this.world.keyboard.D && this.poisonsAmount >= 1 && this.otherDirection == false && this.energy >= 1) {
            this.playAttackBubble();
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {
            this.playAnimation(this.assets.IMAGES_SWIMMING);
        } else if (this.noKeyIsPressed() && !this.isDead()) {
            this.idleTimer = (this.idleTimer || 0) + 1;
            if (this.idleTimer >= 15) { // 180 frames = 3 seconds
                this.playAnimation(this.assets.IMAGES_LONG_IDLE);
            } else {
                this.playAnimation(this.assets.IMAGES_IDLE);
            }
        } else {
            this.idleTimer = 0;
        }
    }

    isCharacterDeadElectrized() {
        return this.electrized == true && this.isDead();
    }
    isCharacterDead() {
        return this.electrized == false && this.isDead();
    }
    isCharacterHurt() {
        return this.characterIsHurt == true;
    }

    playDead() {
        this.playAnimation(this.assets.IMAGES_DEAD_ELECTRIC_SHOCK);
        stopGame(2);
    }

    playDeadPoisoned() {
        this.playAnimation(this.assets.IMAGES_DEAD_POISONED);
        stopGame(2);
    }

    playHurtAnimation() {
        this.playAnimation(this.assets.IMAGES_HURT_POISONED);
        hurt_sfx.play();
        this.characterIsHurt = false;
    }

    playHurtAnimationJelly() {
        this.playAnimation(this.assets.IMAGES_HURT_ELECTRIC_SHOCK);
        hurt_shocked_sfx.play();
        this.characterIsHurtByJelly = false;
    }

    playHurtByBoss() {
        this.playAnimation(this.assets.IMAGES_HURT_POISONED);
        hurt_sfx.play();
        this.attackedByBoss = false;
    }

    playAttackFinSlap() {
        this.activateSpace();
        this.playAnimation(this.assets.IMAGES_ATTACK_FIN_SLAP);
        this.spaceAlreadyPressed = true;
    }

    playAttackBubble() {
        this.playAnimation(this.assets.IMAGES_ATTACK_BUBBLE);
        setTimeout(() => {
            bubble_sfx.play();
        }, 150);
    }

    activateAttack() {
        if (!this.attacked) {
            this.currentImage = 0;
            let DIsPressed = setInterval(() => {
                this.attacked = true;
                this.world.keyboard.D = true;
            }, 100)

            setTimeout(() => {

                clearInterval(DIsPressed)
                this.attacked = false;
                this.world.keyboard.D = false;
            }, 400)
        }
    }

    activateSpace() {
        if (!this.checkAlreadyRunning) {
            this.currentImage = 0;
            let spacePressed = setInterval(() => {
                this.world.keyboard.SPACE = true;
                this.checkAlreadyRunning = true;
            }, 100)

            setTimeout(() => {
                this.world.keyboard.SPACE = false;
                this.checkAlreadyRunning = false;
                clearInterval(spacePressed)
                this.spaceAlreadyPressed = false;
            }, 800)
        }
    }

    checkMovementKeyIsPressed() {
        return this.world.keyboard.RIGHT ||
            this.world.keyboard.LEFT ||
            this.world.keyboard.UP ||
            this.world.keyboard.DOWN
    }

    noKeyIsPressed() {
        return !this.world.keyboard.RIGHT &&
            !this.world.keyboard.LEFT &&
            !this.world.keyboard.UP &&
            !this.world.keyboard.DOWN &&
            !this.spaceAlreadyPressed &&
            !this.world.keyboard.D
    }
}
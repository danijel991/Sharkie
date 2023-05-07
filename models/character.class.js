class Character extends MovableObject {
    y = 80;
    x = 0;
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
    checkDAlreadyRunning = false;
    dAlreadyPressed = false;

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
    }

    animate() {
        this.animateIntervalId = setInterval(() => this.characterMotion(), 1000 / 60);
        this.keyboardIntervalId = setInterval(() => this.characterAnimation(), 100);
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
        } else if (this.characterIsHurtByJelly) {
            this.playHurtAnimationJelly();
        } else if (this.attackedByBoss) {
            this.playHurtByBoss();
        } else if (this.world.keyboard.SPACE) {
            this.playAttackFinSlap();
        } else if (this.world.keyboard.D && this.poisonsAmount >= 1 && !this.otherDirection && this.energy >= 1) {
            this.playAttackBubble();
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {
            this.playAnimation(this.assets.IMAGES_SWIMMING);
        } else if (this.noKeyIsPressed() && !this.isDead()) {
            this.idleTimer = (this.idleTimer || 0) + 1;
            if (this.idleTimer >= 20) {
                this.playAnimation(this.assets.IMAGES_LONG_IDLE);
            } else {
                this.playAnimation(this.assets.IMAGES_IDLE);
            }
        } else {
            this.idleTimer = 0;
        }
    }

    isCharacterDeadElectrized() {
        return this.electrized && this.isDead();
    }
    isCharacterDead() {
        return !this.electrized && this.isDead();
    }
    isCharacterHurt() {
        return this.characterIsHurt;
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
                slap_sfx.play();
            }, 800)
        }
    }

    playAttackBubble() {
        this.activateD();
        this.playAnimation(this.assets.IMAGES_ATTACK_BUBBLE);
        this.dAlreadyPressed = true;
    }

    activateD() {
        if (!this.checkDAlreadyRunning) {
            this.currentImage = 0;
            let DPressed = setInterval(() => {
                this.world.keyboard.D = true;
                this.checkDAlreadyRunning = true;
            }, 100)

            setTimeout(() => {
                this.world.keyboard.D = false;
                this.checkDAlreadyRunning = false;
                clearInterval(DPressed)
                this.dAlreadyPressed = false;
                bubble_sfx.play();
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
            !this.dAlreadyPressed &&
            !this.world.keyboard.D
    }
}
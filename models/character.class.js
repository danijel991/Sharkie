/**
 * Class for character
 */
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
    idleTimer = 0;

    /**
     * Loads the resources, parameters,... for the respective object
     * @param {*} world - gets the data from world
     * @param {*} assets - gets the data from assets
     */
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

    /**
     * animateIntervalId: The ID of the interval used to update the character's motion.
     * keyboardIntervalId: The ID of the interval used to update the character's animation.
     */
    animate() {
        this.animateIntervalId = setInterval(() => this.characterMotion(), 1000 / 60);
        this.keyboardIntervalId = setInterval(() => this.characterAnimation(), 100);
        this.idleTimerID = setInterval(() => this.characterIdleTimer(), 100);
    }

    /**
     * x,y change depending on movement
     */
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
        this.resetTimer();
    }
    moveLeft() {
        super.moveLeft();
        swimming_sound.play();
        this.otherDirection = true;
        this.resetTimer();
    }
    moveUp() {
        this.y -= this.speed;
        swimming_sound.play();
        this.resetTimer();
    }
    moveDown() {
        this.y += this.speed;
        swimming_sound.play();
        this.resetTimer();
    }

    /**
     * 
     * @returns Checks if the object moves to the right
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }
    
    /**
     * 
     * @returns Checks if the object moves to the left
     */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > -100;
    }
    /**
     * 
     * @returns Checks if the object moves to the up
     */
    canMoveUp() {
        return this.world.keyboard.UP && this.y > 0;
    }
    /**
     * 
     * @returns Checks if the object moves to the down
     */
    canMoveDown() {
        return this.world.keyboard.DOWN && this.y < 250;
    }

    /**
     * Animation depending on action
     */
    characterAnimation() {
        if (this.isCharacterDeadElectrized()) {
            this.playDeadElectrized();
        } else if (this.isCharacterDead()) {
            this.playDead();
        } else if (this.isCharacterHurt()) {
            this.playHurtAnimation();
        } else if (this.characterIsHurtByJelly) {
            this.playHurtAnimationElectric();
        } else if (this.attackedByBoss) {
            this.playHurtByBoss();
        } else if (this.world.keyboard.SPACE) {
            this.playAttackFinSlap();
        } else if (this.world.keyboard.D && this.poisonsAmount >= 1 && !this.otherDirection && this.energy >= 1) {
            this.playAttackBubble();
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {
            this.playAnimation(this.assets.IMAGES_SWIMMING);
        } else if (!this.isDead() && this.idleTimer >= 40)
            this.playAnimation(this.assets.IMAGES_LONG_IDLE);
        if (this.idleTimer >= 20 && !this.isDead()) {
            this.playAnimation(this.assets.IMAGES_LONG_IDLE);
        }
        else this.playAnimation(this.assets.IMAGES_IDLE);
    }

    /**
     * Counts frames after motion, 20 and above triggers long_idle_
     */
    characterIdleTimer() {
        this.idleTimer = (this.idleTimer || 0) + 1;
        console.log("characterIdleTimer" + this.idleTimer);
    }

    /**
     * resets idle timer
     */
    resetTimer() {
        this.idleTimer = 0;
    }

    /**
     * 
     * @returns Checks if the character dies in the electrified state, then plays the dead animation electrized
     */
    isCharacterDeadElectrized() {
        return this.electrized && this.isDead();
    }
    /**
     * 
     * @returns Checks if the character dies in "normal" state, then plays the dead animation
     */
    isCharacterDead() {
        return !this.electrized && this.isDead();
    }
    /**
     * 
     * @returns Checks if the character is in "normal" violation
     */
    isCharacterHurt() {
        return this.characterIsHurt;
    }
    /**
     * Play the electrified dead animation
     */
    playDeadElectrized() {
        this.playAnimation(this.assets.IMAGES_DEAD_ELECTRIC_SHOCK);
        stopGame(2);
    }
    /**
     * Play the normal dead animation
     */
    playDead() {
        this.playAnimation(this.assets.IMAGES_DEAD_POISONED);
        stopGame(2);
    }
    /**
     * Play the hurt animation
     */
    playHurtAnimation() {
        this.playAnimation(this.assets.IMAGES_HURT_POISONED);
        hurt_sfx.play();
        this.characterIsHurt = false;
        this.resetTimer();
    }
    /**
     * Play the hurt electrified animation
     */
    playHurtAnimationElectric() {
        this.playAnimation(this.assets.IMAGES_HURT_ELECTRIC_SHOCK);
        hurt_shocked_sfx.play();
        this.characterIsHurtByJelly = false;
        this.resetTimer();
    }
    /**
     * Play the hurt from boss animation
     */
    playHurtByBoss() {
        this.playAnimation(this.assets.IMAGES_HURT_POISONED);
        hurt_sfx.play();
        this.attackedByBoss = false;
        this.resetTimer();
    }
    /**
     * Play the blow with fin animation
     */
    playAttackFinSlap() {
        this.activateSpace();
        this.playAnimation(this.assets.IMAGES_ATTACK_FIN_SLAP);
        this.spaceAlreadyPressed = true;
        this.resetTimer();
    }

    /**
     * This function activates the spacebar so that the player does not have to hold the spacebar until the slap ability is completed. 
     */
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

    /**
     * Play the bubble attack animation
     */
    playAttackBubble() {
        this.activateD();
        this.playAnimation(this.assets.IMAGES_ATTACK_BUBBLE);
        this.dAlreadyPressed = true;
        this.resetTimer();
    }

    /**
    * This function activates the space bar so that the player does not have to hold the D key until the bubble attack ability is completed. 
    */
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
}
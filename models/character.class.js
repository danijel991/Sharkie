/**
 * Class for character
 */
class Character extends MovableObject {
    y = 200;
    x = 0;
    height = 250;
    width = 180;
    speed = 3;
    attack = 0;

    offset = {
        top: 120,
        bottom: 55,
        left: 35,
        right: 35
    }

    world;
    assets;
    characterIsHurtByPufferfish = false;
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
        this.keyboardIntervalId = setInterval(() => this.characterAnimation(), 200);
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

    /**
     * character is moving right
     */
    moveRight() {
        super.moveRight();
        sounds.swimming_sound.play();
        this.otherDirection = false;
        this.resetTimer();
    }

    /**
     * character is moving left
     */
    moveLeft() {
        super.moveLeft();
        sounds.swimming_sound.play();
        this.otherDirection = true;
        this.resetTimer();
    }

    /**
     * character is moving up
     */
    moveUp() {
        this.y -= this.speed;
        sounds.swimming_sound.play();
        this.resetTimer();
    }

    /**
     * character is moving down
     */
    moveDown() {
        this.y += this.speed;
        sounds.swimming_sound.play();
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
            this.playHurtAnimation(1);
        } else if (this.characterIsHurtByJelly) {
            this.playHurtAnimation(2);
        } else if (this.attackedByBoss) {
            this.playHurtAnimation(3);
        } else if (this.world.keyboard.SPACE) {
            this.sharkieAttack(1);
        } else if (this.world.keyboard.D && this.poisonsAmount >= 1 && !this.otherDirection && this.energy >= 1) {
            this.sharkieAttack(2);
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {
            this.playAnimation(this.assets.IMAGES_SWIMMING);
        } else if (!this.isDead() && this.idleTimer >= 40)
            this.playAnimation(this.assets.IMAGES_LONG_IDLE);
        else this.playAnimation(this.assets.IMAGES_IDLE);
    }

    /**
     * Counts frames after motion, 20 and above triggers long_idle_
     */
    characterIdleTimer() {
        this.idleTimer = this.idleTimer + 1;
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
        return this.characterIsHurtByPufferfish;
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
     * Play the appropriate hurt animation based on the type of attack
     * @param {number} type - type of attack (1: pufferfish, 2: jellyfish, 3: endboss)
     */
    playHurtAnimation(type) {
        if (type == 1) {
            this.playHurtAnimationPufferfish();
        } else if (type == 2) {
            this.playHurtAnimationJellyfish();
        } else if (type == 3) {
            this.playHurtAnimationEndboss();
        }
    }

    /**
     * Set the interval to play the hurt animation for pufferfish attack
     */
    playHurtAnimationPufferfish() {
        let i = 0;
        this.currentImage = 0;
        let hurt = setInterval(() => {
            this.playAnimation(this.assets.IMAGES_HURT_POISONED);
        }, 100);
        setTimeout(() => {
            this.resetTimer();
            this.characterIsHurtByPufferfish = false;
            clearInterval(hurt);
            sounds.hurt_sfx.play();
            i++;
        }, 200);
    }

    /**
     * Set the interval to play the hurt animation for jellyfish attack
     */
    playHurtAnimationJellyfish() {
        let i = 0;
        this.currentImage = 0;
        let hurt = setInterval(() => {
            this.playAnimation(this.assets.IMAGES_HURT_ELECTRIC_SHOCK);
        }, 100);
        setTimeout(() => {
            this.resetTimer();
            this.characterIsHurtByJelly = false;
            clearInterval(hurt);
            sounds.hurt_shocked_sfx.play();
            i++;
        }, 200);
    }

    /**
     * Play the hurt animation for endboss attack
     */
    playHurtAnimationEndboss() {
        this.playAnimation(this.assets.IMAGES_HURT_POISONED);
        sounds.hurt_sfx.play();
        setTimeout(() => {
            this.attackedByBoss = false;
        }, 500);
        this.resetTimer();
    }

    sharkieAttack(type) {
        if (type == 1)
            this.playAttackFinSlap();
        else if (type == 2)
            this.playAttackBubble();
    }

    /**
 * Play the blow with fin animation
 */
    playAttackFinSlap() {
        if (!this.checkAlreadyRunning) this.activateSpace();
        this.playAnimation(this.assets.IMAGES_ATTACK_FIN_SLAP);
        this.spaceAlreadyPressed = true;
        this.resetTimer();
    }
    /**
     * This function activates the spacebar so that the player does not have to hold the spacebar until the slap ability is completed. 
     */
    activateSpace() {
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
            sounds.slap_sfx.play();
        }, 800)
    }

    /**
     * Play the bubble attack animation
     */
    playAttackBubble() {
        if (!this.checkDAlreadyRunning) this.activateD();
        sounds.bubble_sfx.play();
        this.playAnimation(this.assets.IMAGES_ATTACK_BUBBLE);
        this.dAlreadyPressed = true;
        this.resetTimer();
    }

    /**
    * This function activates the space bar so that the player does not have to hold the D key until the bubble attack ability is completed. 
    */
    activateD() {
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
        }, 800)
    }
}
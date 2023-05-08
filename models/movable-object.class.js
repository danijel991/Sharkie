    /**
     * Represents a movable object in the game.
     * @extends DrawableObject
     */
class MovableObject extends Drawableobject {
    /**
     * @property {number} speed - The current speed of the player
     * @property {boolean} otherDirection - Whether the player is moving in the opposite direction
     * @property {number} speedY - The current vertical speed of the player
     * @property {number} acceleration - The current acceleration of the player
     * @property {number} energy - The current energy of the player
     * @property {number} trashEnergy - The amount of energy the player gains from collecting trash
     * @property {number} coinsAmount - The current amount of coins the player has collected
     * @property {number} poisonsAmount - The current amount of poisons the player has collected
     */
    speed = 0.15;
    otherDirection = false;
    speedY = 1;
    accelecartion = 0;
    energy = 100;
    trashEnergy = 20;
    coinsAmount = 0;
    poisonsAmount = 0;

    /**
     * Sets the offset values for the object's collision detection.
     */
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

    /**
     * Checks if the object is above the ground.
     * @returns {boolean} - Returns true if the object is above the ground, false otherwise.
     */
    isAbouveGround() {
        return this.y < 0;
    }

    /**
     * Checks if the object is colliding with another object.
     * @param {Object} obj - The object to check collision with.
     * @returns {boolean} - Returns true if the objects are colliding, false otherwise.
     */
    isColliding(obj) {
        return this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
            this.y + this.height - this.offset.bottom > obj.y + obj.offset.top &&
            this.x + this.offset.left < obj.x + obj.width - obj.offset.right &&
            this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom;
    }

    /**
     * Reduces the energy of the object when hit by an object.
     * @param {number} amount - The amount of energy to reduce.
     */
    hit(amount) {
        this.energy -= amount;
        if (this.energy <= 0)
            this.energy = 0;
        else
            this.lastHit = new Date().getTime();
    }

    /**
     * Checks if the object is invulnerable.
     * @returns {boolean} - Returns true if the object is invulnerable, false otherwise.
     */
    isInvulnerable() {
        if (this.timepassed < 2)
            return true;
        else
            return false;
    }

    /**
     * Increases the amount of coins in the coin bar by 15.
     */
    fillCoinBar() {
        this.coinsAmount += 15;
        if (this.coinsAmount > 100)
            this.coinsAmount = 100;
    }

    /**
     * Increases the amount of poison in the poison bar by 30.
     */
    fillPoisonBar() {
        this.poisonsAmount += 30;
        if (this.poisonsAmount > 100)
            this.poisonsAmount = 100;
    }

    /**
     * Decreases the amount of poison in the poison bar by 10.
     */
    emptyPoisonbar() {
        this.poisonsAmount -= 10;
        if (this.poisonsAmount < 0)
            this.poisonsAmount = 0;
    }

    /**
    * Checks if the MovableObject is dead
    * @returns {boolean} True if energy is 0, false otherwise
    */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Plays animation by setting image of object's img property
     * @param {Array} images - array of image paths
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imgCache[path];
        this.currentImage++;
    }

    /**
     * Moves object to the right by increasing its x coordinate
     */
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    /**
     * Moves object to the left by decreasing its x coordinate
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Updates object's position and calls moveUpDown() or moveDownUP() based on direction
     */
    update() {
        super.update();

        if (this.direction === -1)
            this.moveUpDown();
        else
            this.moveDownUP();
    }

    /**
     * Animates the collectable objects by moving them up and down
     */
    animateCollectables() {
        let startY = this.y;
        let time = 0;
        setInterval(() => {
            time += 1;
            this.y = startY + Math.sin(time / 100) * 20;
        }, 1000 / 60);
    }
}

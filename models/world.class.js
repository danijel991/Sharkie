/**
 * A class representing the game world.
 */
class World {
    /**
     * The game class representing the game's state and objects.
     * @property {*} assets - The assets used by the game.
     * @property {Character} character - The game's character object.
     * @property {*} endboss - The end boss object.
     * @property {HealthBar} healthBar - The game's health bar object.
     * @property {CoinBar} coinBar - The game's coin bar object.
     * @property {Poisonbar} poisonbar - The game's poison bar object.
     * @property {Array} statusBar - An array containing the game's status bars.
     * @property {Coins} coin - The game's coin object.
     * @property {Poisons} poison - The game's poison object.
     * @property {Array} throwableObjects - An array containing the game's throwable objects.
     * @property {*} level - The current level object.
     * @property {*} canvas - The game's canvas object.
     * @property {*} ctx - The game's context object.
     * @property {*} keyboard - The keyboard object used by the game.
     * @property {number} camera_x - The game's camera x position.
     * @property {boolean} alreadyAttacking - A boolean indicating whether the character is already attacking.
     */

    assets;
    character = new Character(this, assets);
    endboss;
    healthBar = new HealthBar();
    coinBar = new CoinBar();
    poisonbar = new Poisonbar();
    statusBar = [this.healthBar, this.coinBar, this.poisonbar];
    coin = new Coins();
    poison = new Poisons();
    throwableObjects = [];
    level;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    alreadyAttacking = false;

    /**
    Creates a new World instance.
    @param {object} level - The level object.
    @param {HTMLCanvasElement} canvas - The canvas element to draw on.
    @param {Keyboard} keyboard - The keyboard object to listen for input.
    @param {object} assets - The assets object containing the images and sounds used in the game.
    @constructor
    */
    constructor(level, canvas, keyboard, assets) {
        this.level = level
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.assets = assets;
    }

    /**
     * Loads the necessary resources, sets up the world, and runs the game loop.
     */
    preLoad() {
        this.loadLevel();
        this.setWorld();
        this.run();
        this.draw();
    }

    /**
     * Sets the character's world to this world instance.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Sets the endboss property to the endboss object of the level.
     */
    loadLevel() {
        this.endboss = this.level.endboss;
    }

    /**
     * Runs the game loop, including collision checks with the character and various game objects.
     */
    run() {
        this.collisionWithCharacter();
        this.collisionWithObjects();
        this.checkThrowObjects();
        this.collisionWithBallistics();
    }


    /**
     * Sets an interval to check for throwable objects every 1000ms.
     */
    checkThrowObjects() {
        this.checkCollisionID = setInterval(() => {
            this.checkThrowObjectsBubble();
        }, 1000);
    }

    /**
     * Checks whether the user has pressed the "D" key and has at least one poison, and creates a new throwable object if so.
     */
    checkThrowObjectsBubble() {
        if (this.keyboard.D && this.character.poisonsAmount >= 1 && !this.character.otherDirection && this.character.energy >= 1) {
            let bubble = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bubble);
            this.character.emptyPoisonbar();
            this.poisonbar.setPercentage(this.character.poisonsAmount);
        }
    }


    /**
     * Sets an interval to check for collisions with the character every 500ms.
     */
    collisionWithCharacter() {
        this.checkCollisionCharacterID = setInterval(() => {
            this.checkCollisionsWithCharacter();
        }, 500);
    }

    /**
     * Sets an interval to check for collisions with objects every 10ms.
     */
    collisionWithObjects() {
        this.checkCollisionObjectID = setInterval(() => {
            this.checkCollisionsWithObjects();
        }, 10);
    }

    /**
     * Sets an interval to check for collisions with bubbles every 10ms.
     */
    collisionWithBallistics() {
        this.checkCollisionBallisticsID = setInterval(() => {
            this.checkCollisionsWithBubbles();
        }, 10);
    }

    /**
     * Checks for collisions between the character and the enemies in the game.
     */
    checkCollisionsWithCharacter() {
        this.checkCollisionsWithEndboss();
        this.checkCollisionsWithPufferfish();
        this.checkCollisionsWithJellyfish();
    }

    /**
    * If the character collides with the endboss, it loses energy and the health bar is updated.
    */
    checkCollisionsWithEndboss() {
        if (this.character.isColliding(this.level.endboss)) {
            this.character.attackedByBoss = true;
            this.character.hit(15);
            this.healthBar.setPercentage(this.character.energy);
        }
    }

    /**
     * If the character attacks a pufferfish, its trash energy is reduced and the pufferfish may die after 4 seconds.
     * If the character is hit by a pufferfish it loses energy and the health bar is updated.
     */
    checkCollisionsWithPufferfish() {
        for (let i = 0; i < this.level.pufferfish.length; i++) {
            const pufferfish = this.level.pufferfish[i];

            if (this.character.isColliding(pufferfish) && !pufferfish.puffFishDead && this.keyboard.SPACE && !this.alreadyAttacking) {
                this.alreadyAttacking = true;
                pufferfish.trashEnergy -= 20;
                setTimeout(() => {
                    pufferfish.puffFishDead = true;
                    setTimeout(() => {
                        const index = this.level.pufferfish.indexOf(pufferfish);
                        if (index > -1) {
                            this.level.pufferfish.splice(index, 1);
                        }
                    }, 4000);
                    this.alreadyAttacking = false;
                }, 50);
                break;
            }

            if (this.character.isColliding(pufferfish) && !pufferfish.puffFishDead && this.character.energy != 0 && !this.character.isInvulnerable() && !this.keyboard.SPACE) {
                this.character.hittedByPufferfish = true;
                this.character.hit(5);
                this.healthBar.setPercentage(this.character.energy);
                this.character.characterIsHurt = true;
                setTimeout(() => {
                    this.character.hittedByPufferfish = false;
                }, 900);
            };
        }
    }

    /**
   * If the character attacks a jellyfish, its trash energy is reduced and the jellyfish may die after 4 seconds.
   * If the character is hit by a jellyfish it loses energy and the health bar is updated.
   */
    checkCollisionsWithJellyfish() {
        for (let i = 0; i < this.level.jellyfish.length; i++) {
            const jellyfish = this.level.jellyfish[i];

            if (this.character.isColliding(jellyfish) && !jellyfish.jellyDead && this.keyboard.SPACE && !this.alreadyAttacking) {
                this.alreadyAttacking = true;
                jellyfish.jellyEnergy -= 20;
                setTimeout(() => {
                    jellyfish.jellyDead = true;
                    setTimeout(() => {
                        const index = this.level.jellyfish.indexOf(jellyfish);
                        if (index > -1) {
                            this.level.jellyfish.splice(index, 1);
                        }
                    }, 4000);
                    this.alreadyAttacking = false;
                }, 50);
                break;
            }

            if (this.character.isColliding(jellyfish) && !jellyfish.jellyDead && this.character.energy != 0 && !this.character.isInvulnerable() && !this.keyboard.SPACE) {
                this.character.hittedByJellyfish = true;
                this.character.hit(5);
                this.healthBar.setPercentage(this.character.energy);
                this.character.characterIsHurtByJelly = true;
                this.character.electrized = true;
                setTimeout(() => {
                    this.character.hittedByJellyfish = false;
                    this.character.electrized = false;
                }, 900);
            }
        }
    }

    /**
     * Checks for collisions between throwable bubbles and other objects in the game,
     * including pufferfish, jellyfish, and the endboss. Calls separate handling functions
     * based on the type of collision detected.
     * @function
     */
    checkCollisionsWithBubbles() {
        this.throwableObjects.forEach((bubble, bubbleIndex) => {
            const pFishIndex = this.level.pufferfish.findIndex(pufferfish => pufferfish.isColliding(bubble));
            const jellyIndex = this.level.jellyfish.findIndex(jellyfish => jellyfish.isColliding(bubble));

            if (pFishIndex != -1) {
                this.handleBubbleCollisionWithPufferfish(pFishIndex, bubbleIndex);
            } else if (jellyIndex != -1) {
                this.handleBubbleCollisionWithJellyfish(jellyIndex, bubbleIndex);
            }

            if (this.level.endboss.isColliding(bubble)) {
                this.handleBubbleCollisionWithEndboss(bubbleIndex);
            }
        });
    }

    /**
     * Handles the collision of a bubble with a pufferfish.
     * @param {*} pFishIndex - The index of the pufferfish in the level's pufferfish array.
     * @param {*} bubbleIndex - The index of the bubble in the throwableObjects array.
     */
    handleBubbleCollisionWithPufferfish(pFishIndex, bubbleIndex) {
        this.level.pufferfish[pFishIndex].trashEnergy -= 20;
        this.throwableObjects.splice(bubbleIndex, 1);

        if (this.level.pufferfish[pFishIndex].trashEnergy <= 0) {
            this.level.pufferfish[pFishIndex].puffFishDead = true;
            setTimeout(() => {
                this.level.pufferfish.splice(pFishIndex, 1);
            }, 2000);
        }
    }

    /**
     * Handles the collision between a bubble and a jellyfish
     * @param {*} jellyIndex - Handles the collision between a bubble and a jellyfish
     * @param {*} bubbleIndex - The index of the bubble that collided with the jellyfish
     */
    handleBubbleCollisionWithJellyfish(jellyIndex, bubbleIndex) {
        this.level.jellyfish[jellyIndex].trashEnergy -= 20;
        this.throwableObjects.splice(bubbleIndex, 1);

        if (this.level.jellyfish[jellyIndex].trashEnergy <= 0) {
            this.level.jellyfish[jellyIndex].jellyDead = true;
            setTimeout(() => {
                this.level.jellyfish.splice(jellyIndex, 1);
            }, 2000);
        }
    }

    /**
      * Handles the collision of a bubble with the endboss.
      * @param {*} bubbleIndex - The index of the bubble in the `throwableObjects` array.
      */
    handleBubbleCollisionWithEndboss(bubbleIndex) {
        this.level.endboss.energy -= 20;

        if (this.level.endboss.energy > 0) {
            this.level.endboss.bossIsHurt = true;
            this.throwableObjects.splice(bubbleIndex, 1);
        }

        if (this.level.endboss.energy <= 0) {
            this.level.endboss.bossDead = true;
        }
    }

    /**
    Check collisions of character with coins and poisons, and perform actions accordingly.
    */
    checkCollisionsWithObjects() {
        if (this.level.coins) {
            this.level.coins.forEach((coin, index) => {
                if (this.character.isColliding(coin)) {
                    this.handleCoinCollision(coin, index);
                }
            });
        }

        if (this.level.poisons) {
            this.level.poisons.forEach((poison, index) => {
                if (this.character.isColliding(poison)) {
                    this.handlePoisonCollision(poison, index);
                }
            });
        }
    }

    /**
       * Handles collision between the character and a coin.
       * @param {Object} coin - The coin object.
       * @param {number} index - The index of the coin in the coins array.
       * @returns {void}
       */
    handleCoinCollision(coin, index) {
        this.character.fillCoinBar();
        this.coinBar.setPercentage(this.character.coinsAmount);
        setTimeout(() => {
            coin.visible = false;
            this.coin.coinSound();
            this.level.coins.splice(index, 1);
        }, 0);
    }

    /**
    * Handles collision between the character and a poison.
    * @param {Object} poison - The poison object.
    * @param {number} index - The index of the poison in the poisons array.
    * @returns {void}
    */
    handlePoisonCollision(poison, index) {
        this.character.fillPoisonBar();
        this.poisonbar.setPercentage(this.character.poisonsAmount);
        setTimeout(() => {
            poison.visible = false;
            this.poison.poisonSound();
            this.level.poisons.splice(index, 1);
        }, 0);
    }


    /**
  * Draw all game objects and status bars on the canvas.
  */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.pufferfish);
        this.addObjectsToMap(this.level.jellyfish);
        this.addObjectsToMap(this.level.lights);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.poisons);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.level.endboss);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);

        this.statusBar.forEach(bar => {
            bar.draw(this.ctx);
        });

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Add a list of game objects to the map and draw them on the canvas.
     * @param {GameObject[]} objects - The list of game objects to add and draw.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
 * Adds the given moving object to the map.
 * @param {MovingObject} mo - The moving object to add to the map.
 */
    addToMap(mo) {
        if (mo.otherDirection)
            this.flipImage(mo);

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection)
            this.flipImageBack(mo);
    }

    /**
 * Flips the image of the given moving object horizontally using canvas context.
 * @param {MovingObject} mo - The moving object to flip the image of.
 */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
 * Flips the image of the given moving object back to its original state after flipping it horizontally.
 * @param {MovingObject} mo - The moving object to flip the image of back to its original state.
 */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}
/**
 * A class representing the game world.
 */
class World {
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

    setWorld() {
        this.character.world = this;
    }

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
        for (let i = 0; i < this.level.jellyfish.length; i++) {
            this.checkCollision(this.level.jellyfish, i, "jellyfish")
        }
        for (let i = 0; i < this.level.pufferfish.length; i++) {
            this.checkCollision(this.level.pufferfish, i, "pufferfish")
        }
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

    /** @param type ("jellyfish"|"pufferfish") */
    checkCollision(enemies, index, type) {
        const enemy = enemies[index];

        if (this.character.isColliding(enemy) && !enemy.dead && this.character.energy != 0) {
            if (type === "pufferfish") {
                if (this.keyboard.SPACE && !this.alreadyAttacking) {
                    this.collidingWithFishSlap(enemy);
                } else if (!this.keyboard.SPACE && !this.character.isInvulnerable()) {
                    this.collidingWithFish(type);
                };

            } else if (type === "jellyfish") {
                if (this.keyboard.SPACE && !this.alreadyAttacking) {
                    this.collidingWithFishSlap(enemy);
                } else if (!this.character.isInvulnerable() && !this.keyboard.SPACE) {
                    this.collidingWithFish(type);
                }
            }
        }
    }

    collidingWithFish(type) {
        this.character.hit(5);
        this.healthBar.setPercentage(this.character.energy);
        if (type === "pufferfish") {
            this.character.characterIsHurtByPufferfish = true;
        } else if (type === "jellyfish") {
            this.character.characterIsHurtByJelly = true;
            this.character.electrized = true;
            this.character.electrized = false;
        }
    }

    collidingWithFishSlap(enemy) {
        this.alreadyAttacking = true;
        enemy.trashEnergy -= 20;
        setTimeout(() => {
            enemy.dead = true;
            this.alreadyAttacking = false;
        }, 50);
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
                this.handleCollisionsWithEnemies(this.level.pufferfish, pFishIndex, bubbleIndex);
            } else if (jellyIndex != -1) {
                this.handleCollisionsWithEnemies(this.level.jellyfish, jellyIndex, bubbleIndex);
            }

            if (this.level.endboss.isColliding(bubble)) {
                this.handleCollisionWithEndboss(bubbleIndex);
            }
        });
    }

    handleCollisionsWithEnemies(enemies, enemyIndex, bubbleIndex) {
        enemies[enemyIndex].trashEnergy -= 20;
        this.throwableObjects.splice(bubbleIndex, 1);

        if (enemies[enemyIndex].trashEnergy <= 0) {
            enemies[enemyIndex].dead = true;
            setTimeout(() => {
                enemies.splice(enemyIndex, 1);
            }, 2000);
        }
    }

    handleCollisionWithEndboss(bubbleIndex) {
        this.level.endboss.energy -= 20;

        if (this.level.endboss.energy > 0) {
            this.level.endboss.bossIsHurt = true;
            this.throwableObjects.splice(bubbleIndex, 1);
        }

        if (this.level.endboss.energy <= 0) {
            this.level.endboss.dead = true;
        }
    }

    /**
    Check collisions of character with coins and poisons, and perform actions accordingly.
    */
    checkCollisionsWithObjects() {
        const coins = this.level.coins;
        const poisons = this.level.poisons;

        if (coins) {
            coins.forEach((coin, index) => {
                if (this.character.isColliding(coin)) {
                    this.handleCoinCollision(coin, index);
                }
            });
        }

        if (poisons) {
            poisons.forEach((poison, index) => {
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
    handleCollision(index, type) {
        const character = this.character;
        if (type === "coin") {
            character.fillCoinBar();
            this.coinBar.setPercentage(character.coinsAmount);
            this.coin.coinSound();
            this.level.coins.splice(index, 1);
        } else if (type === "poison") {
            character.fillPoisonBar();
            this.poisonbar.setPercentage(character.poisonsAmount);
            this.poison.poisonSound();
            this.level.poisons.splice(index, 1);
        }
    }

    handleCoinCollision(coin, index) {
        const character = this.character;
        if (character.isColliding(coin)) {
            this.handleCollision(index, "coin");
            coin.visible = false;
        }
    }

    handlePoisonCollision(poison, index) {
        const character = this.character;
        if (character.isColliding(poison)) {
            this.handleCollision(index, "poison");
            poison.visible = false;
        }
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
class World { //hier wird so ziemlich alles was das spiel angeht angegeben, tastatur, kamera, health bars
    character = new Character();
    endboss = new Endboss();
    pufferfish = new PufferFish();
    jellyfish = new JellyFish();
    coin = new Coins();
    poison = new Poisons();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthBar = new HealthBar();
    coinBar = new CoinBar();
    poisonbar = new Poisonbar();
    statusBar = [this.healthBar, this.coinBar, this.poisonbar];
    throwableObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
        this.endboss.world = this;
        this.pufferfish.world = this;
        this.jellyfish.world = this;
    }

    run() {
        this.collisionWithCharacter();
        this.collisionWithObjects();
        this.checkThrowObjects();
        this.collisionWithBallistics();
    }

    checkThrowObjects() {
        setInterval(() => {
            this.checkThrowObjectsBubble();
        }, 1000);
    }


    checkThrowObjectsBubble() {
        if (this.keyboard.D && this.character.poisonsAmount >= 1 && this.character.otherDirection == false && this.character.energy >= 1) {
            let bubble = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bubble);
            console.log('bubble');
            this.character.emptyPoisonbar();
            this.poisonbar.setPercentage(this.character.poisonsAmount);
        }
    }

    collisionWithCharacter() {
        setInterval(() => {
            this.checkCollisionsWithCaracter();
        }, 750);
    }

    collisionWithObjects() {
        setInterval(() => {
            this.checkCollisionsWithObjects();
        }, 10);
    }

    collisionWithBallistics() {
        setInterval(() => {
            this.checkCollisionsWithBubbles();
        }, 100);
    }

    checkCollisionsWithCaracter() {
        this.level.pufferfish.forEach((pufferfish) => {
            if (this.character.isColliding(pufferfish)) {
                this.character.hit(5);
                this.healthBar.setPercentage(this.character.energy);
                this.character.characterIsHurt = true;
            }
        });
        this.level.jellyfish.forEach((jellyfish) => {
            if (this.character.isColliding(jellyfish)) {
                this.character.hit(5);
                this.healthBar.setPercentage(this.character.energy);
                this.character.characterIsHurtByJelly = true;
                this.character.electrized = true;
            }
        });
        this.level.endboss.forEach((boss) => {
            if (this.character.isColliding(boss)) {
                this.character.attackedByBoss = true;
                this.character.hit(10);
                this.healthBar.setPercentage(this.character.energy);
            }
        });
    }

    checkCollisionsWithBubbles() {
        this.throwableObjects.forEach((bubble, bubbleIndex) => {
            let pFishIndex = this.level.pufferfish.findIndex(pufferfish => pufferfish.isColliding(bubble));
            let jellyIndex = this.level.jellyfish.findIndex(jellyfish => jellyfish.isColliding(bubble));
            let bossIndex = this.level.endboss.findIndex(boss => boss.isColliding(bubble));

            if (pFishIndex != -1) {
                this.level.pufferfish[pFishIndex].trashEnergy -= 20;
                console.log('Pufferfish Energy = ' + this.level.pufferfish[pFishIndex].trashEnergy);
                this.throwableObjects.splice(bubbleIndex, 1);
                if (this.level.pufferfish[pFishIndex].trashEnergy <= 0) {
                    this.level.pufferfish[pFishIndex].puffFishDead = true;
                    console.log(this.level.pufferfish[pFishIndex].puffFishDead);
                    setTimeout(() => {
                        this.level.pufferfish.splice(pFishIndex, 1);
                    }, 2000);
                }

            } else if (jellyIndex != -1) {
                this.level.jellyfish[jellyIndex].trashEnergy -= 20;
                console.log('Jelly Energy = ' + this.level.jellyfish[jellyIndex].trashEnergy);
                this.throwableObjects.splice(bubbleIndex, 1);
                if (this.level.jellyfish[jellyIndex].trashEnergy <= 0) {
                    this.level.jellyfish[jellyIndex].jellyDead = true;
                    console.log(this.level.jellyfish[jellyIndex].jellyDead);
                    setTimeout(() => {
                        this.level.jellyfish.splice(jellyIndex, 1);
                    }, 2000);
                }

            } else if (bossIndex != -1) {
                this.level.endboss[bossIndex].energy -= 20;
                this.level.endboss[bossIndex].bossIsHurt = true;
                this.throwableObjects.splice(bubbleIndex, 1);

                if (this.level.endboss[bossIndex].energy <= 0) {
                    setTimeout(() => {
                        this.level.endboss.splice(bossIndex, 1);
                    }, 1500);
                }
            }
        });
    }

    checkCollisionsWithObjects() {
        if (this.level.coins) {
            this.level.coins.forEach((coin, index) => {
                if (this.character.isColliding(coin)) {
                    this.character.fillCoinBar();
                    this.coinBar.setPercentage(this.character.coinsAmount);
                    setTimeout(() => {
                        coin.visible = false; // make the coin object invisible
                        this.coin.coinSound();
                        this.level.coins.splice(index, 1); // remove the coin from the coins array
                    }, 0);
                }
            });
        }

        if (this.level.poisons) {
            this.level.poisons.forEach((poison, index) => {
                if (this.character.isColliding(poison)) {
                    this.character.fillPoisonBar();
                    this.poisonbar.setPercentage(this.character.poisonsAmount);
                    setTimeout(() => {
                        poison.visible = false; // make the poison object invisible
                        this.poison.poisonSound();
                        this.level.poisons.splice(index, 1); // remove the poison from the poisons array
                    }, 0);
                }
            });
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.pufferfish);
        this.addObjectsToMap(this.level.jellyfish);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.level.lights);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.poisons);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);

        // Draw status bars
        this.statusBar.forEach(bar => {
            bar.draw(this.ctx);
        });

        let self = this;
        requestAnimationFrame(function () { //sobald alles darüber geladen wurde, wird das hier gezeichnet (asynchron)
            self.draw(); //this wird hier nicht erkannt, deswegen wird staattessen self als variable vergeben
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}
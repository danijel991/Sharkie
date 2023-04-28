class World { //hier wird so ziemlich alles was das spiel angeht angegeben, tastatur, kamera, health bars
    character = new Character();
    endboss = new Endboss();
    pufferfish = new PufferFish();
    jellyfish = new JellyFish();
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
        if (this.level.pufferfish) {
            this.level.pufferfish.forEach((pufferfish) => {
                if (this.character.isColliding(pufferfish)) {
                    this.character.hitByEnemy();
                    this.healthBar.setPercentage(this.character.energy);
                    this.character.playAnimation(this.character.IMAGES_HURT_POISONED);    
                    this.character.hurt_sfx.play();    
                }
            });
        }

        if (this.level.jellyfish) {
            this.level.jellyfish.forEach((jellyfish) => {
                if (this.character.isColliding(jellyfish)) {
                    this.character.hitByEnemy();
                    this.healthBar.setPercentage(this.character.energy);
                    this.character.playAnimation(this.character.IMAGES_HURT_ELECTRIC_SHOCK);
                    this.character.hurt_shocked_sfx.play();
                }
            });
        }

        if (this.level.endboss) {
            this.level.endboss.forEach((boss) => {
                if (this.character.isColliding(boss)) {
                    this.character.hitByBoss();
                    this.healthBar.setPercentage(this.character.energy);
                    this.character.playAnimation(this.character.IMAGES_HURT_POISONED);
                    this.character.hurt_sfx.play();
                }
            });
        }
    }

    checkCollisionsWithBubbles() {
        this.throwableObjects.forEach((bubble, bubbleIndex) => {
    
            let pufferfishIndex = this.level.pufferfish.findIndex(pufferfish => pufferfish.isColliding(bubble));
            let jellyfishIndex = this.level.jellyfish.findIndex(jellyfish => jellyfish.isColliding(bubble));
            let bossIndex = this.level.endboss.findIndex(boss => boss.isColliding(bubble));
    
            if (pufferfishIndex !== -1) {
                this.level.pufferfish.splice(pufferfishIndex, 1);
                this.throwableObjects.splice(bubbleIndex, 1);
            } else if (jellyfishIndex !== -1) {
                this.level.jellyfish.splice(jellyfishIndex, 1);
                this.throwableObjects.splice(bubbleIndex, 1);
            } else if (bossIndex !== -1) {
                this.level.endboss[bossIndex].energy -= 20;
                console.log('Boss Energy = ' + this.level.endboss[bossIndex].energy);
                this.throwableObjects.splice(bubbleIndex, 1);
    
                if (this.level.endboss[bossIndex].energy <= 0) {
                    this.level.endboss.splice(bossIndex, 1);
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

        // this.ctx.translate(-this.camera_x, 0);
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
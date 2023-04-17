class World { //hier wird so ziemlich alles was das spiel angeht angegeben, tastatur, kamera, health bars
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthBar = new HealthBar();
    coinBar = new CoinBar();
    Poisonbar = new Poisonbar();
    statusBar = [this.healthBar, this.coinBar, this.Poisonbar];
    coins = [];
    maxCoins = 5;
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
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.ckeckThrowObjects();
        }, 750);
    }

    checkCollisions() {
        if (this.level.enemies) {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.hitByEnemy();
                    this.healthBar.setPercentage(this.character.energy);
                }
            });
        }

        if (this.level.coins) {
            this.level.coins.forEach((coin) => {
                if (this.character.isColliding(coin)) {
                    this.character.fillCoinBar();
                    this.coinBar.setPercentage(this.character.coinsAmount);
                }
            });
        }

        if (this.level.bosses) {
            this.level.bosses.forEach((boss) => {
                if (this.character.isColliding(boss)) {
                    this.character.hitByBoss();
                    this.healthBar.setPercentage(this.character.energy);
                }
            });
        }

        if (this.level.bubbleEnemies) {
            this.level.bubbleEnemies.forEach((bubbleEnemy) => {
                if (this.character.isColliding(bubbleEnemy)) {
                    bubbleEnemy.pop();
                    // Other logic for handling bubble enemy collisions
                }
            });
        }

        if (this.level.bubbleBosses) {
            this.level.bubbleBosses.forEach((bubbleBoss) => {
                if (this.character.isColliding(bubbleBoss)) {
                    bubbleBoss.pop();
                    // Other logic for handling bubble boss collisions
                }
            });
        }
    }

    ckeckThrowObjects() {
        if (this.keyboard.D) {
            let bubble = new ThrowableObject(this.character.x + 100, this.character.y + 100)
            this.throwableObjects.push(bubble);
        }
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        // this.ctx.translate(-this.camera_x, 0);
        this.addObjectsToMap(this.level.lights);
        this.addObjectsToMap(this.level.enemies);
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
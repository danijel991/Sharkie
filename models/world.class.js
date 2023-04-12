class World {
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
  
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    setWorld() {
        this.character.world = this;
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    this.healthBar.setPercentage(this.character.energy);
                    this.coinBar.setPercentage(this.character.coins);
                    this.Poisonbar.setPercentage(this.character.poison);
                };
            });
        }, 1000);
    }
    

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
    
        // this.ctx.translate(-this.camera_x, 0);
        this.addObjectsToMap(this.level.lights);
        this.addObjectsToMap(this.level.enemies);
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

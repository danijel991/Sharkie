class MovableObject extends Drawableobject {
    speed = 0.15;
    otherDirection = false;
    speedY = 1;
    accelecartion = 0;
    energy = 100;
    trashEnergy = 20;
    coinsAmount = 0;
    poisonsAmount = 0;

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

    isAbouveGround() {
        return this.y < 0;
    }

    isColliding(obj) {
        return this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
            this.y + this.height - this.offset.bottom > obj.y + obj.offset.top &&
            this.x + this.offset.left < obj.x + obj.width - obj.offset.right &&
            this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom;
    }

    hit(amount) {
        this.energy -= amount;
        if (this.energy <= 0)
            this.energy = 0;
        else
            this.lastHit = new Date().getTime();
    }

    isInvulnerable() {
        if (this.timepassed < 2)
            return true;
        else
            return false;
    }

    fillCoinBar() {
        this.coinsAmount += 15;
        if (this.coinsAmount > 100)
            this.coinsAmount = 100;

    }

    fillPoisonBar() {
        this.poisonsAmount += 30;
        if (this.poisonsAmount > 100)
            this.poisonsAmount = 100;
    }

    emptyPoisonbar() {
        this.poisonsAmount -= 10;
        if (this.poisonsAmount < 0)
            this.poisonsAmount = 0;
    }

    isDead() {
        return this.energy == 0;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imgCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    update() {
        super.update();

        if (this.direction === -1)
            this.moveUpDown();
        else
            this.moveDownUP();
    }

    animateCollectables() {
        let startY = this.y;
        let time = 0;
        setInterval(() => {
            time += 1;
            this.y = startY + Math.sin(time / 100) * 20;
        }, 1000 / 60);
    }
}
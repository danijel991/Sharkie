class MovableObject extends Drawableobject{
    speed = 0.15;
    otherDirection = false;
    speedY = 1;
    accelecartion = 0;
    energy = 100;
    lastHit = 0;

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }


applyGravity() {
    const gravity = 0.05; // adjust this value to control the strength of the underwater gravity
    const buoyancy = 0.01; // adjust this value to control the buoyancy force

    setInterval(() => {
        if (this.isAbouveGround()) {
            this.speedY -= gravity;
            this.y += this.speedY;
        } else {
            this.speedY += buoyancy;
            this.y += this.speedY;
        }
    }, 1000 / 25);
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

    hit() {
        this.energy -= 5;
        if (this.energy <= 0) {

            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // difference in milliseconds
        timepassed = timepassed / 1000; //difference in seconds
        // console.log(timepassed);
        return  timepassed < 1.25; //wir wurden in den letzten 5 Sekunden getroffen
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
}


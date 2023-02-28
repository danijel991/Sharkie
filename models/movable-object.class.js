class MovableObject {
    img;
    imgCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 1;
    accelecartion = 0;
    energy = 100;

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }


    applyGravity() {
        setInterval(() => {
            if (this.isAbouveGround()) {
                this.y -= this.speedY;
                this.speedY -= this.accelecartion;
            }
        }, 1000 / 25);
    }

    isAbouveGround() {
        return this.y < 0;
    }

    loadImage(path) {
        this.img = new Image(); //ist das Gleiche wie <img=id"" src="">
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {

        if (this instanceof Character || this instanceof Fish) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    isColliding(obj) {
        return this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
            this.y + this.height - this.offset.bottom > obj.y + obj.offset.top &&
            this.x + this.offset.left < obj.x + obj.width - obj.offset.right &&
            this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom;
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        }
    }

    isDead() {
        return this.energy == 0;
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            img.style = 'transform:scaleX(-1)';
            this.imgCache[path] = img;
        });
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


class MovableObject {
    img;
    imgCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 1;
    accelecartion = 0;

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

    }
    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}
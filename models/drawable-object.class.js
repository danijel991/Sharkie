class Drawableobject {
    img;
    imgCache = {};
    currentImage = 0;

    loadImage(path) {
        this.img = new Image(); //ist das Gleiche wie <img=id"" src="">
        this.img.onload = () => {
            this.draw(ctx);
        }
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {

        if (this instanceof Character || this instanceof PufferFish ||this instanceof JellyFish || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.onload = () => {
                this.imgCache[path] = img;
            }
            img.src = path;
            img.style = 'transform:scaleX(-1)';
        });
    }
}

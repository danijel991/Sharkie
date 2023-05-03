class Drawableobject {
    img;
    imgCache = {};
    currentImage = 0;

    loadImage(path) {
        this.img = new Image(); //same like <img=id"" src="">
        this.img.src = path;
    }

    draw(ctx) {
        if (this.img) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }

    drawFrame(ctx) {

        if (this instanceof Character || this instanceof PufferFish || this instanceof JellyFish || this instanceof Endboss ||
            this instanceof Coins || this instanceof Poisons) {
            ctx.beginPath(); //shows the frames
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'transparent';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.rect(this.x + this.offset.left,
                this.y + this.offset.top,
                (this.x + this.width - this.offset.right) -
                (this.x + this.offset.left),
                (this.y + this.height - this.offset.bottom) -
                (this.y + this.offset.top));
            ctx.stroke();
        }
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            img.style = 'transform:scaleX(-1)';
            this.imgCache[path] = img;
        });
    }
}
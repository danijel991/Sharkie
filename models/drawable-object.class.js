class Drawableobject {
    img;
    imgCache = {};
    currentImage = 0;

    loadImage(path) {
        this.img = new Image(); //same like <img=id"" src="">
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height); // Drawing objects on the canvas
    }

    drawFrame(ctx) {

        if (this instanceof Character || this instanceof PufferFish ||this instanceof JellyFish || this instanceof Endboss || this instanceof Coins ) {
            ctx.beginPath(); //shows the frames
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x, this.y, this.width, this.height);
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
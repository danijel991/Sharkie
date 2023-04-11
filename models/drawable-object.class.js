class Drawableobject {
    img;
    imgCache = {};
    currentImage = 0;

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

        loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            img.style = 'transform:scaleX(-1)';
            this.imgCache[path] = img;
        });
    }
}
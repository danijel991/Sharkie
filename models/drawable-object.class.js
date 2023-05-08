/**
 * Class for drawing animated objects.
 */
class Drawableobject {
    img;
    imgCache = {};
    currentImage = 0;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the object on the given canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
     */
    draw(ctx) {
        if (this.img) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }

    /**
     * Draws a frame around the object if it is an instance of Character, PufferFish, JellyFish, Endboss, Coins, or Poisons
     * @param {*} ctx
     */
    drawFrame(ctx) {

        if (this instanceof Character || this instanceof PufferFish || this instanceof JellyFish || this instanceof Endboss ||
            this instanceof Coins || this instanceof Poisons) {
            ctx.beginPath();
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

    /**
     * This method loads multiple images into the image cache.
     * @param {*} arr - An array of image paths. 
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            img.style = 'transform:scaleX(-1)';
            this.imgCache[path] = img;
        });
    }
}
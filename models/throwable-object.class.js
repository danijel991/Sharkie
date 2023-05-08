/**
 * Represents a throwable object that can be thrown by the player.
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {

    /**
     * Creates a throwable object with the given coordinates and loads its image.
     * @param {*} x - The x-coordinate of the throwable object.
     * @param {*} y - The y-coordinate of the throwable object.F
     */
    constructor(x, y) {
        super().loadImage('./img/1.Sharkie/4.Attack/Bubble_trap/Bubble.png');
        this.x = x;
        this.y = y;
        this.height = 40;
        this.width = 40;
        this.throw();
    }

    /**
     * Throws the object to the right by continuously updating its x-coordinate.
     */
    throw() {
        setInterval(() => {
            this.x += 5;
        }, 1000 / 60);
    }
}
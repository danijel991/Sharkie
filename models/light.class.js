/**
 * Represents a light object that extends the MovableObject class.
 * @extends MovableObject
 */
class Light extends MovableObject {
    width = 300;
    height = 250;
    y = 0;

    /**
     * Creates a new Light object.
     * @constructor
     */
    constructor() {
        super().loadImage('./img/3.Background/Layers/1._Light/1.png');
        this.x = 422.5;
    }
}  